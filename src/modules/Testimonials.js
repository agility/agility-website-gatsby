import React, { useEffect, useMemo, useState } from 'react';

import { renderHTML } from '../agility/utils'

import Slider from "react-slick";


import "./Testimonials.scss"

const Testimonials = ({ item }) => {



	let moduleItem = item;
	item = item.customFields;

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

		<section className="testimonials">
			<div className="container-my">
				<h2 dangerouslySetInnerHTML={renderHTML(item.header)}></h2>
				<p className="intro" dangerouslySetInnerHTML={renderHTML(item.subHeading)}></p>
			</div>
			<div className="testimonial-slider">
				<Slider {...settings}>

					{item.testimonials.map(item => {

						let logoImg = ""
						if (item.customFields.companyLogo && item.customFields.companyLogo.url) {
							logoImg = item.customFields.companyLogo?.url + '?format=auto&h=50'
							if (logoImg.indexOf('.svg') > -1) {
								logoImg = item.customFields.companyLogo?.url
							}
						}

						return (
							<div className="slider-item" key={`slide-${item.contentID}`}>
								<div className='slider-inner'>
									<div className='excerpt' title={item.customFields.excerpt}>{item.customFields.excerpt}</div>
									<div className="slider-row">
										<div className='slider-person'>
											<div className="image">
												{item.customFields.headshot &&
													<img src={item.customFields.headshot.url + '?format=auto&w=250&h=250'} alt={item.customFields.title} loading="lazy" />
												}
											</div>
											<div className="title">
												<h4>{item.customFields.title}</h4>
												<div className='job-title'>{item.customFields.jobTitle}</div>
											</div>
										</div>
										{item.customFields.companyLogo &&
											<div className='t-logo'>
												<img src={logoImg} alt={item.customFields.companyLogo.label} loading="lazy" />
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

export default Testimonials;
