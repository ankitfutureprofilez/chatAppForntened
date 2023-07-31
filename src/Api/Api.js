import axios from 'axios';
const tokens = localStorage.getItem("token");

let Api = axios.create({
    baseURL: "http://chat-appbackend.vercel.app/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens}`
    }
});
export default Api;