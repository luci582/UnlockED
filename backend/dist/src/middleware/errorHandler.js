"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error(`Error in ${req.method} ${req.path}:`, err);
    // Default error
    let error = {
        status: err.status || err.statusCode || 500,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };
    // Handle specific error types
    if (err.name === 'ValidationError') {
        error.status = 400;
        error.message = 'Validation Error';
    }
    if (err.name === 'UnauthorizedError') {
        error.status = 401;
        error.message = 'Unauthorized';
    }
    if (err.name === 'JsonWebTokenError') {
        error.status = 401;
        error.message = 'Invalid token';
    }
    if (err.name === 'TokenExpiredError') {
        error.status = 401;
        error.message = 'Token expired';
    }
    // Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        error.status = 400;
        error.message = 'Database operation failed';
    }
    res.status(error.status).json({
        error: error.message,
        timestamp: new Date().toISOString(),
        path: req.path,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map