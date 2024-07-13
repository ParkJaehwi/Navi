from flask import Flask, request, jsonify, session
from flask_cors import CORS
import pandas as pd
import os
import random
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.runnable import RunnableMap
import openai

from dotenv import load_dotenv
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# 상위 폴더에 있는 .env 파일 경로 지정
load_dotenv(dotenv_path='../.env')
GPT_API_KEY = os.getenv('GPT_API_KEY')

# 최신 openai 라이브러리 초기화 방법
openai.api_key = GPT_API_KEY

def gpt_api():
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "너는 여행 동선을 짜주는 ai비서야"},
            {"role": "user", "content": "아쿠아플라넷 제주: 제주 서귀포시 성산읍 섭지코지로 95 아쿠아플라넷 제주 산방산 탄산온천: 제주 서귀포시 안덕면 사계북로41번길 192 제주항공우주박물관: 제주 서귀포시 안덕면 녹차분재로 218 제주항공우주박물관 대포주상절리: 제주 서귀포시 이어도로 36-24 더본 호텔 제주 :제주 서귀포시 색달로 18 내게 준 데이터 중에서 3개만 뽑아서 제주도 1박 2일 일정 짜주고 리턴 데이터는 json으로"}
        ]
    )
    data = response.choices[0].message['content']
    print(data)
    return jsonify({'data': data})
app.secret_key = os.urandom(24)  # 세션을 위한 비밀 키 설정

# CORS 설정
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# 환경 변수 로드
load_dotenv()


# Google Generative AI API 키 설정
os.environ["GOOGLE_API_KEY"] = os.getenv('GEMINI_API_KEY')

# 언어 모델 초기화
llm = ChatGoogleGenerativeAI(model="gemini-pro")

# CSV 파일 경로
csv_path = "filtered_spot_data.csv"

# CSV 파일 읽기
df = pd.read_csv(csv_path)
print("CSV 데이터 로드 완료:")

# DataFrame 필터링 및 랜덤 섞기 함수
def filter_data(areacode, categories):
    filtered_df = df[(df['areacode'] == int(areacode)) & (df['cat2'].isin(categories))]
    if filtered_df.empty:
        print(f"해당 areacode: {areacode} 및 카테고리: {categories}에 대한 데이터를 찾을 수 없습니다.")
    else:
        filtered_df = filtered_df.sample(frac=1).reset_index(drop=True)  # 데이터 랜덤 섞기
        filtered_df.to_csv('가공.csv', index=False)
        print(filtered_df)
        print("Finished filtering ")
    return filtered_df

# 필터링된 DataFrame을 텍스트로 변환
def df_to_text(filtered_df):
    text = ""
    for index, row in filtered_df.iterrows():
        text += f"title: {row['title']}, areacode: {row['areacode']}, address: {row['addr1']}, category: {row['cat2']}, latitude: {row['mapx']}, longitude: {row['mapy']}, image: {row['firstimage']}\n"
    return text

# GPT에게 질문 및 컨텍스트 전달
def ask_gpt(question, context):
    print("Gemini 응답을 기다리고 있습니다.")
    template = """
    다음 context를 기반으로 조건에 맞는 데이터를 10개 제공해주세요.

    context: {context}
    조건: {question}
    
    출력은 다음과 같은 json형식으로 출력하세요. 데이터가 없으면 null을 넣어서 출력하세요. 오직 10개만 출력하세요.
    
    <출력형식>
    [
        {{
            "title": ,
            "areacode": ,
            "address": ,
            "category": ,
            "latitude": ,
            "longitude": ,
            "image": ,
        }},
        ...
    ]
    """
    
    prompt = ChatPromptTemplate.from_template(template)
    gemini = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0)
    
    chain = RunnableMap({
        "context": lambda x: context,
        "question": lambda x: question
    }) | prompt | gemini
    result = chain.invoke({'context': context, 'question': question})
    return result.content

# 메인 함수
def main():
    areacode = '1'
    cat2 = ['A0101', 'A0102']
    filtered_df = filter_data(areacode, cat2)
    if not filtered_df.empty:
        context = df_to_text(filtered_df)
        question = f"areacode: {areacode}, category: {cat2}"
        answer = ask_gpt(question, context)
        print(answer)
    else:
        print("조건에 맞는 데이터를 찾을 수 없습니다.")



#------------------------------------------------------------------------
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

@app.route('/api/user', methods=['GET'])
def get_user_data():
    if 'user_id' not in session:
        return jsonify({"message": "로그인이 필요합니다."}), 401
    
    user_id = session['user_id']
    cursor = db.cursor(dictionary=True)
    query = "SELECT username, email FROM user WHERE user_id = %s"
    cursor.execute(query, (user_id,))
    user = cursor.fetchone()
    
    cursor.close()
    
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"message": "사용자 정보를 찾을 수 없습니다."}), 404


if __name__ == '__main__':
    main()
    app.run(debug=True)

