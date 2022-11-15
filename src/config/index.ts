import dotenv from 'dotenv';

const isDevelopment: boolean = process.env.NODE_ENV !== 'production';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10),
  mongoURI: isDevelopment
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV,
};
