const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response.utils');

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);
    return successResponse(res, 201, 'Registration successful', { token });
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body.email, req.body.password);
    return successResponse(res, 200, 'Login successful', { token });
  } catch (error) {
    return errorResponse(res, 401, error.message);
  }
});


router.post('/forgot-password', async (req, res) => {
  try {
      const resetToken = await authService.requestPasswordReset(req.body.email);
      res.json({
          success: true,
          message: 'Password reset token generated',
          data: { resetToken }
      });
  } catch (error) {
      res.status(400).json({
          success: false,
          message: error.message
      });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
      await authService.resetPassword(req.body.token, req.body.newPassword);
      res.json({
          success: true,
          message: 'Password reset successful'
      });
  } catch (error) {
      res.status(400).json({
          success: false,
          message: error.message
      });
  }
});

module.exports = router;