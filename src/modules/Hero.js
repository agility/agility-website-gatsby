import React, { useEffect, useRef } from 'react';
import './Hero.scss'

const Hero = ({ item }) => {
	const fields = item.customFields


	return (

		<section className="hero-module" >
			<div className="container">

				<img src={fields.image.url + "?format=auto&w=480"} alt={fields.image.label} />
				<h1>{fields.heading}</h1>
				<h2>{fields.subHeading}</h2>
				<p>{fields.content}</p>
				<a href={fields.cTA.href} target={fields.cTA.target} className="btn btn-yellow">{fields.cTA.text}</a>
			</div>
		</section>

	);
}

export default Hero;
