//venv 설치 및 실행(가상환경 설정)

python -m venv venv
.\venv\Scripts\Activate.ps1

에러시
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\venv\Scripts\Activate.ps1

venv\Scripts\activate
pip install Flask
pip install flask-cors
pip install python-dotenv
pip install mysql-connector-python
pip install pandas
pip install langchain langchain_google_genai
pip install openai


// 서버 실행

cd server
python server.py

---

// 클라이언트 실행

cd navi-client
npm i
npm start

---
