
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

import agilityBanner from "../../public/js/Agility_banner_home.json"


export default function HeroAnimation({ animation }) {

	let animationData = null
	if (animation === "Agility_banner_home") animationData = agilityBanner



	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		}
	};

	const [theWidth, setTheWidth] = useState(600);
	const [theHeight, setTheHeight] = useState(400);

	useEffect(() => {

		if (typeof window === 'undefined') return;

		const calcPadding = () => {
			const width = document.body.clientWidth;
			if (width < 600) {
				setTheWidth(width)
				setTheHeight(width * 0.6666666666666666)
			} else {
				setTheHeight(400)
				setTheWidth(600)
			}
		}
		calcPadding();
		window.addEventListener("resize", calcPadding);
		return () => {
			window.removeEventListener("resize", calcPadding);
		}

	}, [])

	if (!animationData) return null


	return (
		<div>
			<Lottie
				options={defaultOptions}
				height={theHeight}
				width={theWidth}

			/>
		</div>
	)
}