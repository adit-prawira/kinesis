import axios from "axios";

const trackApi = axios.create({
    baseURL: "http://20434bc314d8.ngrok.io",
});

export default trackApi;
