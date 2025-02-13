const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response.utils');

router.post('/register', async (req, res,next) => {
  try {
    const { user, token } = await authService.register(req.body);
    return successResponse(res, 201, 'Registration successful', { token });
  } catch (error) {
    next(error)
  }
});

router.post('/login', async (req, res,next) => {
  try {
    const { user, token } = await authService.login(req.body.email, req.body.password);
    return successResponse(res, 200, 'Login successful', { user,token });
  } catch (error) {
    next(error)
  }
});


router.post('/forgot-password', async (req, res,next) => {
  try {
      const resetToken = await authService.requestPasswordReset(req.body.email);
      res.json({
          success: true,
          message: 'Password reset token generated',
          data: { resetToken }
      });
  } catch (error) {
    next(error)
  }
});

router.post('/reset-password', async (req, res,next) => {
  try {
      await authService.resetPassword(req.body.token, req.body.newPassword);
      res.json({
          success: true,
          message: 'Password reset successful'
      });
  } catch (error) {
    next(error)
  }
});

module.exports = router;