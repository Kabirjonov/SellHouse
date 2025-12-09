import { createAsyncThunk } from "@reduxjs/toolkit";
import HouseService from "../service/house.service";

export const fetchHouses = createAsyncThunk(
	"houses/fetchHouses",
	async (query, { rejectWithValue }) => {
		try {
			// query = { page, limit, location, price, transactionType }
			const response = await HouseService.getHouses(query);
			console.log("Fetched houses:", response.body);
			return response.body;
		} catch (err) {
			return rejectWithValue(err.response?.data?.message || "Server error");
		}
	}
);
