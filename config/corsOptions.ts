import { allowedOrigins } from './allowedOrigins';

interface CorsOptions {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, success: boolean) => void,
  ) => void;
  optionsSuccessStatus: number;
}

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  optionsSuccessStatus: 200,
};
