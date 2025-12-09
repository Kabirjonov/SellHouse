import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function HousePagination() {
	const { page, total, limit } = useSelector(state => state.house);
	const dispatch = useDispatch();

	const totalPages = Math.ceil(total / limit);

	const changePage = newPage => {
		if (newPage < 1 || newPage > totalPages) return;
		dispatch({ type: "houses/setPage", payload: newPage });
	};

	const pageItems = [];
	for (let i = 1; i <= totalPages; i++) {
		pageItems.push(
			<PaginationItem key={i} active={i === page}>
				<PaginationLink
					href='#'
					onClick={e => {
						e.preventDefault();
						changePage(i);
					}}
				>
					{i}
				</PaginationLink>
			</PaginationItem>
		);
	}

	return (
		<div className='d-flex justify-content-center my-4'>
			<Pagination>
				{/* Previous */}
				<PaginationItem disabled={page === 1}>
					<PaginationLink
						href='#'
						previous
						onClick={e => {
							e.preventDefault();
							changePage(page - 1);
						}}
					/>
				</PaginationItem>

				{/* Dynamic pages */}
				{pageItems}

				{/* Next */}
				<PaginationItem disabled={page === totalPages}>
					<PaginationLink
						href='#'
						next
						onClick={e => {
							e.preventDefault();
							changePage(page + 1);
						}}
					/>
				</PaginationItem>
			</Pagination>
		</div>
	);
}
