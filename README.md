최수현 작업물

실행방법 ----------------------------------------------
1. README 파일과 같은 위치에 .env 생성

SERVER_PORT="3000"
NODE_ENV = 'Development'
DB_HOST='localhost'
DB_PORT='3306'
DB_USER='root'
DB_PASS=''
DB_NAME='hoapital'

JWT_SECRET_KEY=jwtSecret

위의 내용 넣기 (본인 DB설정입력, 제가 한 설정에서 비밀번호만 지웠습니다.)

2. NPM INSTALL 

3. 실행 : nodemon

4. 제공받은 sql에는 user 정보를 저장하는 곳이 없어 postman으로 임의의 id와 pw를 정하여 사용함
   임의로 정한 user 정보를 통해 토큰을 만들어 헤더에 x-access-token 명칭으로 전송함
   (postman으로 사용할 경우) KEY = x-access-token / VALUE : (토큰) 을 입력하여 진행했음

-------------------------------------------------------

파일구조 설명-------------------------------------------
1. config
토큰, 응답관련 설정파일
2. patients
환자 생성, 조회, 수정, 삭제 관련 코드
Router -> Controller -> Service -> Dao

3. User
(회원가입), 로그인, 로그아웃 관련 코드
Router -> Controller -> Service -> Dao

---------------------------------------------------------

구현유무
1. 로그인
로그인 O
로그아웃 X

2. 환자
POST O
GET O
PATCH X
DELETE O

3. 이미지
x

-----------------------------------------------------------