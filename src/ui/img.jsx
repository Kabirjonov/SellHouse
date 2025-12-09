import React from "react";
import { logo } from "../constatnts";

function Img({ height = 72, circle, url }) {
	const imageUrl = url
		? `${process.env.VITE_API_URL}/${url}` // backend to‘liq path
		: logo;

	return (
		<img
			className={circle ? "rounded-circle" : "rounded"}
			src={imageUrl}
			alt='profile'
			width={height}
			height={height}
			style={{ objectFit: "cover" }}
		/>
	);
}

export default Img;
