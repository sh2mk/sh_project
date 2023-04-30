module.exports = {

 
    SUCCESS : {  "code": 200, "message": "Success", "data": {}},

    TOKEN_EMPTY : { "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "code": 1001, "message":"JWT 토큰 검증 성공" }, 

    //오류
    DB_ERROR : { "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "code": 4001, "message": "서버 에러"},
 
    SIGNUP_REDUNDANT_SSN : { "code": 5000, "message": "이미 존재하는 환자입니다." },
}
