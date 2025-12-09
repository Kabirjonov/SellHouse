import axios from "./api";
const AuthService = {
	async userRegister(user) {
		const { data } = await axios.post("/auth/register", user, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return data;
	},
	async getUserHouses() {
		const { data } = await axios.get("/user/houses");
		return data;
	},
	async userLogin(user) {
		const { data } = await axios.post("/auth/login", user);
		return data;
	},
	async getUser() {
		const { data } = await axios.get("/user/me");
		return data;
	},
	async getUsers() {
		const { data } = await axios.get("/user/getAll"); // only admins can get all users information
		return data;
	},
	async putUser(user) {
		const { data } = await axios.put(`/user/update`, user, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return data;
	},
	async deleteUser(id) {
		const { data } = await axios.delete(`/user/delete/${id}`);
		return data;
	},
};
export default AuthService;
