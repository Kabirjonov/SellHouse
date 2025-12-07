import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth";
import houseReducer from "../slice/houses";
export default configureStore({
	reducer: {
		auth: authReducer,
		house: houseReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});
