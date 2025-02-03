const mongoose = require('mongoose');
const data = require('../../data');
const { getUserCollection, getTravelGuideCollection } = require('../utils/connection.utils');

exports.setupDb = async () => {
    try {
        console.log("Starting database setup...");
        
        // Get collection models
        const Users = await getUserCollection();
        const TravelGuides = await getTravelGuideCollection();
        
        if (!Users || !TravelGuides) {
            return {
                status: 500,
                data: {
                    success: false,
                    message: 'Failed to get collections'
                }
            };
        }

        // Clear existing data
        await Users.collection.deleteMany({});
        // console.log('Existing users cleared');

        // Insert users
        const createdUsers = await Users.collection.insertMany(data.users);
        console.log('Users seeded successfully');

        // Add user references to guides
        const guidesWithUsers = data.travelGuides.map(guide => ({
            ...guide,
            createdBy: createdUsers.insertedIds[0]
        }));

        // Clear and insert guides
        await TravelGuides.collection.deleteMany({});
        await TravelGuides.collection.insertMany(guidesWithUsers);
        console.log('Travel guides seeded successfully');

        return {
            status: 200,
            data: {
                success: true,
                message: 'Database seeded successfully',
                data: {
                    users: createdUsers.insertedCount,
                    guides: guidesWithUsers.length
                }
            }
        };
    } catch (error) {
        console.error('Database setup error:', error);
        return {
            status: 500,
            data: {
                success: false,
                message: error.message
            }
        };
    }
};