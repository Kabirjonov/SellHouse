import axios from "axios";
import { getItem } from "../helpers/manage-localstory";
axios.defaults.baseURL =
	process.env.REACT_APP_API_URL || "http://localhost:3005/api";
axios.interceptors.request.use(config => {
	const token = getItem("token");
	config.headers.token = token ? token : "";
	return config;
});
export default axios;
