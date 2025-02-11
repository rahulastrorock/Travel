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
const cors = require('cors');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const app = express();

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:4200',  // Your Angular app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// Security middleware
// app.use(helmet());
// app.use(mongoSanitize());

// Remove this as we're using cors middleware now
// app.use((req, res, next) => {
//     res.set('Cross-Origin-Resource-Policy', 'cross-origin');
//     next();
// });

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

// Error handling middleware (must be last)
app.use(errorLogger);
app.use((err, req, res, next) => {
    errorResponse(res, 500, err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));