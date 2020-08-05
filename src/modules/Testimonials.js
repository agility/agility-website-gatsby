import React, { useEffect, useState } from 'react';

import {
	ButtonBack,
	ButtonNext,
	CarouselProvider,
	Slide,
	Slider
} from 'pure-react-carousel';
import { renderHTML } from '../agility/utils'

import 'pure-react-carousel/dist/react-carousel.es.css';
import "./Testimonials.scss"

const Testimonials = ({ item }) => {

	const [state, setState] = useState({
		carouselSize: 2,
		carouselWidth: 520,
		carouselHeight: 354
	})

	useEffect(() => {

		//only run this on the client
		if (typeof window === 'undefined') return;

		window.addEventListener("resize", setCarouselSize);

		setCarouselSize();

		return function cleanup() {
			window.removeEventListener("resize", setCarouselSize);
		};

	}, [])

	let moduleItem = item;
	item = item.customFields;

	const testimonials = item.testimonials.map(function (item) {
		return <TestimonialContent item={item.customFields} key={item.contentID + "-" + moduleItem.contentID} />
	})


	/**
	 * Sets the carousel size - called on load and on resize of the window
	 */
	const setCarouselSize = function () {

		const width = document.body.clientWidth;
		if (width > 1200) {
			setState({
				carouselSize: 2,
				carouselWidth: 520,
				carouselHeight: 354
			})
		} else {
			setState({
				carouselSize: 1
			})

			if (width < 550) {
				setState({
					carouselWidth: 300,
					carouselHeight: 270
				})

			}
		}


	}


	return (

		<section className="testimonials">
			<div className="container-my">
				<h2 className="title-component" dangerouslySetInnerHTML={renderHTML(item.header)}></h2>
				<p className="intro" dangerouslySetInnerHTML={renderHTML(item.subHeading)}></p>
				<div className="testimonials-list">

					<CarouselProvider
						className="carousel"
						visibleSlides={state.carouselSize}
						totalSlides={item.testimonials.length}
						naturalSlideWidth={state.carouselWidth}
						naturalSlideHeight={state.carouselHeight}
					>

						<Slider >
							{testimonials}
						</Slider>

						<ButtonBack>&nbsp;</ButtonBack>
						<ButtonNext>&nbsp;</ButtonNext>

					</CarouselProvider>


				</div>

				<div className="button-wrap">
					{item.bottomlink && item.bottomlink !== undefined && <a className="btn" href={item.bottomlink.href} target={item.bottomlink.target}>{item.bottomlink.text}</a>}
				</div>


			</div>
		</section>


	);
}

export default Testimonials;

const TestimonialContent = ({ item }) => {

	let truncatedExcerpt = item.excerpt.replace(/^(.{200}[^\s]*).*/, "$1")
	if (truncatedExcerpt.length < item.excerpt.length) {
		truncatedExcerpt += "...\"";
	}

	return (
		<Slide>
			<div className="testimonial">
				<div className="item-inner">
					<div className="top-row">
						<div className="image">
							{item.headshot &&
								<img src={item.headshot.url + '?w=93&h=93'} alt={item.title} loading="lazy" />
							}
						</div>
						<div className="title">
							<h3>{item.title}</h3>
							<div>{item.jobTitle}</div>
						</div>
					</div>
					<p title={item.excerpt}>{truncatedExcerpt}</p>
				</div>
			</div>
		</Slide>
	);

}