const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("./userProvider");
const userService = require("./userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const { Console } = require("winston/lib/winston/transports");

exports.login = async function (req, res) {

    const {id, pw} = req.body;

    const signInResponse = await userService.postSignIn(id, pw);
    return res.send(signInResponse);
};

exports.logout = async function (req, res) {

    //미구현

    return res.send(logoutInResponse);
};


