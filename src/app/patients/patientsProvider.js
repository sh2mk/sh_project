const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const patientsDao = require("./patientsDao");

  exports.ssnCheck = async function (ssn) {
    const connection = await pool.getConnection(async (conn) => conn);
    const ssnCheckResult = await patientsDao.selectpatientsSsn(
        connection,
        ssn
    );
    connection.release();
    return ssnCheckResult[0];
  };


