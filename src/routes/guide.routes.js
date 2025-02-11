const express = require('express');
const router = express.Router();
const guideService = require('../services/guide.service');
const { authenticate } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');
const upload = require('../middleware/upload.middleware');
require('dotenv').config();

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

// // Public route for accessing shared guide
// router.get('/shared/:token', async (req, res) => {
//     try {
//         const guide = await guideService.getSharedGuide(req.params.token);
//         if (!guide) {
//             return res.status(404).json({ success: false, message: 'Shared guide not found or link expired' });
//         }
//         res.json({ success: true, data: guide });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });


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


// router.post('/share/:guideId', async (req, res) => {
//     try {
//         const shareToken = await guideService.createShareableLink(req.user._id, req.params.guideId);
//         res.json({ 
//             success: true, 
//             data: {
//                 shareLink: `${process.env.FRONTEND_URL}/api/guides/shared/${shareToken}`,
//                 token: shareToken
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });


// Admin routes
router.use(isAdmin);

router.post('/', 
    upload.array('photos', 5), // Add this middleware for handling file uploads
    async (req, res) => {
        try {
            // Get photo paths from uploaded files
            const photoPaths = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];
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


router.put('/:id', 
    upload.array('photos', 5), // Add upload middleware
    async (req, res) => {
        try {
            // Get new photo paths from uploaded files
            const newPhotoPaths = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];
            
            // Combine update data with new photo paths
            const updateData = {
                ...req.body,
                // If new photos uploaded, add them to existing photos
                ...(newPhotoPaths.length > 0 && { 
                    $push: { photos: { $each: newPhotoPaths } }
                })
            };

            const guide = await guideService.updateGuide(req.params.id, updateData);
            if (!guide) {
                return res.status(404).json({ success: false, message: 'Guide not found' });
            }
            res.json({ success: true, data: guide });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
);

router.delete('/:id', async (req, res) => {
    try {
        await guideService.deleteGuide(req.params.id);
        res.json({ success: true, message: 'Guide deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// //for file upload
// router.post('/',
//     upload.array('photos', 5), // 'photos' is the field name, 5 is max number of files
//     async (req, res) => {
//         try {
//             // Get file paths
//             const photoPaths = req.files.map(file => `/uploads/${file.filename}`);
            
//             // Create guide with photos
//             const guide = new TravelGuide({
//                 ...req.body,
//                 photos: photoPaths,
//                 createdBy: req.user._id
//             });
 
//             await guide.save();
//             res.status(201).json({
//                 success: true,
//                 data: guide
//             });
//         } catch (error) {
//             res.status(400).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }
//  );
 
module.exports = router;