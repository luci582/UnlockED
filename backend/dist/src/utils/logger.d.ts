interface Logger {
    info: (message: string) => void;
    error: (message: string, error?: any) => void;
    warn: (message: string) => void;
    debug: (message: string) => void;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map