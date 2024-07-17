<img width=100% src="https://github.com/user-attachments/assets/56738c49-a28e-49a7-b501-88c1d49c9779">

# 나만의 여행비서 : NAVI

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

### 💼 REWARD5의 기능
1. 회원가입을 통해 로그인을 할 수 있으며, 비회원으로도 이용 가능
2. 선호도 조사를 할 수 있는 간단한 문제를 진행하거나 여행지 페이지를 통해 카테고리 선택 가능
3. 선호도 조사를 끝내거나 카테고리를 선택하고 지역을 선택하면 사용자 맞춤형 관광지를 추천해주고 상세정보와 위치정보 확인 가능
4. 로그인을 했으면 스크랩 버튼을 통한 여행지 저장 가능
5. 마이페이지에서 계정을 관리할 수 있으며, 저장된 여행지 정보를 카테고리별로 확인 가능
6. 다크모드를 구현하여 사용자가 원하는 테마를 사용 가능
<br/><br/>

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


### 💻 기술 스택
- **FrameWork:** &nbsp;&nbsp;![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB ) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
- **Style:** &nbsp;&nbsp;![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
- **Language:** &nbsp;&nbsp;![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- **Database** &nbsp;&nbsp;![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
- **Tools:** &nbsp;&nbsp;![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
<br/><br/>


### ✨ 주요 기능 및 이미지
📌 Home<br/>
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/4899a646-3abc-4837-927d-1002c53329a8"><br/><br/>
- **메뉴바:** 로고와 각종 기능들을 이용할 수 있는 메뉴 바 구현<br/>
- **광고:** 사용자에게 어떻게 사용하는지와 사용하고 싶도록 디자인 구현<br/><br/><br/>

📌 Account<br/>
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/2da2bd54-a770-4bd0-a697-6817690276a2"><br/><br/>
- **회원가입:** ID를 입력하여 회원가입을 진행, 회원가입 시 5000포인트를 적립되며 중복 ID 불가<br/>
- **추천인 등록:** 추천인을 등록할 수 있으며 추천을 한 사람에게는 500포인트, 받은 사람에게는 1000포인트를 적립, 추천은 계정 당 1회만 가능<br/>
- **회원탈퇴:** ID를 입력하여 회원탈퇴를 진행, 회원탈퇴 시 적립 포인트 모두 삭제<br/><br/><br/>

📌 Payment<br/>
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/244033d6-f968-43ae-af4b-cff67ab39ffd"><br/><br/>
- **결제:** 본인의 ID를 입력하고 결제할 가격과 사용할 포인트 입력 (사용하지 않을 시에는 0 입력)<br/>
- **포인트 적립:** 사용자가 결제 진행 후 결제한 가격의 1% 포인트 적립<br/>
- **관리자 수수료:** 결제한 가격의 2% 수수료를 징수<br/><br/><br/>

📌 Send<br/>
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/fe2fd520-fee9-4f44-8473-cdeac31fc851"><br/><br/>
- **포인트 선물:** 보내는 유저와 받는 유저의 ID를 입력 후 선물 포인트 입력 후 버튼을 누르면 5% 수수료를 빼고 받는 유저에게 지급<br/>
- **관리자 수수료:** 선물 포인트의 5% 수수료를 징수<br/><br/><br/>

📌 Event<br/>
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/a1237384-a054-4589-a2ba-5a715ca32427"><br/><br/>
- **로또 참여:** 유저 ID를 입력하여 참여, 입력한 유저는 100포인트를 차감하고 Lotto 총 금액에 추가, 로또 당첨 시 Lotto 총 금액에 대한 포인트를 받음<br/>
- **회원정보 및 Lotto 금액:** 유저들이 서비스를 이용하면서 자신의 포인트와 로또 금액을 볼 수 있도록 구현<br/><br/><br/>

📌 일별 지출 확인<br/>
<img width=100% src="https://github.com/hkyuuu00/dev-mode/assets/155419559/074ea8f0-270b-4e14-a45d-021895b1e2b0"><br/><br/>
- **비밀번호 입력:** 관리자 페이지이기에 다른 유저가 들어오지 못하도록 패스워드 입력 후 접근 가능<br/>
- **수수료 조회:** 관리자가 징수한 수수료를 확인할 수 있도록 구현<br/>
- **로또 이벤트 참여자 조회:** 로또의 참여자 명단을 기록하도록 구현<br/>
- **로또 추첨 버튼:** 로또를 추첨하여 당첨된 유저에게 Lotto 총 금액에 모인 포인트 지급, 로또는 랜덤으로 당첨<br/><br/><br/><br/><br/>

### 🎧 <a href="https://youtu.be/RS7BLJ2unoM">시연영상</a>
</br></br></br></br>

### 🛠 문제 해결 과정
⚠️ API 통신 에러<br/>
<table>
  <tr>
    <td>
    <strong>문제</strong>
    </td>
    <td>
    <strong>API 통신을 하는 과정에서 에러 발생</strong>  
    </td>
  </tr>
  <tr>
    <td>원인</td>
    <td>동일한 출처의 리소스에만 접근하도록 제한</td>
  </tr>
  <tr>
    <td>해결</td>
    <td>한 도메인 웹 페이지가 다른 도메인 을 가진 리소스에 액세스 할 수 있도록 CORS 사용</td>
  </tr>
</table><br/><br/>

⚠️ 체인코드에서 사용자 정보 조회<br/>
<table>
  <tr>
    <td>
    <strong>문제</strong>
    </td>
    <td>
    <strong>사용자 정보를 전체 불러오는 것에 어려움</strong>  
    </td>
  </tr>
  <tr>
    <td>원인</td>
    <td>처음에는 입력값을 받아 해당 데이터를 조회하는 방식을 가지고 수정</td>
  </tr>
  <tr>
    <td>해결</td>
    <td>해당 데이터를 모두 받아 Json으로 파싱 후 Key, Value 값을 호출하여 출력</td>
  </tr>
</table><br/><br/><br/><br/>

## ⚙️ 프로젝트 설치 및 실행 방법

### 📝 Prerequisites
- Oracle VM VirtualBox 6.1
- Ubuntu 22.04.x
- cURL
- Docker Community Edition CE 23.0.6
- Docker Compose 1.27.4 이상
- Go 1.16.7
- Git 2.9.x 이상
- Python 2.7.17
- Node.js 12.13.1
- npm 5.6.0
- VSCode v1.28


### 📦 설치 방법
⚡ 우분투 환경의 IP를 확인하여 코드 수정 후 진행<br/><br/>
우분투 환경에서 서버 설치<br/>

```sh
// 하이퍼레저 패브릭 샘플 및 바이너리 다운로드
cd ~/go/src
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.2 1.4.9

// 프로젝트 다운
cd $GOPATH/src/
rm -rf dev-mode
git clone https://github.com/hkyuuu00/dev-mode.git
cd $GOPATH/src/dev-mode/basic-network
cp -r $GOPATH/src/fabric-samples/bin/ ./

// 체인코드 인증서 발급 및 설치, 서버 실행
cd $GOPATH/src/dev-mode
./network.sh clean
./network.sh dev
./network.sh installCC dev abstore
./network.sh startSDK
```

윈도우 환경에서 클라이언트 설치<br/>

```sh
git clone https://github.com/hkyuuu00/reward5-api-server.git
cd reward5-api-server
npm install
npm start
```

## 🏰Client, Server repository
📱 <a href="https://github.com/hkyuuu00/reward5-api-server">Client</a></br>
💻 <a href="https://github.com/hkyuuu00/dev-mode">Server</a></br>

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


// 서버 실행

cd server
python server.py

---

// 클라이언트 실행

cd navi-client
npm i
npm start

---
