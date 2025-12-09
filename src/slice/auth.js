import { createSlice } from "@reduxjs/toolkit";

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
			state.user = action.payload;
			state.isLogin = true;
			state.error = null;
		},
		userAuthFail: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		userLogOut: state => {
			state.isLogin = false;
			state.user = null;
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
