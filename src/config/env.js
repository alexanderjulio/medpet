import dotenv from 'dotenv';

dotenv.config();

export default {
  WEBHOOK_VERIFY_TOKEN: process.env.WEBHOOK_VERIFY_TOKEN,
  API_TOKEN: process.env.API_TOKEN,
  BUSINESS_PHONE: process.env.BUSINESS_PHONE,
  API_VERSION: process.env.API_VERSION,
  PORT: process.env.PORT || 3001,
  BASE_URL: process.env.BASE_URL,
  GOOGLE_CREDENTIALS: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  SHEET_ID: process.env.SHEET_ID
};