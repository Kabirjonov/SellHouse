import { createSlice } from "@reduxjs/toolkit";
import { fetchHouses } from "../helpers/fetchUserExtraRudex";
const initialState = {
	items: [], // uylar
	loading: false,
	error: null,

	// pagination
	page: 1,
	limit: 9,
	total: 0,
	// search filters
	filters: {
		location: "",
		price: "",
		transactionType: "",
	},
};
const houseSlice = createSlice({
	name: "houses",
	initialState,
	reducers: {
		setFilters(state, action) {
			state.filters = { ...state.filters, ...action.payload };
			state.page = 1; // har safar qidiruvda page reset bo‘ladi
		},
		setPage(state, action) {
			state.page = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchHouses.pending, state => {
				state.loading = true;
			})
			.addCase(fetchHouses.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.data; // backendga qarab moslashingiz mumkin
				state.total = action.payload.total; // backendga qarab moslashingiz mumkin
			})
			.addCase(fetchHouses.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
export const { setFilters, setPage } = houseSlice.actions;
export default houseSlice.reducer;
