import NodeGeocoder from 'node-geocoder';
import dotenv from 'dotenv';
// use when seeding db
dotenv.config({ path: './config/config.env' });
// dotenv.config({ path: './backend/config/config.env' });

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
