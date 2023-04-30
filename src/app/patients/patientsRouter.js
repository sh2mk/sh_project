module.exports = function(app){
    //const user = require('./patientsController');
    const patients = require('./patientsController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.post('/api/v1/patients', jwtMiddleware, patients.postPatients);

    app.get('/api/v1/patients',jwtMiddleware, patients.getPatients);

    app.delete('/api/v1/patients',jwtMiddleware, patients.deletePatients);

/*
    app.patch('/api/v1/patients',jwtMiddleware, patients.modifyPatients);
       */ 
    
}