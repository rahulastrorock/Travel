// routes/userItinerary.routes.js
const express = require('express');
const router = express.Router();
const userItineraryService = require('../services/userItinerary.service');
const { authenticate } = require('../middleware/auth.middleware');

// Create custom itinerary
router.post('/:guideId', authenticate, async (req, res) => {
    try {
        const itinerary = await userItineraryService.createItinerary(req.user._id, req.body, req.params.guideId);
        res.status(201).json({
            success: true,
            data: itinerary
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Get all user's itineraries
router.get('/', authenticate, async (req, res) => {
    try {
        const itineraries = await userItineraryService.getUserItineraries(req.user._id);
        res.json({
            success: true,
            data: itineraries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// // Get specific itinerary
// router.get('/:id', authenticate, async (req, res) => {
//     try {
//         const itinerary = await userItineraryService.getItineraryById(req.user._id, req.params.id);
//         res.json({
//             success: true,
//             data: itinerary
//         });
//     } catch (error) {
//         res.status(404).json({
//             success: false,
//             message: error.message
//         });
//     }
// });

// // Update itinerary
// router.put('/:id', authenticate, async (req, res) => {
//     try {
//         const itinerary = await userItineraryService.updateItinerary(req.user._id, req.params.id, req.body);
//         res.json({
//             success: true,
//             data: itinerary
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// });

// Delete itinerary
router.delete('/:id', authenticate, async (req, res) => {
    try {
        await userItineraryService.deleteItinerary(req.user._id, req.params.id);
        res.json({
            success: true,
            message: 'Itinerary deleted successfully'
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;