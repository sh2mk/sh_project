const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const patientsProvider = require("./patientsProvider");
const patientsDao = require("./patientsDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

Date.prototype.YYYYMMDDHHMMSS = function () {
    var yyyy = this.getFullYear().toString();
    var MM = pad(this.getMonth() + 1,2);
    var dd = pad(this.getDate(), 2);
    var hh = pad(this.getHours(), 2);
    var mm = pad(this.getMinutes(), 2)
    var ss = pad(this.getSeconds(), 2)
  
    return yyyy +  MM + dd+  hh + mm + ss;
  };
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
}

//환자 생성
exports.createPatients = async function (name, ssn, birthDate, cellPhone, phone, email, addresses, images) {
    try {
        // 주민번호 중복 확인 (등록되어있는 환자인지)
        const ssnRows = await patientsProvider.ssnCheck(ssn);
        if (ssnRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_SSN);

        // 주민번호 암호화
        const hashedSsn = await crypto
            .createHash("sha512")
            .update(ssn)
            .digest("hex");

        let newDate = new Date();

        // 환자 정보 저장
        const insertPatientsInfoParams = [name, ssn, hashedSsn, birthDate, cellPhone, phone, email, newDate.YYYYMMDDHHMMSS()];

        const connection = await pool.getConnection(async (conn) => conn);

        const patientsResult = await patientsDao.insertPatientsInfo(connection, insertPatientsInfoParams);
        const patientsIdResult = await patientsDao.selectpatientsId(connection, ssn)

        // 환자 주소 저장 
        const insertPatientsAdressInfoParams = [patientsIdResult[0].patientId, addresses[0].address1, addresses[0].address2, newDate.YYYYMMDDHHMMSS()];
        const patientsAddressResult = await patientsDao.insertPatientsAddressInfo(connection, insertPatientsAdressInfoParams);

        // 환자 이미지 저장 
        const insertPatientsImageInfoParams = [patientsIdResult[0].patientId, images[0].imageUrl, images[0].imageSize, images[0].imageTxt, newDate.YYYYMMDDHHMMSS()];
        const patientsImageResult = await patientsDao.insertPatientsImageInfo(connection, insertPatientsImageInfoParams);

        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createPatients Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//환자 정보 조회
exports.getPatients = async function (patientId) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);

        //환자 정보 불러오기
        const patientsInfoResult = await patientsDao.selectPatientsInfo(connection, patientId); 
        //환자 주소정보 불러오기
        const patientsAddressResult = await patientsDao.selectPatientsAddressInfo(connection, patientId);        
        //환자 이미지정보 불러오기
        const patientsImageResult = await patientsDao.selectPatientsImageInfo(connection, patientId);

        connection.release();

        const [patientsResult1] = patientsInfoResult
        const [patientsResult2] = patientsAddressResult
        const [patientsResult3] = patientsImageResult

        const patientsResult = [
            {
            "patientId" : patientsResult1.patientId,
            "name" : patientsResult1.name,
            "ssn" : patientsResult1.ssn,
            "encssn": patientsResult1.enssn,
            "birthDate": patientsResult1.birthDate,
            "cellPhone": patientsResult1.cellPhone,
            "phone": patientsResult1.phone,
            "imageUrl": patientsResult3.imageUrl,
            "addresses":[
                    {
                        "zipcode": patientsResult2.zipcode,
                        "address1": patientsResult2.address1,
                        "address2": patientsResult2.address2,
                        "createdAt": patientsResult2.createdAt 
                    }
                ],
            "images": [
                    {
                    "imageUrl": patientsResult3.imageUrl,
                    "imageSize": patientsResult3.imageSize,
                    "imageTxt": patientsResult3.imageTxt,
                    "createdAt": patientsResult3.createdAt
                    }
                ],
            "createdAt" : "string"
            }
        ]
        return response(baseResponse.SUCCESS,patientsResult);

    } catch (err) {
        logger.error(`App - getPatients Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//환자 삭제
exports.deletePatients = async function (patientId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deletePatientsResult = await patientsDao.deletePatients(connection, patientId)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deletePatients Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

