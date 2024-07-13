from flask import Flask, request, jsonify, session
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = os.urandom(24)  # 세션을 위한 비밀 키 설정

# CORS 설정
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# 환경 변수 로드
load_dotenv()
GPT_API_KEY = os.getenv('GPT_API_KEY')

# OpenAI API 클라이언트 초기화
openai.api_key = GPT_API_KEY

# 환경 변수에서 데이터베이스 설정 가져오기
DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_DATABASE = os.getenv('DB_DATABASE')

# MySQL DB 연결 설정
db = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_DATABASE
)

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    _username = data['username']
    _password = generate_password_hash(data['password'])
    _email = data['email']

    cursor = db.cursor(dictionary=True)

    query = "SELECT * FROM user WHERE username = %s"
    cursor.execute(query, (_username,))
    user = cursor.fetchone()
    
    # 쿼리 결과를 모두 소진
    while cursor.nextset():
        cursor.fetchall()
    
    if user:
        cursor.close()
        return jsonify({"message": "아이디가 이미 존재합니다."}), 409
    
    query = "INSERT INTO user (username, password, email) VALUES (%s, %s, %s)"
    values = (_username, _password, _email)
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    return jsonify({"message": "회원가입이 완료되었습니다."}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    cursor = db.cursor(dictionary=True)
    query = "SELECT * FROM user WHERE username = %s"
    values = (data['username'],)
    cursor.execute(query, values)
    user = cursor.fetchone()
    
    # 남아있는 결과를 소진
    while cursor.nextset():
        cursor.fetchall()

    cursor.close()
    if user and check_password_hash(user['password'], data['password']):
        session['user_id'] = user['user_id']
        session['username'] = user['username']
        return jsonify({"message": "로그인 되었습니다."}), 200
    else:
        return jsonify({"message": "회원정보가 없습니다."}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return jsonify({"message": "로그아웃 되었습니다."}), 200

@app.route('/api/check_session', methods=['GET'])
def check_session():
    if 'user_id' in session:
        return jsonify({"logged_in": True})
    else:
        return jsonify({"logged_in": False})

@app.route('/api/find_password', methods=['POST'])
def find_password():
    data = request.json
    username = data['username']
    email = data['email']

    cursor = db.cursor(dictionary=True)
    query = "SELECT password FROM user WHERE username = %s AND email = %s"
    values = (username, email)
    cursor.execute(query, values)
    user = cursor.fetchone()

    # 남아있는 결과를 소진
    while cursor.nextset():
        cursor.fetchall()

    cursor.close()
    if user:
        return jsonify({"message": "유효한 사용자입니다."}), 200
    else:
        return jsonify({"message": "회원정보가 없습니다."}), 404

@app.route('/api/find_username', methods=['POST'])
def find_username():
    data = request.json
    email = data['email']

    cursor = db.cursor(dictionary=True)
    query = "SELECT username FROM user WHERE email = %s"
    values = (email,)
    cursor.execute(query, values)
    user = cursor.fetchone()

    # 남아있는 결과를 소진
    while cursor.nextset():
        cursor.fetchall()

    cursor.close()
    if user:
        return jsonify({"username": user['username']}), 200
    else:
        return jsonify({"message": "회원정보가 없습니다."}), 404

@app.route('/api/reset_password', methods=['POST'])
def reset_password():
    data = request.json
    new_password = generate_password_hash(data['newPassword'])
    cursor = db.cursor()

    if 'user_id' in session:
        user_id = session['user_id']
        query = "UPDATE user SET password = %s WHERE user_id = %s"
        values = (new_password, user_id)
    else:
        username = data['username']
        email = data['email']
        query = "UPDATE user SET password = %s WHERE username = %s AND email = %s"
        values = (new_password, username, email)

    cursor.execute(query, values)
    db.commit()
    cursor.close()
    return jsonify({"message": "비밀번호가 성공적으로 변경되었습니다."}), 200

@app.route('/ask', methods=['GET'])
def ask_gpt():
    completion = openai.ChatCompletion.create(
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
