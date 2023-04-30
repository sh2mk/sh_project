// 회원 조회
async function selectpatientsId(connection, ssn) {
    const selectPatientIdQuery = `
                   SELECT patientId
                   FROM patient
                   WHERE ssn = ?;
                   `;
    const [idRow] = await connection.query(selectPatientIdQuery, ssn);
    return idRow;
  }
  
// 주민번호 중복 체크
async function selectpatientsSsn(connection, ssn) {
  const selectpatientsSsnQuery = `
        SELECT patientId
        FROM patient
        WHERE ssn = ?`;
  const selectpatientsSsnRow = await connection.query(
    selectpatientsSsnQuery,
      ssn
  );

  return selectpatientsSsnRow;
}

// 환자 생성
async function insertPatientsInfo(connection, insertPatientsInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO patient(name, ssn, enssn, birthDate, cellPhone, phone, email, createdAT)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertPatientsInfoParams
  );

  return insertUserInfoRow;
}

// 주소 생성
async function insertPatientsAddressInfo(connection, insertPatientsAddressParams) {
  const insertPatientsAddressQuery = `
        INSERT INTO patient_address(patientId, address1, address2, createdAT)
        VALUES (?, ?, ?, ?);
    `;
  const insertPatientsAddressRow = await connection.query(
    insertPatientsAddressQuery,
    insertPatientsAddressParams
  );

  return insertPatientsAddressRow;
}

// 이미지 생성
async function insertPatientsImageInfo(connection, insertPatientsParams) {
  const insertPatientsQuery = `
        INSERT INTO patient_image(patientId, imageUrl, imageSize, imageTxt, createdAT)
        VALUES (?, ?, ?, ?,?);
    `;
  const insertPatientsAddressRow = await connection.query(
    insertPatientsQuery,
    insertPatientsParams
  );

  return insertPatientsAddressRow;
}

// 환자 정보 불러오기
async function selectPatientsInfo(connection, patientId) {
  const selectPatientsInfoQuery = `
                 SELECT patientId, name, ssn, enssn, birthDate, cellPhone, phone
                 FROM patient
                 WHERE patientId = ?;
                 `;
  const [userRow] = await connection.query(selectPatientsInfoQuery, patientId);
  return userRow;
}
// 환자 주소 정보 불러오기
async function selectPatientsAddressInfo(connection, patientId) {
  const selectPatientsAddressInfoQuery = `
                 SELECT *
                 FROM patient_address
                 WHERE patientId = ?;
                 `;
  const [userRow] = await connection.query(selectPatientsAddressInfoQuery, patientId);
  return userRow;
}
// 환자 이미지 정보 불러오기
async function selectPatientsImageInfo(connection, patientId) {
  const selectPatientsImageInfoQuery = `
                 SELECT *
                 FROM patient_image
                 WHERE patientId = ?;
                 `;
  const [userRow] = await connection.query(selectPatientsImageInfoQuery, patientId);
  return userRow;
}

//환자 삭제
async function deletePatients(connection, patientId){
  const deletePatientsQuery = `
  DELETE a, b, c FROM patient a 
  INNER JOIN patient_address b
  INNER JOIN patient_image c
  WHERE 
  a.patientId = b.patientId AND b.patientId = c.patientId
  AND a.patientId = ?;
  `;
const [userRow] = await connection.query(deletePatientsQuery, patientId);
return userRow;
}



  module.exports = {
    insertPatientsInfo,
    selectpatientsSsn,
    selectpatientsId,
    insertPatientsAddressInfo,
    insertPatientsImageInfo,
    insertPatientsImageInfo,
    selectPatientsInfo,
    selectPatientsAddressInfo,
    selectPatientsImageInfo,
    deletePatients
  };