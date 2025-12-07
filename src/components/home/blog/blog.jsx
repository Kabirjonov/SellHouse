import { Head, Search, BlogCard } from "../";
import { useSelector, useDispatch } from "react-redux";
import { fetchHouses } from "../../../helpers/fetchUserExtraRudex";
import { useEffect } from "react";

function Blog() {
	const { page, limit, filters } = useSelector(state => state.house);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchHouses({ page, limit, ...filters }));
	}, [page, filters]);
	return (
		<div className='container text-center py-5'>
			<Head
				title='Recent Property Listed'
				text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
			/>
			<Search />
			{/* {isLoading && <Loader />} */}
			<BlogCard />
			<div className='d-flex justify-content-center'>
				{/* <Pagination>{pageItems}</Pagination> */}
			</div>
		</div>
	);
}

export default Blog;
