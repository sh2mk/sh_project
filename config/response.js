const response = ({code, message}, result) => {
   return {
        code: code,
        message: message,
        data: result
   }
  };

  const errResponse = ({code, message}) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message
      }
  };

  
  
  module.exports = { response, errResponse };