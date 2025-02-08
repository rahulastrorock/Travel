const express = require('express');
const router = express.Router();
const guideService = require('../services/guide.service');
const { authenticate } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');
const upload = require('../middleware/upload.middleware');
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

router.post('/', 
    upload.array('photos', 5), // Add this middleware for handling file uploads
    async (req, res) => {
        try {
            // Get photo paths from uploaded files
            const photoPaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
            // Combine guide data with photo paths
            const guideData = {
                ...req.body,
                photos: photoPaths,
                createdBy: req.user._id
            };
            const guide = await guideService.createGuide(guideData);
            res.status(201).json({ success: true, data: guide });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
);


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


//for file upload
router.post('/',
    upload.array('photos', 5), // 'photos' is the field name, 5 is max number of files
    async (req, res) => {
        try {
            // Get file paths
            const photoPaths = req.files.map(file => `/uploads/${file.filename}`);
            
            // Create guide with photos
            const guide = new TravelGuide({
                ...req.body,
                photos: photoPaths,
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
    }
 );
 
module.exports = router;