import axios from 'axios';
const tokens = localStorage.getItem('token');
const baseURL = process.env.REACT_APP_BASE_URL
console.log("REACT_APP_BASE_URL",baseURL)

let Api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens}`
  }
});

export default Api;