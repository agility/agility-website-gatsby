import React, { useState, useEffect } from 'react';
import './Carousel.scss'
import Slider from "react-slick";

import { graphql, StaticQuery, useStaticQuery, Link } from "gatsby"


const Carousel = ({ item }) => {

	item = item.customFields;


	const referenceName = item.images.referencename;

	const query = useStaticQuery(graphql`
		query CarouselItems {
			images: allAgilityCarouselItem {
				nodes {
					contentID
					properties {
						referenceName
						itemOrder
					}
					customFields {
						title
						image {
							url
							height
							width
						}
					}
				}
			}
	}
	`);


	//filter out and sort the images we need here
	const images = query.images.nodes
		.filter(i => i.properties.referenceName === referenceName)
		.sort((a, b) => a.properties.itemOrder - b.properties.itemOrder);

	const [centerPadding, setCenterPadding] = useState('120px');
	const [centerMode, setCenterMode] = useState(true);

	useEffect(() => {

		if (typeof window === 'undefined') return;

		const calcPadding = () => {
			const width = document.body.clientWidth;
			if (width < 720) {
				setCenterPadding('0px');
				setCenterMode(false);
			} else {

				const padding = Math.floor((width - 720) / 2);
				setCenterPadding(padding + 'px');
				setCenterMode(true);
			}

		}


		calcPadding();

		window.addEventListener("resize", calcPadding);

		return () => {
			window.removeEventListener("resize", calcPadding);
		}


	}, [])

	const settings = {
		dots: false,
		infinite: true,
		autoplaySpeed: 5000,
		speed: 350,
		arrows: true,
		centerPadding: centerPadding,
		centerMode: true,
		rows: 1,
		slidesToShow: 1,
		slidesToScroll: 1,

	};



	return (

		<section className="carousel">
			<div className="carousel-slider">
				<Slider {...settings}>

					{images.map(item => {

						let img = ""
						if (item.customFields.image && item.customFields.image.url) {
							img = item.customFields.image?.url + '?format=auto&w=1200'
							if (img.indexOf('.svg') > -1) {
								img = item.customFields.image?.url
							}
						}

						return (
							<div className="slider-item" key={`slide-${item.contentID}`}>
								<div className='slider-inner'>
									{/* <div className='excerpt' title={item.customFields.excerpt}>{item.customFields.excerpt}</div> */}
									<div className="slider-row">

										{img &&
											<div className='img'>
												<img src={img} alt="" loading="lazy" />
											</div>
										}
									</div>
								</div>
							</div>
						);
					})}


				</Slider>
			</div>




		</section>


	);
}

export default Carousel;
