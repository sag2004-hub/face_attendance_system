from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import os
from datetime import datetime
from face_recognition_module import SimpleFaceRecognition  # ✅ fixed import
from database import Database

app = Flask(__name__)
CORS(app)

# Initialize components
try:
    face_rec = SimpleFaceRecognition()  # ✅ make sure this matches the imported class
    db = Database()
    print("✅ Face recognition and database initialized successfully")
except Exception as e:
    print(f"❌ Error initializing components: {e}")
    face_rec = None
    db = None

# Upload folder
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'face_recognition': face_rec is not None,
        'database': db is not None
    })


@app.route('/api/register', methods=['POST'])
def register_student():
    """Register a new student"""
    if not face_rec or not db:
        return jsonify({'success': False, 'message': 'System not properly initialized!'}), 500
    try:
        data = request.get_json(force=True)  # force=True ensures JSON is parsed
        name = (data.get('name') or '').strip()
        student_id = (data.get('student_id') or '').strip()
        image_data = data.get('image', '')

        # Validation
        if not name or not student_id:
            return jsonify({'success': False, 'message': 'Name and Student ID are required!'}), 400
        if not image_data:
            return jsonify({'success': False, 'message': 'Image is required!'}), 400

        # Decode base64 image
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        image_bytes = base64.b64decode(image_data)

        # Save uploaded file
        filename = f"{student_id}_{name.replace(' ', '_')}.jpg"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        with open(filepath, 'wb') as f:
            f.write(image_bytes)

        # Add face encoding
        if not face_rec.add_face_encoding(filepath, name, student_id):
            os.remove(filepath)
            return jsonify({'success': False, 'message': 'Failed to detect face in image!'}), 400

        if not db.add_student(student_id, name, filepath):
            os.remove(filepath)
            return jsonify({'success': False, 'message': 'Failed to save student to database!'}), 500

        return jsonify({'success': True, 'message': f'Student {name} registered successfully!'})

    except Exception as e:
        return jsonify({'success': False, 'message': f'Server error: {str(e)}'}), 500


@app.route('/api/attendance', methods=['POST'])
def mark_attendance():
    """Mark attendance using face recognition"""
    if not face_rec or not db:
        return jsonify({'success': False, 'message': 'System not properly initialized!'}), 500
    try:
        data = request.get_json(force=True)
        image_data = data.get('image', '')
        if not image_data:
            return jsonify({'success': False, 'message': 'No image data received!'}), 400

        if ',' in image_data:
            image_data = image_data.split(',')[1]
        image_bytes = base64.b64decode(image_data)

        temp_path = os.path.join(UPLOAD_FOLDER, 'temp_capture.jpg')
        with open(temp_path, 'wb') as f:
            f.write(image_bytes)

        result = face_rec.recognize_face(temp_path)
        os.remove(temp_path)

        if not result.get('recognized', False):
            return jsonify({'success': False, 'message': result.get('message', 'Face not recognized!')})

        student_id = result.get('student_id', '')
        name = result.get('name', '')
        today = datetime.now().strftime('%Y-%m-%d')

        if db.check_attendance_today(student_id, today):
            return jsonify({'success': False, 'message': f'Attendance already marked for {name} today!'})

        if not db.mark_attendance(student_id, name):
            return jsonify({'success': False, 'message': 'Failed to save attendance record!'}), 500

        return jsonify({
            'success': True,
            'message': f'Attendance marked successfully for {name}!',
            'student': {
                'name': name,
                'student_id': student_id,
                'confidence': result.get('confidence', 0)
            }
        })

    except Exception as e:
        return jsonify({'success': False, 'message': f'Server error: {str(e)}'}), 500


@app.route('/api/reports', methods=['GET'])
def get_reports():
    """Get attendance reports"""
    if not db:
        return jsonify({'success': False, 'message': 'Database not available!', 'records': []}), 500
    try:
        records = db.get_attendance_records()
        return jsonify({'success': True, 'records': records})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error getting reports: {str(e)}', 'records': []}), 500


@app.route('/api/students', methods=['GET'])
def get_students():
    """Get all registered students"""
    if not db:
        return jsonify({'success': False, 'students': []}), 500
    try:
        students = db.get_all_students()
        return jsonify({'success': True, 'students': students})
    except Exception as e:
        return jsonify({'success': False, 'students': [], 'message': f'Error getting students: {str(e)}'}), 500


if __name__ == '__main__':
    print("🚀 Starting Face Recognition Attendance System API...")
    print(f"📁 Upload folder: {UPLOAD_FOLDER}")
    print("🌐 API running at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
