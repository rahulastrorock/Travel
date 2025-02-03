const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const fs = require('fs');
const requestLogger = require('./middleware/requestLogger');
const errorLogger = require('./middleware/errorLogger');
const connectDB = require('./config/database')

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/guides', require('./routes/guide.routes'));
app.use('/api/reviews', require('./routes/review.routes'));
app.use('/api/groups', require('./routes/group.routes'));

// Error logger should be after routes
app.use(errorLogger);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});