import axios from "axios";

const trackApi = axios.create({
    baseURL: "https://nodekinesisapi-dev-fbfdb9543a.herokuapp.com",
});

export default trackApi;
