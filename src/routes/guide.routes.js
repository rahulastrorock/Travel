const express = require('express');
const router = express.Router();
const guideService = require('../services/guide.service');
const { authenticate } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');
// const { guideValidators } = require('../middleware/validators/guide.validator');

// Public routes
router.get('/list', async (req, res) => {
    try {
        const guides = await guideService.listPublicGuides();
        res.json({ success: true, data: guides });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/details/:id', async (req, res) => {
    try {
        const guide = await guideService.getGuideDetails(req.params.id);
        if (!guide) {
            return res.status(404).json({ success: false, message: 'Guide not found' });
        }
        res.json({ success: true, data: guide });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Authenticated routes
router.use(authenticate);

router.get('/search', 
    async (req, res) => {
        try {
            const searchResults = await guideService.searchGuides(req.query);
            res.json({
                success: true,
                data: searchResults
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
);

router.post('/favorites/:guideId', async (req, res) => {
    try {
        await guideService.addToFavorites(req.user._id, req.params.guideId);
        res.json({ success: true, message: 'Added to favorites' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/favorites/:guideId', async (req, res) => {
    try {
        await guideService.removeFromFavorites(req.user._id, req.params.guideId);
        res.json({ success: true, message: 'Removed from favorites' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/favorites', async (req, res) => {
    try {
        const guides = await guideService.getFavoriteGuides(req.user._id);
        res.json({ success: true, data: guides });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Admin routes
router.use(isAdmin);

router.post('/', async (req, res) => {
    try {
        const guide = await guideService.createGuide(req.body, req.user._id);
        res.status(201).json({ success: true, data: guide });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const guide = await guideService.updateGuide(req.params.id, req.body);
        if (!guide) {
            return res.status(404).json({ success: false, message: 'Guide not found' });
        }
        res.json({ success: true, data: guide });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await guideService.deleteGuide(req.params.id);
        res.json({ success: true, message: 'Guide deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


module.exports = router;