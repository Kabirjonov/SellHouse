import axios from "axios";
axios.defaults.baseURL =
	process.env.REACT_APP_API_URL || "http://localhost:3005/api";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
	return config;
});
export default axios;
