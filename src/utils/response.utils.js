const successResponse = (res, status = 200, message = 'Success', data = null) => {
    return res.status(status).json({
      success: true,
      message,
      data
    });
  };
  
  const errorResponse = (res, status = 400, message = 'Error', errors = null) => {
    return res.status(status).json({
      success: false,
      message,
      errors
    });
  };
  
  module.exports = { successResponse, errorResponse };