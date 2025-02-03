const { errorResponse } = require('../utils/response.utils');

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return errorResponse(res, 403, 'Admin access required');
  }
  next();
};

module.exports = { isAdmin };