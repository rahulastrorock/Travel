const express = require('express');
const router = express.Router();
const TravelGuide = require('../models/TravelGuide');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');

// Search travel guides
router.get('/search', authenticate, async (req, res) => {
    try {
        const { destination, duration, budget, productType } = req.query;
        const query = {};

        if (destination) {
            query.destination = new RegExp(destination, 'i');
        }
        if (duration) {
            query.duration = { $lte: parseInt(duration) };
        }
        if (budget) {
            query['budget.min'] = { $gte: parseInt(budget.min) };
            query['budget.max'] = { $lte: parseInt(budget.max) };
        }
        if (productType) {
            query.productType = productType;
        }

        const guides = await TravelGuide.find(query)
            .sort({ averageRating: -1 })
            .limit(20);

        // Get recommendations based on tags
        const tags = guides.flatMap(guide => guide.tags);
        const recommendations = await TravelGuide.find({
            tags: { $in: tags },
            _id: { $nin: guides.map(g => g._id) }
        }).limit(5);

        res.json({
            success: true,
            data: { guides, recommendations }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get guide by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const guide = await TravelGuide.findById(req.params.id)
            .populate('createdBy', 'username');
        if (!guide) {
            return res.status(404).json({
                success: false,
                message: 'Guide not found'
            });
        }
        res.json({
            success: true,
            data: guide
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Add guide to favorites
router.post('/favorites/:guideId', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.favoriteGuides.addToSet(req.params.guideId);
        await user.save();
        res.json({
            success: true,
            message: 'Guide added to favorites'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get user's favorite guides
router.get('/favorites', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('favoriteGuides');
        res.json({
            success: true,
            data: user.favoriteGuides
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Admin routes
// Add new guide
router.post('/', [authenticate, isAdmin], async (req, res) => {
    try {
        const guide = new TravelGuide({
            ...req.body,
            createdBy: req.user._id
        });
        await guide.save();
        res.status(201).json({
            success: true,
            data: guide
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Update guide
router.put('/:id', [authenticate, isAdmin], async (req, res) => {
    try {
        const guide = await TravelGuide.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!guide) {
            return res.status(404).json({
                success: false,
                message: 'Guide not found'
            });
        }
        res.json({
            success: true,
            data: guide
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Delete guide
router.delete('/:id', [authenticate, isAdmin], async (req, res) => {
    try {
        const guide = await TravelGuide.findByIdAndDelete(req.params.id);
        if (!guide) {
            return res.status(404).json({
                success: false,
                message: 'Guide not found'
            });
        }
        res.json({
            success: true,
            message: 'Guide deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;