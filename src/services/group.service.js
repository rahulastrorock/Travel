const TravelGroup = require('../utils/connection.utils').getGroupCollection;
const User = require('../utils/connection.utils').getUserCollection;

class GroupService {
    async createGroup(userData, groupData) {
        const group = new TravelGroup({
            ...groupData,
            creator: userData._id,
            members: [userData._id]
        });

        await group.save();

        // Update creator's groups
        await User.findByIdAndUpdate(
            userData._id,
            { $addToSet: { groups: group._id } }
        );

        await group.populate('creator', 'username');
        await group.populate('members', 'username');

        return group;
    }

    async getPublicGroups() {
        return await TravelGroup.find({ isPublic: true })
            .populate('creator', 'username')
            .populate('members', 'username');
    }

    async getUserGroups(userId) {
        return await TravelGroup.find({ members: userId })
            .populate('creator', 'username')
            .populate('members', 'username');
    }

    async joinGroup(groupId, userId) {
        const group = await TravelGroup.findById(groupId);
        if (!group) {
            throw new Error('Group not found');
        }

        if (group.members.includes(userId)) {
            throw new Error('You are already a member of this group');
        }

        group.members.addToSet(userId);
        await group.save();

        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { groups: group._id } }
        );

        await group.populate('members', 'username');
        return group;
    }

    // async leaveGroup(groupId, userId) {
    //     const group = await TravelGroup.findById(groupId);
    //     if (!group) {
    //         throw new Error('Group not found');
    //     }

    //     if (group.creator.toString() === userId.toString()) {
    //         throw new Error('Group creator cannot leave the group');
    //     }

    //     group.members.pull(userId);
    //     await group.save();

    //     await User.findByIdAndUpdate(
    //         userId,
    //         { $pull: { groups: group._id } }
    //     );

    //     return group;
    // }

    //find gropy by id
    async getGroupById(groupId) {
        const group = await TravelGroup.findById(groupId)
            .populate('creator', 'username')
            .populate('members', 'username')
            .populate('messages.sender', 'username');

        if (!group) {
            throw new Error('Group not found');
        }

        return group;
    }


    async addMessage(groupId, userId, content) {
        const group = await TravelGroup.findById(groupId);
        if (!group) {
            throw new Error('Group not found');
        }

        if (!group.members.includes(userId)) {
            throw new Error('You are not a member of this group');
        }

        group.messages.push({
            sender: userId,
            content
        });

        await group.save();
        await group.populate('messages.sender', 'username');

        return group.messages[group.messages.length - 1];
    }

    async getMessages(groupId, userId) {
        const group = await TravelGroup.findById(groupId)
            .populate('messages.sender', 'username');

        if (!group) {
            throw new Error('Group not found');
        }

        if (!group.members.includes(userId)) {
            throw new Error('You are not a member of this group');
        }

        return group.messages;
    }

    // Admin methods
    async deleteGroup(groupId) {
        const group = await TravelGroup.findById(groupId);
        if (!group) {
            throw new Error('Group not found');
        }

        // Remove group from all members' groups array
        await User.updateMany(
            { groups: groupId },
            { $pull: { groups: groupId } }
        );

        await TravelGroup.findByIdAndDelete(groupId);
    }

    async getAllGroups() {
        return await TravelGroup.find()
            .populate('creator', 'username')
            .populate('members', 'username');
    }
}

module.exports = new GroupService();