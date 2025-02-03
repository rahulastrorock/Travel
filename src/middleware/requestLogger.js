const fs = require('fs');
const path = require('path');

const requestLogger = (req, res, next) => {
    const startTime = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const logData = `
Time: ${new Date().toISOString()}
Method: ${req.method}
URL: ${req.originalUrl}
Status: ${res.statusCode}
Duration: ${duration}ms
IP: ${req.ip}
User-Agent: ${req.headers['user-agent']}
${req.method !== 'GET' ? `Body: ${JSON.stringify(req.body)}` : ''}
-----------------------------------------`;

        fs.appendFile(
            path.join(__dirname, '../logs/requests.txt'),
            logData,
            (err) => {
                if (err) {
                    console.error('Error writing to request log:', err);
                }
            }
        );
    });

    next();
};

module.exports = requestLogger;