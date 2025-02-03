const TravelGuide = require('../models/TravelGuide');

class GuideService {
  async searchGuides(query) {
    const { destination, duration, budget, productType } = query;
    const searchQuery = {};
    
    if (destination) searchQuery.destination = new RegExp(destination, 'i');
    if (duration) searchQuery.duration = { $lte: parseInt(duration) };
    if (budget) {
      searchQuery['budget.min'] = { $gte: parseInt(budget.min) };
      searchQuery['budget.max'] = { $lte: parseInt(budget.max) };
    }
    if (productType) searchQuery.productType = productType;

    const guides = await TravelGuide.find(searchQuery)
      .sort({ averageRating: -1 })
      .limit(20);

    const tags = guides.flatMap(guide => guide.tags);
    const recommendations = await TravelGuide.find({
      tags: { $in: tags },
      _id: { $nin: guides.map(g => g._id) }
    }).limit(5);

    return { guides, recommendations };
  }

  async addToFavorites(userId, guideId) {
    return await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favoriteGuides: guideId } },
      { new: true }
    );
  }
}

module.exports = new GuideService();