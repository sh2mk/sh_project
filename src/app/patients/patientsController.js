const jwtMiddleware = require("../../../config/jwtMiddleware");
const patientsProvider = require("./patientsProvider");
const patientsService = require("./patientsService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

//환자 정보 조회
exports.getPatients = async function (req, res) {
    const patientId = req.query.patientId;

    const getPatientsResponse = await patientsService.getPatients(patientId);

    return res.send(getPatientsResponse);
}

exports.modifyPatients = async function (req, res) {
    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;
    const nickname = req.body.nickname;


    
    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
    
        const editUserInfo = await userService.editUser(userId, nickname);
        return res.send(editUserInfo);
    }
};


exports.deletePatients = async function (req, res) {
    const patientId = req.query.patientId;

    const deletePatientsResponse = await patientsService.deletePatients(patientId);

    return res.send(deletePatientsResponse);
    

};


exports.postPatients = async function (req, res) {
    /**
     * Body: name, ssn, birthDate, cellPhne, phone, email, addresses, images
    **/
    const {name, ssn, birthDate, cellPhone, phone, email, addresses, images} = req.body;

    const createResponse = await patientsService.createPatients(
        name, ssn, birthDate, cellPhone, phone, email, addresses, images
    );

    console.log("createResponse : ",createResponse)

    return res.send(createResponse);
};


