const express = require('express');
const router = express.Router();
const TravelGroup = require('../models/TravelGroup');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth.middleware');

// Create group
router.post('/', authenticate, async (req, res) => {
    try {
        const { name, description, isPublic } = req.body;
        const group = new TravelGroup({
            name,
            description,
            creator: req.user._id,
            members: [req.user._id],
            isPublic
        });

        await group.save();

        // Update creator's groups field
        await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { groups: group._id } }
        );

        // Populate creator and members information
        await group.populate('creator', 'username');
        await group.populate('members', 'username');

        res.status(201).json({
            success: true,
            data: group
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all public groups
router.get('/public', authenticate, async (req, res) => {
    try {
        const groups = await TravelGroup.find({ isPublic: true })
            .populate('creator', 'username')
            .populate('members', 'username');
        res.json({
            success: true,
            data: groups
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get user's groups
router.get('/my-groups', authenticate, async (req, res) => {
    try {
        const groups = await TravelGroup.find({
            members: req.user._id
        })
        .populate('creator', 'username')
        .populate('members', 'username');
        res.json({
            success: true,
            data: groups
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Join group
router.post('/:groupId/join', authenticate, async (req, res) => {
    try {
        const group = await TravelGroup.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({
                success: false,
                message: 'Group not found'
            });
        }

        if (!group.isPublic) {
            return res.status(403).json({
                success: false,
                message: 'This is a private group'
            });
        }

        // Check if user is already a member
        if (group.members.includes(req.user._id)) {
            return res.status(400).json({
                success: false,
                message: 'You are already a member of this group'
            });
        }

        // Update group members
        group.members.addToSet(req.user._id);
        await group.save();

        // Update user's groups
        await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { groups: group._id } }
        );

        // Populate updated group info
        await group.populate('members', 'username');

        res.json({
            success: true,
            message: 'Joined group successfully',
            data: group
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Leave group
router.post('/:groupId/leave', authenticate, async (req, res) => {
    try {
        const group = await TravelGroup.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({
                success: false,
                message: 'Group not found'
            });
        }

        if (group.creator.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Group creator cannot leave the group'
            });
        }

        // Remove user from group members
        group.members.pull(req.user._id);
        await group.save();

        // Remove group from user's groups
        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { groups: group._id } }
        );

        res.json({
            success: true,
            message: 'Left group successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Send message in group
router.post('/:groupId/messages', authenticate, async (req, res) => {
    try {
        const { content } = req.body;
        const group = await TravelGroup.findById(req.params.groupId);
        
        if (!group) {
            return res.status(404).json({
                success: false,
                message: 'Group not found'
            });
        }

        if (!group.members.includes(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'You are not a member of this group'
            });
        }

        group.messages.push({
            sender: req.user._id,
            content
        });

        await group.save();

        // Populate sender information for the new message
        const newMessage = group.messages[group.messages.length - 1];
        await group.populate('messages.sender', 'username');

        res.status(201).json({
            success: true,
            data: newMessage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get group messages
router.get('/:groupId/messages', authenticate, async (req, res) => {
    try {
        const group = await TravelGroup.findById(req.params.groupId)
            .populate('messages.sender', 'username');

        if (!group) {
            return res.status(404).json({
                success: false,
                message: 'Group not found'
            });
        }

        if (!group.members.includes(req.user._id)) {
            return res.status(403).json({
                success: false,
                message: 'You are not a member of this group'
            });
        }

        res.json({
            success: true,
            data: group.messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;