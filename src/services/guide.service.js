const TravelGuide = require('../utils/connection.utils').getTravelGuideCollection;
const User = require('../utils/connection.utils').getUserCollection;

class GuideService {
    async listPublicGuides() {
        //just retun all the guides
        const guides = await TravelGuide.find()
        return guides;
    }

    async getGuideDetails(guideId) {
        const guide = await TravelGuide.findById(guideId)
            .populate('createdBy', 'username');
        return guide;
    }


    async searchGuides(searchParams) {
        try {
            const { destination, duration, budget, productType } = searchParams;
            const query = {};

            // Build search query
            if (destination) {
                query.destination = new RegExp(destination, 'i');
            }
            if (duration) {
                query.duration = { $lte: parseInt(duration) };
            }
            if (budget) {
                if (budget.min) query['budget.min'] = { $gte: parseInt(budget.min) };
                if (budget.max) query['budget.max'] = { $lte: parseInt(budget.max) };
            }
            if (productType) {
                query.productType = productType;
            }

            // Get matching guides
            const guides = await TravelGuide.find(query);

            // // Get recommendations based on tags
            // const tags = guides.flatMap(guide => guide.tags || []);
            // const uniqueTags = [...new Set(tags)];

            // const recommendations = uniqueTags.length > 0 ? 
            //     await TravelGuide.find({
            //         tags: { $in: uniqueTags },
            //         _id: { $nin: guides.map(g => g._id) }
            //     })
            //     .select('title destination description duration budget productType photos averageRating totalReviews')
            //     .sort({ averageRating: -1 })
            //     .limit(5) : 
            //     [];

            return guides;
        } catch (error) {
            throw new Error(`Error searching guides: ${error.message}`);
        }
    }

    async addToFavorites(userId, guideId) {
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { favoriteGuides: guideId } },
            { new: true }
        );
        return user;
    }

    async removeFromFavorites(userId, guideId) {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { favoriteGuides: guideId } },
            { new: true }
        );
        return user;
    }

    async getFavoriteGuides(userId) {
        const user = await User.findById(userId)
            .populate('favoriteGuides');
        return user.favoriteGuides;
    }

    async createGuide(guideData, creatorId) {
        const guide = new TravelGuide({
            ...guideData,
            createdBy: creatorId
        });
        await guide.save();
        return guide;
    }

    async updateGuide(guideId, updateData) {
        const guide = await TravelGuide.findByIdAndUpdate(
            guideId,
            updateData,
            { new: true }
        );
        return guide;
    }

    async deleteGuide(guideId) {
        await TravelGuide.findByIdAndDelete(guideId);
    }
}

module.exports = new GuideService();