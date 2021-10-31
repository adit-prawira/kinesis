import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const trackApi = axios.create({
    baseURL: "https://nodekinesisapi-dev-fbfdb9543a.herokuapp.com/api",
});
trackApi.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (err) => new Promise.reject(err)
);
export default trackApi;
