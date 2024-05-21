import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'request-logging' },
    transports: [
        new winston.transports.File({ filename: 'Logs.log' })
    ]
});

export const loggerMiddleware = async (req, res, next) => {

    if (req.url.startsWith('/api/users/signup') || req.url.startsWith('/api/users/signin')) {
        next()
    }
    else {
        const timestamp = new Date().toString();
        const logEntry = `${timestamp}\n req URL: ${req.url}\n reqBody: ${JSON.stringify(req.body)}`
        logger.info(logEntry);
        next();
    }
};
export default loggerMiddleware;
