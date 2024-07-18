<img width=100% src="https://github.com/user-attachments/assets/56738c49-a28e-49a7-b501-88c1d49c9779">

# 🦋 나만의 여행비서 : NAVI

### 📖 프로젝트 개요
LLM을 활용한 사용자 맞춤형 여행지 추천시스템<br/>
<br/><br/>

### 🚀 프로젝트 목표
- LangChain기술을 이용한 Google Gemini API모델 사용
- Tour4.0 관광정보 API를 RAG기술로 LLM에 학습시켜 정확한 정보 응답 
- 데이터를 클라이언트로 받아와 KakaoMap API를 통한 위치정보 구현
- MySQL을 사용하여 유저 관리 및 스크랩 기능 구현
- 사용자의 편의성을 위한 UI 구현
<br/><br/><br/>

## 📝 프로젝트 설명

### 💼 NAVI의 기능
1. 회원가입을 통해 로그인을 할 수 있으며, 비회원으로도 이용 가능
2. 선호도 조사를 할 수 있는 간단한 문제를 진행하거나 여행지 페이지를 통해 카테고리 선택 가능
3. 선호도 조사를 끝내거나 카테고리를 선택하고 지역을 선택하면 사용자 맞춤형 관광지를 추천해주고 상세정보와 위치정보 확인 가능
4. 로그인을 했으면 스크랩 버튼을 통한 여행지 저장 가능
5. 마이페이지에서 계정을 관리할 수 있으며, 저장된 여행지 정보를 카테고리별로 확인 가능
6. 다크모드를 구현하여 사용자가 원하는 테마를 사용 가능
<br/><br/><br/>

### 🗺 기술 설계도
<img width=100% src="https://github.com/user-attachments/assets/e23c91cb-3ab9-4299-a379-7e74b316db4b"><br/>

#### 여행지 추천기능
1. 클라이언트에서 요청
2. 서버에서 요청을 받은 후 Pandas를 통한 관광정보 API 전처리 및 가공
3. Gemini 모델에게 가공된 데이터를 전송
4. 해당 정보를 학습하여 Prompt값을 받아 응답
5. 응답 데이터를 서버에 전송 후 클라이언트로 전송
6. 클라이언트에서 데이터를 받아 사용하고 KakaoMap API를 호출하여 사용
<br/>

#### 회원 기능
1. 클라이언트에서 요청
2. 서버에서 요청을 받아서 MySQL에 접근
3. 쿼리에 따른 MySQL에서의 작업 후 서버에서 클라이언트로 결과 전송
<br/><br/><br/>

### 📟 DB 설계도
<img width=100% src="https://github.com/user-attachments/assets/4d90cc4e-feb9-4285-b862-cc73abccb822"><br/><br/><br/>


### 💻 기술 스택
- **FrameWork:** &nbsp;&nbsp;![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB ) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
- **Style:** &nbsp;&nbsp;![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
- **Language:** &nbsp;&nbsp;![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- **Database:** &nbsp;&nbsp;![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
- **DataProcessing:** &nbsp;&nbsp;![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)
- **Tools:** &nbsp;&nbsp;![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
<br/><br/>

### 🛠️ 기능에 대한 사용 기술
- Flask 서버와 React 클라이언트를 사용하여 구현
- Gemini API를 사용하여 LLM모델 선택 후 LangChain 기술을 사용하여 체인으로 연결된 응답 생성과정 구현
- Pandas를 통해 관광정보 API의 csv파일을 전처리
- RAG기술을 통해 전처리된 데이터를 학습시켜 정확한 답변 생성
- 답변을 서버에서 클라이언트로 전달하여 여행지 추천 화면 구현
- 답변 데이터의  위도,경도값을 통해 클라이언트에서 KakaoMap API를 통한 위치정보 구현
- MySQL 를 사용하였고 외래키를 통한 연결테이블 구현
- 회원 기능과 여행지 스크랩 기능을 DB를 통해 구현
- 자연스러운 UI 구현 및 다크모드 구현<br/><br/><br/>


### ✨ 주요 기능 및 이미지

#### 📌 시작 페이지<br/>
<img width=100% src="https://github.com/user-attachments/assets/742f0cee-4ce8-4d3d-ae45-637bbb50a5b6"><br/><br/>
- **소개:** Navi 서비스에 대한 소개 화면<br/>
- **시작하기:** 시작하기 버튼을 통해 사용자 맞춤형 데이터를 얻기위한 간단한 선호도 조사<br/><br/><br/>

#### 📌 선호도 조사 페이지<br/>
<img width=100% src="https://github.com/user-attachments/assets/974b8a85-b6a0-4c49-bce0-d8f04d342894"><br/><br/>
- **선호도 조사:** 총 5개의 문항으로 이루어져 있으며, 사용자의 여행 취향과 선호도를 분석<br/>
- **결과보기:** 마지막 문항의 결과보기 버튼을 통해 여행지 추천 페이지로 해당 정보 전송 후 이동<br/><br/><br/>

#### 📌 여행지 카테고리 페이지<br/>
<img width=100% src="https://github.com/user-attachments/assets/63309f54-7450-4ce1-8842-7084a24d7b5e"><br/><br/>
- **여행지 카테고리:** 총 10개의 카테고리가 있으며, 선택하여 여행지 추천 페이지로 이동<br/><br/><br/>

#### 📌 여행지 추천 페이지<br/>
<img width=100% src="https://github.com/user-attachments/assets/169e7c61-6096-4d81-8227-54597f55c2b0"><br/><br/>
- **지역 선택:** 지역을 선택하여 추천받고 싶은 여행지역을 선택<br/>
- **검색:** 검색 버튼을 통해 전달받은 카테고리와 지역을 바탕으로 LLM을 통해 응답<br/>
- **상세정보:** 이미지와 이름, 주소, 간단한 설명을 보여주며, 클릭 시 지도에 위치정보 표시<br/>
- **스크랩 버튼:** 스크랩 버튼을 통해 저장하고 싶은 여행지를 나의 여행지에 저장 가능<br/>
- **지도:** 초기 설정은 GPS를 통해 사용자의 위치를 보여주고 여행 데이터를 받아오면 해당 여행지의 위치정보 제공<br/><br/><br/>

#### 📌 로그인<br/>
<img width=100% src="https://github.com/user-attachments/assets/f5c2414a-28c3-483d-b007-ebd1cae381b2"><br/><br/>
- **로그인:** 회원가입한 아이디와 비밀번호를 사용해 로그인, 로그인을 하면 세션을 발급받아 마이페이지와 나의 여행지 페이지에 접근 가능<br/>
- **아이디 찾기:** 이메일을 입력 받아 해당 유저의 아이디를 제공<br/>
- **비밀번호 찾기:** 아이디와 이메일을 입력받아 유저를 확인한 후 해시값으로 설정된 비밀번호를 재설정 하도록 구현<br/><br/><br/>

#### 📌 회원가입<br/>
<img width=100% src="https://github.com/user-attachments/assets/6fe03cfb-efdc-4335-b465-dd05f3adde4e"><br/><br/>
- **회원가입:** 사용자의 정보를 입력받아 회원가입 진행<br/><br/><br/>

#### 📌 마이페이지<br/>
<img width=100% src="https://github.com/user-attachments/assets/db82fa6e-6f89-4cf2-9f2e-57fee4e88310"><br/><br/>
- **나의 정보:** 나의 아이디와 이메일을 보여주는 프로필 구현<br/>
- **저장된 여행지 버튼:** 여행지 추천 페이지에서 저장한 여행지들을 확인할 수 있는 페이지로 이동<br/>
- **비밀번호 재설정:** 사용자의 정보를 가지고 비밀번호를 재설정 하도록 구현<br/><br/><br/>

#### 📌 나의 여행지 페이지<br/>
<img width=100% src="https://github.com/user-attachments/assets/f76d6383-d858-4888-bb43-8a0d738ef1c6"><br/><br/>
- **카테고리 선택:** 여행지별 카테고리 메뉴를 선택하여 저장한 여행지를 카테고리별로 확인<br/>
- **여행지 정보:** 여행지의 이미지와 이름, 주소를 간단하게 보여주도록 했으며 클릭 시 상세정보 확인<br/><br/><br/>

#### 📌 스크랩 상세정보<br/>
<img width=100% src="https://github.com/user-attachments/assets/8a04265f-4937-49c2-95a1-b2c076b389b1"><br/><br/>
- **지도:** 해당 여행지의 위치정보를 지도로 표시<br/>
- **상세 정보:** 이름, 이미지, 주소, 설명을 확인하도록 구현<br/>
- **스크랩 취소 버튼:** 우측 하단의 버튼을 통해 저장된 여행지를 삭제하도록 구현<br/><br/><br/><br/><br/>



### 🎧 <a href="https://youtu.be/R992GeG4idk">시연영상</a>
</br></br></br></br>

### 🛠 문제 해결 과정
⚠️ LLM을 통한 답변의 정확도<br/>
<table>
  <tr>
    <td>
    <strong>문제</strong>
    </td>
    <td>
    <strong>LLM을 통해 답변을 받았을 때, 답변의 신뢰도가 떨어짐</strong>  
    </td>
  </tr>
  <tr>
    <td>원인</td>
    <td>학습된 원래의 데이터는 과거 데이터이고, 많은 데이터를 학습했지만 신뢰도가 떨어짐</td>
  </tr>
  <tr>
    <td>해결</td>
    <td>RAG기술을 사용하여 TOUR 4.0 관광정보 API 데이터를 기반으로 학습시킨 후 해당 값을 답변하도록 구현</td>
  </tr>
</table><br/><br/>

⚠️ 데이터베이스 설계<br/>
<table>
  <tr>
    <td>
    <strong>문제</strong>
    </td>
    <td>
    <strong>PyMongo를 통해 파이썬과 MongoDB를 사용하려고 설계</strong>  
    </td>
  </tr>
  <tr>
    <td>원인</td>
    <td>파이썬과 연동이 쉬운 MongoDB를 사용하려고 설계했으나 유저관리와 데이터를 불러오는 과정이 아쉬움</td>
  </tr>
  <tr>
    <td>해결</td>
    <td>MySQL을 사용하여 테이블을 설계하고 데이터베이스 기능들을 구현</td>
  </tr>
</table><br/><br/>

⚠️ 다크모드 구현<br/>
<table>
  <tr>
    <td>
    <strong>문제</strong>
    </td>
    <td>
    <strong>모든 페이지별 다크모드 구현 및 유지</strong>  
    </td>
  </tr>
  <tr>
    <td>원인</td>
    <td>처음 구조할 때에 페이지별 상태를 설정하는 코드를 작성하여 유지보수가 힘듬</td>
  </tr>
  <tr>
    <td>해결</td>
    <td>상위 컴포넌트인 APP.js에서 React Hooks을 사용하여 상태관리를 해주고 하위 컴포넌트에 상태를 전달달</td>
  </tr>
</table><br/><br/><br/><br/>

## ⚙️ 프로젝트 설치 및 실행 방법

### 📝 Prerequisites
- Python 3.11.4
- pip 23.1.2
- Node.js 20.11.0
- npm 10.2.4
- MySQL 8.0.36


### 📦 설치 방법
`git clone https://github.com/hkyuuu00/Navi.git`<br/><br/>
.env 파일 생성 후 API 키 수정
```sh
GEMINI_API_KEY=(GeminiAPIKEY)

REACT_APP_JAVASCRIPT_KEY=(KakaoMapAPIKEY)

DB_HOST=(host)
DB_USER=(user)
DB_PASSWORD=(password)
DB_DATABASE=(db)
```
<br/><br/>
venv 설치 및 실행
```sh
python -m venv venv
.\venv\Scripts\Activate.ps1
venv\Scripts\activate
pip install Flask
pip install flask-cors
pip install python-dotenv
pip install mysql-connector-python
pip install pandas
pip install langchain langchain_google_genai
```
<br/><br/>
flask 서버 실행
```sh
cd server
python server.py
```
<br/><br/>
클라이언트 패키지 다운 및 실행
```sh
cd navi-client
npm i
npm start
```
