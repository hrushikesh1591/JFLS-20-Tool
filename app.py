from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # This allows your GitHub Pages to talk to this Python server

# Database setup
def init_db():
    conn = sqlite3.connect('jfls_assessments.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS assessments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_name TEXT,
            age INTEGER,
            gender TEXT,
            exam_date DATE,
            evaluation_time TEXT,
            total_score INTEGER,
            domain_scores TEXT,
            raw_data TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Initialize database when server starts
init_db()

@app.route('/api/submit-assessment', methods=['POST'])
def submit_assessment():
    try:
        data = request.json
        print("Received data:", data)  # For debugging
        
        # Connect to database
        conn = sqlite3.connect('jfls_assessments.db')
        cursor = conn.cursor()
        
        # Insert assessment data
        cursor.execute('''
            INSERT INTO assessments 
            (patient_name, age, gender, exam_date, evaluation_time, total_score, domain_scores, raw_data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('patientName'),
            data.get('age'),
            data.get('gender'),
            data.get('examDate'),
            data.get('evaluationTime'),
            data.get('totalScore'),
            json.dumps(data.get('domainScores', {})),
            json.dumps(data.get('responses', {}))
        ))
        
        assessment_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({
            "status": "success", 
            "message": "Assessment saved successfully",
            "assessment_id": assessment_id
        })
    
    except Exception as e:
        print("Error:", str(e))  # For debugging
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "JFLS API is running"})

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')