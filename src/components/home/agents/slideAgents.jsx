import Slider from "react-slick";
import { Image } from "../../../ui";

function SlideAgents() {
	const settings = {
		infinite: true,
		autoplay: true,
		speed: 2000,
		autoplaySpeed: 4000,
		slidesToShow: 3,
		slidesToScroll: 1,
		cssEase: "linear",
	};
	return (
		<div className='slider-container'>
			<Slider {...settings}>
				{Array(5)
					.fill(null)
					.map((_, index) => (
						<div
							className='card mx-auto p-2 shadow w-75'
							style={{ height: "18rem" }}
							key={index}
						>
							<div className='d-flex justify-content-center'>
								<Image circle />
							</div>
							<div className='card-body mx-auto'>
								<h4 className='card-title'>
									{/* {user.firstName + " " + user.lastName} */}
									Jon Doe
								</h4>
								<p className='card-text'>Never give up</p>
								<p>Call: 88 333 44 55</p>
							</div>
						</div>
					))}
			</Slider>
		</div>
	);
}

export default SlideAgents;
