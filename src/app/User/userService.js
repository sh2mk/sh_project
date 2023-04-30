const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


exports.postSignIn = async function (id, pw) {
    try {

        //토큰 생성
        let token = await jwt.sign(
            {
                userId: id,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        const data = {
            "accesstoken" : token,
            "accesstokenExp" : "365d",
            "refreshtoken" : "미구현",
            "refrechtokenExp" : "미구현"
        }

        console.log("토큰 : ", token)
        return response(baseResponse.SUCCESS, data);

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};