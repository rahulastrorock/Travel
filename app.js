const path = require('path');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const { successResponse, errorResponse } = require('./src/utils/response.utils');
const requestLogger = require('./src/middleware/requestLogger');
const errorLogger = require('./src/middleware/errorLogger');
const connectDB = require('./src/config/database')
const cors = require('cors');


const app = express();


app.use(cors());


// Middleware 
app.use(requestLogger);
app.use(express.json());

// Routes
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')))

app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/guides', require('./src/routes/guide.routes'));
app.use('/api/reviews', require('./src/routes/review.routes'));
app.use('/api/groups', require('./src/routes/group.routes'));
app.use('/api/itineraries', require('./src/routes/userItinerary.routes'));

// API Routes
app.get('/api/setupdb', async (req, res, next) => {
    try {
        const result = await connectDB.setupDb();
        successResponse(res, 200, 'Database seeded successfully', result.data);
    } catch (error) {
        next(error);
    }
});

// Error handling middleware 
app.use(errorLogger);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));