import axios from 'axios';
const tokens = localStorage.getItem('token');
console.log("REACT_APP_BASE_URL",process.env.REACT_APP_BASE_URL)

let Api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens}`
  }
});

export default Api;