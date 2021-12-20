import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NODE_KINESIS_BASE_URL } from "../../route";
const trackApi = axios.create({
    baseURL: NODE_KINESIS_BASE_URL,
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
