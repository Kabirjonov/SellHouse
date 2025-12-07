import { createSlice } from "@reduxjs/toolkit";
import { deleteItem, setItem } from "../helpers/manage-localstory";

const initialState = {
	isLogin: false,
	isLoading: false,
	user: null,
	error: null,
};
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userAuthStart: state => {
			state.isLoading = true;
		},
		userAuthSeccess: (state, action) => {
			state.isLoading = false;
			state.user = action.payload.body;
			state.isLogin = true;
			state.error = null;
			if (action.payload.token) setItem("token", action.payload.token);
		},
		userAuthFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		userLogOut: state => {
			state.isLogin = false;
			state.user = null;
			deleteItem("token");
		},
		userLogOutFail(state, action) {
			state.error = action.payload;
		},
	},
});
export const {
	userLogOutFail,
	userLogOut,
	userAuthStart,
	userAuthSeccess,
	userAuthFail,
} = authSlice.actions;
export default authSlice.reducer;
