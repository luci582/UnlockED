interface Logger {
  info: (message: string) => void;
  error: (message: string, error?: any) => void;
  warn: (message: string) => void;
  debug: (message: string) => void;
}

const createLogger = (): Logger => {
  const timestamp = () => new Date().toISOString();
  
  return {
    info: (message: string) => {
      console.log(`[${timestamp()}] INFO: ${message}`);
    },
    error: (message: string, error?: any) => {
      console.error(`[${timestamp()}] ERROR: ${message}`);
      if (error) {
        console.error(error);
      }
    },
    warn: (message: string) => {
      console.warn(`[${timestamp()}] WARN: ${message}`);
    },
    debug: (message: string) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${timestamp()}] DEBUG: ${message}`);
      }
    }
  };
};

export const logger = createLogger();
