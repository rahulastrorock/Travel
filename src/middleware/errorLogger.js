const fs = require('fs');
const path = require('path');

const errorLogger = (err, req, res, next) => {
    const logData = `
Time: ${new Date().toISOString()}
Error: ${err.message}
Stack: ${err.stack}
Method: ${req.method}
URL: ${req.originalUrl}
Body: ${JSON.stringify(req.body)}
User-Agent: ${req.headers['user-agent']}
-----------------------------------------`;

    fs.appendFile(
        path.join(__dirname, '../logs/errors.txt'),
        logData,
        (err) => {
            if (err) {
                console.error('Error writing to error log:', err);
            }
        }
    );

    // Send error response
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorLogger;
