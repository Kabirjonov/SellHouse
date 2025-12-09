import { Head } from "..";
import CountUp from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faHandshake,
	faBuilding,
} from "@fortawesome/free-solid-svg-icons";

function Feature() {
	// Dinamik featured list
	const featured = [
		{
			title: "For Sell",
			count: 12,
			icon: faHouse,
			text: "Number of houses currently for sale.",
		},
		{
			title: "For Rent",
			count: 12,
			icon: faHandshake,
			text: "Number of houses for rent.",
		},
		{
			title: "All",
			count: 24,
			icon: faBuilding,
			text: "Total number of available homes.",
		},
	];

	return (
		<div className='bg-light'>
			<div className='container text-center py-5'>
				<Head
					title='Featured Property Types'
					text="Bizda mavjud bo'lgan turli xil uy turlari bilan tanishing."
				/>
				<div className='row'>
					{featured.map((item, index) => (
						<div className='col-lg-3 mx-auto' key={index}>
							<div className='shadow p-4 mb-2' style={{ height: "15rem" }}>
								<FontAwesomeIcon
									icon={item.icon}
									size='3x'
									className='mb-3 text-darkblue'
								/>{" "}
								{/* Icon qo‘shildi */}
								<h2>{item.title}</h2>
								<h4>
									<CountUp
										start={0}
										end={item.count}
										duration={5}
										separator=','
									/>
								</h4>
								<p>{item.text}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Feature;
