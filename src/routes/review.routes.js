const express = require('express');
const router = express.Router();
const reviewService = require('../services/review.service');
const { authenticate } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');
// const { reviewValidators } = require('../middleware/validators/review.validator');

// Public route for viewing reviews
router.get('/guides/:guideId', async (req, res) => {
    try {
        const reviews = await reviewService.getGuideReviews(
            req.params.guideId,
            req.query.location
        );
        res.json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Authenticated routes
router.use(authenticate);

router.post('/guides/:guideId',async (req, res) => {
    try {
        const review = await reviewService.createReview({
            guideId: req.params.guideId,
            userId: req.user._id,
            ...req.body
        });
        res.status(201).json({ success: true, data: review });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:reviewId', async (req, res) => {
    try {
        const review = await reviewService.updateReview(
            req.params.reviewId,
            req.user._id,
            req.body
        );
        res.json({ success: true, data: review });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Admin routes
router.use(isAdmin);

router.delete('/:reviewId', async (req, res) => {
    try {
        await reviewService.deleteReview(req.params.reviewId);
        res.json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
module.exports = router;