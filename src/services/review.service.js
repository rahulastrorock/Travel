const Review = require('../utils/connection.utils').getReviewCollection;
const TravelGuide = require('../utils/connection.utils').getTravelGuideCollection;

class ReviewService {
    async getGuideReviews(guideId, location) {
        const query = { guideId };
        if (location) {
            query.location = new RegExp(location, 'i');
        }
        
        const reviews = await Review.find(query)
            .populate('userId', 'username')
            .sort({ createdAt: -1 });
        return reviews;
    }

    async createReview(reviewData) {
        const review = new Review(reviewData);
        await review.save();

        // Update guide's rating
        const guide = await TravelGuide.findById(reviewData.guideId);
        guide.totalReviews += 1;
        guide.averageRating = 
            (guide.averageRating * (guide.totalReviews - 1) + reviewData.rating) / 
            guide.totalReviews;
        await guide.save();

        return review;
    }

    async updateReview(reviewId, userId, updateData) {
        const review = await Review.findOne({
            _id: reviewId,
            userId
        });

        if (!review) {
            throw new Error('Review not found or unauthorized');
        }

        if (updateData.rating !== review.rating) {
            const guide = await TravelGuide.findById(review.guideId);
            guide.averageRating = 
                (guide.averageRating * guide.totalReviews - review.rating + updateData.rating) / 
                guide.totalReviews;
            await guide.save();
        }

        Object.assign(review, updateData);
        await review.save();
        return review;
    }

    async deleteReview(reviewId, userId) {
        const review = await Review.findOne({
            _id: reviewId,
            userId
        });

        if (!review) {
            throw new Error('Review not found or unauthorized');
        }

        const guide = await TravelGuide.findById(review.guideId);
        guide.totalReviews -= 1;
        if (guide.totalReviews > 0) {
            guide.averageRating = 
                (guide.averageRating * (guide.totalReviews + 1) - review.rating) / 
                guide.totalReviews;
        } else {
            guide.averageRating = 0;
        }
        await guide.save();

        await review.deleteOne();
    }
}

module.exports = new ReviewService();