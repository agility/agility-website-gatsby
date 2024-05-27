
import React from 'react';
import Lottie from 'react-lottie';

import agilityBanner from "../../public/js/Agility_banner_home.json"


export default function HeroAnimation({ animation }) {

	let animationData = null
	if (animation === "Agility_banner_home") animationData = agilityBanner
	console.log("anim", animation, animationData)
	if (!animationData) return null

	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice"
		}
	};

	return (
		<div>
			<Lottie
				options={defaultOptions}
				height={400}

			/>
		</div>
	)
}