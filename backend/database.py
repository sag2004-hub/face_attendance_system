import sqlite3
from datetime import datetime
import os

class Database:
    def __init__(self):
        self.db_path = 'data/attendance.db'
        
        # Create data directory if it doesn't exist
        if not os.path.exists('data'):
            os.makedirs('data')
        
        self.init_database()
    
    def init_database(self):
        """Initialize database with required tables"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Students table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS students (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id TEXT UNIQUE NOT NULL,
                    name TEXT NOT NULL,
                    image_path TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Attendance table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS attendance (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id TEXT NOT NULL,
                    name TEXT NOT NULL,
                    date DATE NOT NULL,
                    time TIME NOT NULL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (student_id) REFERENCES students (student_id)
                )
            ''')
            
            conn.commit()
            conn.close()
            print("Database initialized successfully")
        
        except Exception as e:
            print(f"Error initializing database: {e}")
    
    def add_student(self, student_id, name, image_path):
        """Add a new student to the database"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO students (student_id, name, image_path)
                VALUES (?, ?, ?)
            ''', (student_id, name, image_path))
            
            conn.commit()
            conn.close()
            return True
        
        except sqlite3.IntegrityError:
            print(f"Student ID {student_id} already exists")
            return False
        except Exception as e:
            print(f"Error adding student: {e}")
            return False
    
    def mark_attendance(self, student_id, name):
        """Mark attendance for a student"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            now = datetime.now()
            date = now.strftime('%Y-%m-%d')
            time = now.strftime('%H:%M:%S')
            
            cursor.execute('''
                INSERT INTO attendance (student_id, name, date, time)
                VALUES (?, ?, ?, ?)
            ''', (student_id, name, date, time))
            
            conn.commit()
            conn.close()
            return True
        
        except Exception as e:
            print(f"Error marking attendance: {e}")
            return False
    
    def check_attendance_today(self, student_id, date):
        """Check if attendance is already marked for today"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT COUNT(*) FROM attendance
                WHERE student_id = ? AND date = ?
            ''', (student_id, date))
            
            count = cursor.fetchone()[0]
            conn.close()
            
            return count > 0
        
        except Exception as e:
            print(f"Error checking attendance: {e}")
            return False
    
    def get_attendance_records(self, limit=100):
        """Get attendance records"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT student_id, name, date, time, timestamp
                FROM attendance
                ORDER BY timestamp DESC
                LIMIT ?
            ''', (limit,))
            
            records = cursor.fetchall()
            conn.close()
            
            return [
                {
                    'student_id': record[0],
                    'name': record[1],
                    'date': record[2],
                    'time': record[3],
                    'timestamp': record[4]
                }
                for record in records
            ]
        
        except Exception as e:
            print(f"Error getting attendance records: {e}")
            return []
    
    def get_all_students(self):
        """Get all registered students"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('SELECT student_id, name, created_at FROM students')
            students = cursor.fetchall()
            conn.close()
            
            return [
                {
                    'student_id': student[0],
                    'name': student[1],
                    'created_at': student[2]
                }
                for student in students
            ]
        
        except Exception as e:
            print(f"Error getting students: {e}")
            return []