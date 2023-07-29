import axios from 'axios';
const tokens = localStorage.getItem("token");
const baseURL=process.env.URL
console.log(baseURL)
let Api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens}`
    }
});
export default Api;