import axios from 'axios';
import path from 'path';
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
