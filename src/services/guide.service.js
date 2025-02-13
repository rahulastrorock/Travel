const TravelGuide = require('../utils/connection.utils').getTravelGuideCollection;
const User = require('../utils/connection.utils').getUserCollection;
const crypto = require('crypto');

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
            const { destination, tags, budgetMin, budgetMax, productType } = searchParams;
    
            const query = {};
    
            // Build search query
            if (destination) {
                query.destination = new RegExp(destination, 'i');  // Case-insensitive search
            }
    
            if (budgetMin || budgetMax) {
                //parse the values as integers
                if (budgetMin) {
                    query['budget.min'] = { $gte: parseInt(budgetMin) }; // min filter
                }
                if (budgetMax) {
                    query['budget.max'] = { $lte: parseInt(budgetMax) }; // max filter
                }
            }
    
            // Simple tag search using $in operator
            if (tags) {
                // Convert string input to array if needed
                const searchTags = typeof tags === 'string' ? [tags] : tags;
    
                // Case-insensitive search for any matching tag
                query.tags = { 
                    $in: searchTags.map(tag => new RegExp(tag, 'i'))
                };
            }
            if (productType) {
                query.productType = productType;
            }
    
            // Fetch matching guides from the database
            const guides = await TravelGuide.find(query);
    
            if (guides.length === 0) {
                throw new Error("No guides found matching your search criteria.");
            }
    
            return guides;
        } catch (error) {
            // Handle any errors during the search process
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

    // async createShareableLink(userId, guideId) {
    //     // Check if guide exists and user has access to it
    //     const user = await User.findOne({
    //         _id: userId,
    //         favoriteGuides: guideId
    //     });

    //     if (!user) {
    //         throw new Error('Guide not found in favorites');
    //     }

    //     // Generate share token
    //     const shareToken = crypto.randomBytes(32).toString('hex');

    //     // Update guide with share token
    //     await TravelGuide.updateOne(
    //         { _id: guideId },
    //         {
    //             $set: {
    //                 shareLinks: shareToken
    //             }
    //         }
    //     );
    //     return shareToken;
    // }

    // async getSharedGuide(token) {
    //     // Find guide with valid share token and not expired
    //     const guide = await TravelGuide.findOne({
    //         shareLinks: token
    //     });

    //     if (!guide) {
    //         throw new Error('Shared guide not found or link expired');
    //     }

    //     return guide;
    // }   



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