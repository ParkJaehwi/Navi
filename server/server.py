from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # 모든 요청에 대해 CORS 허용

# 환경 변수 로드
load_dotenv()
GPT_API_KEY = os.getenv('GPT_API_KEY')

# OpenAI API 클라이언트 초기화
client = openai.OpenAI(api_key=GPT_API_KEY)

# MySQL DB 연결 설정
db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='0126',
    database='join'
)

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    _username = data['username']
    _password = generate_password_hash(data['password'])
    _email = data['email']

    cursor = db.cursor()
    query = "INSERT INTO user (username, password, email) VALUES (%s, %s, %s)"  # create_time 제거
    values = (_username, _password, _email)
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    return jsonify({"message": "User created successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    cursor = db.cursor(dictionary=True)
    query = "SELECT * FROM user WHERE username = %s"
    values = (data['username'],)
    cursor.execute(query, values)
    user = cursor.fetchone()
    cursor.close()
    if user and check_password_hash(user['password'], data['password']):
        return jsonify(user), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/ask', methods=['GET'])
def ask_gpt():
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "너는 여행 동선을 짜주는 ai비서야"},
            {"role": "user", "content": "아쿠아플라넷 제주: 제주 서귀포시 성산읍 섭지코지로 95 아쿠아플라넷 제주 산방산 탄산온천: 제주 서귀포시 안덕면 사계북로41번길 192 제주항공우주박물관: "
            + "제주 서귀포시 안덕면 녹차분재로 218 제주항공우주박물관 대포주상절리: 제주 서귀포시 이어도로 36-24 더본 호텔 제주 :제주 서귀포시 색달로 18"+"내가 준 데이터 중에서 3개만 뽑아서 제주도 1박 2일 일정 짜주고 리턴 데이터는 json으로"}
        ],
    )
    data = completion.choices[0].message.content
    print(completion.choices[0].message.content)
    return jsonify({'data': data})

if __name__ == '__main__':
    app.run(debug=True)
