import axios from 'axios';
const tokens = localStorage.getItem('token');

let Api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens}`
  }
});

export default Api;