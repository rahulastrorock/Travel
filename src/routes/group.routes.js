const express = require('express');
const router = express.Router();
const groupService = require('../services/group.service');
const { authenticate } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');
// const { groupValidators } = require('../middleware/validators');

// Create group
router.post('/', 
    authenticate, 
    // groupValidators.createGroup,
    async (req, res,next) => {
        try {
            const group = await groupService.createGroup(req.user, req.body);
            res.status(201).json({
                success: true,
                data: group
            });
        } catch (error) {
            next(error)
        }
    }
);

// Get all public groups
router.get('/public', authenticate, async (req, res,next) => {
    try {
        const groups = await groupService.getPublicGroups();
        res.json({
            success: true,
            data: groups
        });
    } catch (error) {
        next(error)
    }
});

// Get user's groups
router.get('/my-groups', authenticate, async (req, res,next) => {
    try {
        const groups = await groupService.getUserGroups(req.user._id);
        res.json({
            success: true,
            data: groups
        });
    } catch (error) {
        next(error)
    }
});

//get group by id
router.get('/:groupId', authenticate, async (req, res,next) => {
    try {
        const group = await groupService.getGroupById(req.params.groupId)
        res.json({
            success: true,
            data: group
        });
    } catch (error) {
        next(error)
    }
});





// Join group
router.post('/:groupId/join', 
    authenticate,
    async (req, res,next) => {
        try {
            const group = await groupService.joinGroup(req.params.groupId, req.user._id);
            res.json({
                success: true,
                message: 'Joined group successfully',
                data: group
            });
        } catch (error) {
            next(error)
        }
    }
);

// // Leave group
// router.post('/:groupId/leave', 
//     authenticate,
//     async (req, res) => {
//         try {
//             await groupService.leaveGroup(req.params.groupId, req.user._id);
//             res.json({
//                 success: true,
//                 message: 'Left group successfully'
//             });
//         } catch (error) {
//             res.status(error.message.includes('not found') ? 404 : 400).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }
// );

// Send message in group
router.post('/:groupId/messages', 
    authenticate,
    // groupValidators.sendMessage,
    async (req, res,next) => {
        try {
            const message = await groupService.addMessage(
                req.params.groupId,
                req.user._id,
                req.body.content
            );
            res.status(201).json({
                success: true,
                data: message
            });
        } catch (error) {
            next(error)
        }
    }
);

// Get group messages
router.get('/:groupId/messages', 
    authenticate,
    async (req, res,next) => {
        try {
            const messages = await groupService.getMessages(req.params.groupId, req.user._id);
            res.json({
                success: true,
                data: messages
            });
        } catch (error) {
            next(error)
        }
    }
);

// Admin routes

// router.use(isAdmin);
// router.get('/admin/all',
//     async (req, res) => {
//         try {
//             const groups = await groupService.getAllGroups();
//             res.json({
//                 success: true,
//                 data: groups
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }
// );

// router.delete('/admin/:groupId',
//     async (req, res) => {
//         try {
//             await groupService.deleteGroup(req.params.groupId);
//             res.json({
//                 success: true,
//                 message: 'Group deleted successfully'
//             });
//         } catch (error) {
//             res.status(error.message.includes('not found') ? 404 : 500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }
// );

module.exports = router;


