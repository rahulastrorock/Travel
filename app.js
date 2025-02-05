const path = require('path');
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const fs = require('fs');
const { successResponse, errorResponse } = require('./src/utils/response.utils');
const requestLogger = require('./src/middleware/requestLogger');
const errorLogger = require('./src/middleware/errorLogger');
const connectDB = require('./src/config/database')

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const app = express();

// Security middleware
app.use(helmet());
app.use(mongoSanitize());

// Middleware 
app.use(requestLogger); // Move logger before JSON parser
app.use(express.json());

// API Routes
app.get('/api/setupdb', async (req, res, next) => {
    try {
        const result = await connectDB.setupDb();
        successResponse(res, 200, 'Database seeded successfully', result.data);
    } catch (error) {
        next(error); // Pass to error handler
    }
});

// Routes
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/guides', require('./src/routes/guide.routes'));
app.use('/api/reviews', require('./src/routes/review.routes'));
app.use('/api/groups', require('./src/routes/group.routes'));
app.use('/api/itineraries', require('./src/routes/userItinerary.routes'));

// Error handling middleware (must be last)
app.use(errorLogger);
app.use((err, req, res, next) => {
    errorResponse(res, 500, err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));