import React, { useState } from "react";
import { Button, Input } from "../../../ui";
import { useDispatch, useSelector } from "react-redux";

import { fetchHouses } from "../../../helpers/fetchUserExtraRudex";
function Search() {
	const [location, setLocation] = useState("");
	const [transactionType, setTransactionType] = useState("");
	const [price, setPrice] = useState("");

	const dispatch = useDispatch();

	const { isLoading } = useSelector(state => state.house);

	const handleSearch = async () => {
		dispatch(fetchHouses({ page: 1, location, price, transactionType }));
	};
	return (
		<div className='d-flex shadow bg-light rounded-top py-2 px-4 align-items-center '>
			<div className='d-flex flex-wrap gap-3 w-100 justify-content-between'>
				{/* <div className='col-lg-3 col-md-4 col-sm-6 mt-3'> */}
				<Input
					label='City/Street'
					value={location}
					onChange={v => setLocation(v)}
				/>
				{/* </div> */}
				{/* <div className='col-lg-3 col-md-4 col-sm-6 mt-3'> */}
				<Input
					value={transactionType}
					onChange={v => setTransactionType(v)}
					type='select'
					label='Transaction Type'
					options={["rent", "sell"]}
				/>
				{/* </div> */}
				{/* <div className='col-lg-3 col-md-4 col-sm-6 mt-3'> */}
				<Input
					label='Price'
					type='number'
					value={price}
					onChange={v => setPrice(v)}
				/>
				{/* </div> */}
				{/* <div className='col-lg-3 col-md-4 col-sm-6 mt-3'> */}
				<Button onClick={handleSearch} disabled={isLoading}>
					{isLoading ? "Searching..." : "Search"}
				</Button>
				{/* </div> */}
			</div>
		</div>
	);
}

export default Search;
