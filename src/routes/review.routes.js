const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const TravelGuide = require('../models/TravelGuide');
const { authenticate } = require('../middleware/auth.middleware');

// Add review
router.post('/guides/:guideId', authenticate, async (req, res) => {
    try {
        const { rating, comment, location } = req.body;
        
        // Check if user has already reviewed this guide
        const existingReview = await Review.findOne({
            guideId: req.params.guideId,
            userId: req.user._id
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this guide'
            });
        }

        const review = new Review({
            guideId: req.params.guideId,
            userId: req.user._id,
            rating,
            comment,
            location
        });

        await review.save();

        // Update guide's average rating and total reviews
        const guide = await TravelGuide.findById(req.params.guideId);
        guide.totalReviews += 1;
        guide.averageRating = (guide.averageRating * (guide.totalReviews - 1) + rating) / guide.totalReviews;
        await guide.save();

        res.status(201).json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get reviews for a guide
router.get('/guides/:guideId', authenticate, async (req, res) => {
    try {
        const { location } = req.query;
        const query = { guideId: req.params.guideId };
        
        if (location) {
            query.location = new RegExp(location, 'i');
        }

        const reviews = await Review.find(query)
            .populate('userId', 'username')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update review
router.put('/:reviewId', authenticate, async (req, res) => {
    try {
        const review = await Review.findOne({
            _id: req.params.reviewId,
            userId: req.user._id
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or unauthorized'
            });
        }

        const { rating, comment, location } = req.body;
        
        // Update guide's average rating
        if (rating !== review.rating) {
            const guide = await TravelGuide.findById(review.guideId);
            guide.averageRating = (guide.averageRating * guide.totalReviews - review.rating + rating) / guide.totalReviews;
            await guide.save();
        }

        review.rating = rating;
        review.comment = comment;
        review.location = location;
        await review.save();

        res.json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete review
router.delete('/:reviewId', authenticate, async (req, res) => {
    try {
        const review = await Review.findOne({
            _id: req.params.reviewId,
            userId: req.user._id
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found or unauthorized'
            });
        }

        // Update guide's average rating and total reviews
        const guide = await TravelGuide.findById(review.guideId);
        guide.totalReviews -= 1;
        if (guide.totalReviews > 0) {
            guide.averageRating = (guide.averageRating * (guide.totalReviews + 1) - review.rating) / guide.totalReviews;
        } else {
            guide.averageRating = 0;
        }
        await guide.save();

        await review.remove();

        res.json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;