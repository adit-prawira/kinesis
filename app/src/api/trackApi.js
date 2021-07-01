import axios from "axios";

const trackApi = axios.create({
    baseURL: "http://13d395982d05.ngrok.io",
});

export default trackApi;
