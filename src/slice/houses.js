/*import { createSlice } from "@reduxjs/toolkit";
import { fetchHouses } from "../helpers/fetchUserExtraRudex";
const initialState = {
	isLoading: false,
	houses: [],
	myHouses: [],
	error: null,
	page: 0,
	limit: 10,
};
export const houseSlice = createSlice({
	name: "houses",
	initialState,
	reducers: {
		postHouseStart(state) {
			// postHouse functions also use for delete house in MyHouses component
			state.isLoading = true;
		},
		postHouseSeccess(state) {
			state.isLoading = false;
		},
		posthouseFail(state, action) {
			state.isLoading = false;
			state.error = action.payload?.message;
		},
		getUserHousesStart: state => {
			state.isLoading = true;
		},
		getUserHousesSeccess: (state, action) => {
			state.isLoading = false;
			state.myHouses = action.payload;
		},
		getUserHousesFail: state => {
			state.isLoading = false;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchHouses.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchHouses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.houses = action.payload.houses;
				state.error = null;
				state.totalPage = action.payload.totalPage;
				state.page = action.payload.page;
			})
			.addCase(fetchHouses.rejected, (state, action) => {
				state.isLoading = false;
				state.houses = [];
				state.totalPage = 0;
				state.error = action.payload;
				console.log(action);
			});
	},
});

export const {
	getUserHousesFail,
	getUserHousesSeccess,
	getUserHousesStart,
	postHouseSeccess,
	postHouseStart,
	posthouseFail,
} = houseSlice.actions;
export default houseSlice.reducer;
*/
import { createSlice } from "@reduxjs/toolkit";
import { fetchHouses } from "../helpers/fetchUserExtraRudex";
const initialState = {
	items: [], // uylar
	loading: false,
	error: null,

	// pagination
	page: 1,
	limit: 10,
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
				state.total = action.payload.total;
			})
			.addCase(fetchHouses.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
export const { setFilters, setPage } = houseSlice.actions;
export default houseSlice.reducer;
