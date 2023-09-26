import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import './LogoListingModule.scss'
import '../global/core/lib/_slick-theme.scss'
import * as ArrayUtils from '../utils/array-utils.js';
import Spacing from './Spacing'
import { animationElementInnerComponent } from '../global/javascript/animation'
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import ResponsiveImage from '../components/responsive-image';
import Helpers from '../global/javascript/Helpers'
import Lazyload from 'react-lazyload'
import { Link } from 'gatsby';

const LogoListingModule = ({ item, page }) => {
	// console.log('dynamicPageItem', page, item);
	const [spaceBottom, setSpaceBottom] = useState(false)
	const [isIntegration, setIsIntegration] = useState(false);
	const heading = item.customFields.title
	const logos = item.customFields.logos


	const classSection = `module LogoListingModule animation  ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white' : ''}`
	let shuffleLogos = logos
	// let tmpIndex = [];
	// for(let i = 0; i < logos.length; i++) {
	// 		tmpIndex.push(i)
	// }

	// /* not shuffle for this page, bug when shuffle */
	// if (page?.name !== 'implementation') {
	// 	shuffleLogos = ArrayUtils.shuffleArray(logos)
	// } else {
	// 	shuffleLogos = logos
	// }

	//hack - do not shuffle logos
	shuffleLogos = logos

	const listLogos = shuffleLogos.map((key, idx) => {

		/* update alt for iamge */
		// console.log(key.customFields.logo.label, key.customFields.logo.label === null);
		if (!key.customFields?.logo?.label) {
			key.customFields.logo.label = key.customFields?.title || 'Agility'
		}
		const className = `logo-item logo-v${idx + 1}`
		let logoImage = key.customFields.logo.url
		let imageSlider = <AgilityImage image={key.customFields.logo} width={200} />
		const logoTitle = key.customFields.logo.label
		const link = key?.customFields?.uRL?.href ?? ''
		const target = key?.customFields?.uRL?.target

		if (logoImage.indexOf(".svg") === -1) {
			logoImage = `${logoImage}?w=200`
		} else {
			imageSlider = <Lazyload offset={Helpers.lazyOffset}><img src={logoImage} alt={logoTitle} loading="lazy"></img></Lazyload>
		}

		return (
			<div className={className} key={idx}>
				<div className='d-block'>
					{(isIntegration || page?.name === 'implementation') && link.length > 0 && <Link to={link} target={target}>
						{imageSlider}
					</Link>}
					{((!isIntegration && page?.name !== 'implementation') || link.length === 0) && imageSlider}
				</div>
			</div>
		)
	})



	// const initLogo = () => {
	// 	console.log('init logo');
	// 	let inter
	// 	const section = document.getElementsByClassName('LogoListingModule')[0]
	// 	inter = setInterval(() => {
	// 		if(section.classList.contains('set-animation') && section.querySelectorAll('.slick-list').length) {
	// 			clearInterval(inter)
	// 			section.querySelectorAll('.slick-list')[0].style.height = 'auto'

	// 		}
	// 	}, 5);
	// }
	const detectIntegration = () => {
		const detectIntegration = window.location.pathname.includes('/integrations') // || window.location.pathname.includes('/partners')
		setIsIntegration(detectIntegration)
	}
	useEffect(() => {
		detectIntegration()
	});
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		arrows: false,
		rows: 1,
		slidesToShow: 6,
		slidesToScroll: 6,
		adaptiveHeight: false,
		respondTo: 'slider',
		responsive: [{
			breakpoint: 1199,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5,
			}
		}, {
			breakpoint: 991,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			}
		}, {
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}]
	};

	const checkHasDots = () => {
		if (thisModuleRef.current.querySelector('.slick-dots')) {
			setSpaceBottom(false)
		} else {
			setSpaceBottom(true)
		}
	}

	useEffect(() => {
		checkHasDots()

		window.addEventListener('resize', checkHasDots)

		return () => {
			window.removeEventListener('resize', checkHasDots)
		}
	}, [])

	/* animation module */
	const thisModuleRef = useRef(null)
	useEffect(() => {
		const scrollEventFunc = () => {
			animationElementInnerComponent(thisModuleRef.current)
		}
		animationElementInnerComponent(thisModuleRef.current)
		window.addEventListener('scroll', scrollEventFunc)

		return () => {
			window.removeEventListener('scroll', scrollEventFunc)
		}
	}, [])

	return (
		<React.Fragment>
			<section className={classSection} ref={thisModuleRef}>
				<div className="container">
					<div className="LogoListingModule-heading anima-bottom text-center last-mb-none">
						{heading &&
							<h5>{heading}</h5>
						}
					</div>
					{logos.length > 0 &&
						<div className={`slider-lazy list-logos-slide anima-bottom ${!heading ? 'has-no-heading' : ''}`}
							style={{ marginBottom: spaceBottom ? '0' : '' }}
						>
							<Slider {...settings}>
								{listLogos}
							</Slider>
						</div>
					}
				</div>
			</section>
			<Spacing item={item} />
		</React.Fragment>
	);
}

export default LogoListingModule;
