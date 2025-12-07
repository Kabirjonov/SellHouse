import { Card, CardBody, CardText, CardSubtitle, CardLink } from "reactstrap";
import { Button, CaruselComponent, Image } from "../../../ui";
import { Link } from "react-router-dom";
import ShowHousError from "../../error/showHousError";
import { useSelector } from "react-redux";

function BlogCard() {
	const { items, loading } = useSelector(state => state.house);

	return (
		<div className='py-5 text-start'>
			{loading ? (
				<ShowHousError />
			) : (
				<div className='row'>
					{items.map((house, index) => (
						<div className='col-sm-6 col-md-6 col-lg-4 mb-2' key={index}>
							<Card className='shadow-lg p-2 mb-2 d-grid align-items-center'>
								<CaruselComponent fileUrls={house.picture} />
								<CardBody className=''>
									<CardSubtitle tag='h5' className='mb-2'>
										{house.title}
									</CardSubtitle>
									<CardText className='text-muted mb-2'>
										{house.description.substring(0, 100)}...
									</CardText>
									<CardText className='fw-bold mb-2'>
										${house.price.toLocaleString()}
									</CardText>
									<Link to={`/house/${house._id}`}>
										<Button className='btn btn-primary'>Read More</Button>
									</Link>
								</CardBody>
							</Card>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default BlogCard;
