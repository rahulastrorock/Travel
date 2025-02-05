const UserItinerary = require('../utils/connection.utils').getItinerariesCollection;
const TravelGuide = require('../utils/connection.utils').getTravelGuideCollection;

class UserItineraryService {
    async createItinerary(userId, data, guideId) {
        const {  title, customItinerary, totalBudget } = data;

        // Verify guide exists
        const guide = await TravelGuide.findById(guideId);
        if (!guide) {
            throw new Error('Travel guide not found');
        }

        // Create user itinerary
        const itinerary = new UserItinerary({
            userId,
            basedOnGuide: guideId,
            title,
            duration: customItinerary.length,
            customItinerary,
            totalBudget
        });

        await itinerary.save();
        return itinerary;
    }

    async getUserItineraries(userId) {
        return await UserItinerary.find({ userId })
            .populate('basedOnGuide', 'title destination')
            .sort('-createdAt');
    }

    // async getItineraryById(userId, itineraryId) {
    //     const itinerary = await UserItinerary.findOne({
    //         _id: itineraryId,
    //         userId
    //     }).populate('basedOnGuide');

    //     if (!itinerary) {
    //         throw new Error('Itinerary not found');
    //     }

    //     return itinerary;
    // }

    // async updateItinerary(userId, itineraryId, updates) {
    //     const itinerary = await UserItinerary.findOne({
    //         _id: itineraryId,
    //         userId
    //     });

    //     if (!itinerary) {
    //         throw new Error('Itinerary not found');
    //     }

    //     Object.assign(itinerary, updates);
    //     await itinerary.save();
    //     return itinerary;
    // }

    async deleteItinerary(userId, itineraryId) {
        const itinerary = await UserItinerary.findOneAndDelete({
            _id: itineraryId,
            userId
        });

        if (!itinerary) {
            throw new Error('Itinerary not found');
        }

        return true;
    }
}

module.exports = new UserItineraryService();