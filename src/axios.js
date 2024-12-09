import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VUE_APP_API_BASE_URL, //
    timeout: 10000,
})

export default axiosInstance;