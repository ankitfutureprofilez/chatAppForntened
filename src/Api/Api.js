import axios from 'axios';
const tokens = localStorage.getItem('token');
console.log("REACT_APP_BASE_URL Api",process.env.REACT_APP_BASE_URL)
let Api = axios.create({
  baseURL: "http://chat-appbackend.vercel.app",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens}`
  }
});

export default Api;