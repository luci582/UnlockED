"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const createLogger = () => {
    const timestamp = () => new Date().toISOString();
    return {
        info: (message) => {
            console.log(`[${timestamp()}] INFO: ${message}`);
        },
        error: (message, error) => {
            console.error(`[${timestamp()}] ERROR: ${message}`);
            if (error) {
                console.error(error);
            }
        },
        warn: (message) => {
            console.warn(`[${timestamp()}] WARN: ${message}`);
        },
        debug: (message) => {
            if (process.env.NODE_ENV === 'development') {
                console.log(`[${timestamp()}] DEBUG: ${message}`);
            }
        }
    };
};
exports.logger = createLogger();
//# sourceMappingURL=logger.js.map