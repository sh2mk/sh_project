module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    //로그인
    app.post('/app/v1/user/login/', user.login);

    //로그아웃 
    app.post('/app/v1/user/logout/',jwtMiddleware, user.logout);

}