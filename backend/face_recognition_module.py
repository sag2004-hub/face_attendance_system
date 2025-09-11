import face_recognition
import numpy as np
import pickle
import os


class SimpleFaceRecognition:
    def __init__(self):
        self.known_face_encodings = []
        self.known_face_names = []
        self.known_face_ids = []
        self.encodings_file = 'data/face_encodings.pkl'

        # Create data directory if it doesn't exist
        if not os.path.exists('data'):
            os.makedirs('data')

        self.load_encodings()

    def load_encodings(self):
        """Load existing face encodings from file"""
        try:
            if os.path.exists(self.encodings_file):
                with open(self.encodings_file, 'rb') as f:
                    data = pickle.load(f)
                    self.known_face_encodings = data.get('encodings', [])
                    self.known_face_names = data.get('names', [])
                    self.known_face_ids = data.get('ids', [])
                print(f"✅ Loaded {len(self.known_face_encodings)} face encodings")
        except Exception as e:
            print(f"❌ Error loading encodings: {e}")

    def save_encodings(self):
        """Save face encodings to file"""
        try:
            data = {
                'encodings': self.known_face_encodings,
                'names': self.known_face_names,
                'ids': self.known_face_ids
            }
            with open(self.encodings_file, 'wb') as f:
                pickle.dump(data, f)
            print("✅ Face encodings saved successfully")
        except Exception as e:
            print(f"❌ Error saving encodings: {e}")

    def add_face_encoding(self, image_path, name, student_id):
        """Add a new face encoding"""
        try:
            # Load image
            image = face_recognition.load_image_file(image_path)

            # Find face encodings
            face_encodings = face_recognition.face_encodings(image)

            if len(face_encodings) > 0:
                # Use the first face found
                face_encoding = face_encodings[0]

                self.known_face_encodings.append(face_encoding)
                self.known_face_names.append(name)
                self.known_face_ids.append(student_id)

                self.save_encodings()
                print(f"✅ Added encoding for {name} ({student_id})")
                return True
            else:
                print("⚠️ No face found in the image")
                return False
        except Exception as e:
            print(f"❌ Error adding face encoding: {e}")
            return False

    def recognize_face(self, image_path, tolerance=0.6):
        """Recognize face in given image"""
        try:
            # Load image
            image = face_recognition.load_image_file(image_path)

            # Find face encodings
            face_encodings = face_recognition.face_encodings(image)

            if len(face_encodings) == 0:
                return {'recognized': False, 'message': 'No face detected'}

            # Compare with known faces
            for face_encoding in face_encodings:
                distances = face_recognition.face_distance(
                    self.known_face_encodings, face_encoding
                )

                if len(distances) == 0:
                    return {'recognized': False, 'message': 'No known faces available'}

                best_match_index = np.argmin(distances)
                match = distances[best_match_index] <= tolerance

                if match:
                    name = self.known_face_names[best_match_index]
                    student_id = self.known_face_ids[best_match_index]

                    # Confidence: 1 - normalized distance
                    confidence = round((1 - distances[best_match_index]) * 100, 2)
                    confidence = max(0.0, min(confidence, 100.0))  # Clamp between 0–100

                    return {
                        'recognized': True,
                        'name': name,
                        'student_id': student_id,
                        'confidence': confidence
                    }

            return {'recognized': False, 'message': 'Face not recognized'}

        except Exception as e:
            print(f"❌ Error recognizing face: {e}")
            return {'recognized': False, 'message': f'Error: {str(e)}'}
