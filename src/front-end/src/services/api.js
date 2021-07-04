import axios from 'axios';
import path from 'path';
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000',
});

export default api;
