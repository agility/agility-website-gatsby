import { Link } from 'gatsby';
import React, { useState,useEffect } from 'react';
import Slider from 'react-slick';
import Lazyload from 'react-lazyload'
// import LazyBackground from '../utils/LazyBackground'
import './LogoListingModule.scss'
import '../global/core/lib/_slick-theme.scss'
// import StringUtils from '../utils/string-utils'
import ArrayUtils from '../utils/array-utils.js';
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'

const LogoListingModule = ({ item }) => {
	const heading = item.customFields.title
	const logos = item.customFields.logos
	const classSection = `module LogoListingModule animation  ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`

	// console.log("LogoListingModule", item)

	const listLogos = ArrayUtils.shuffleArray(logos).map((key, idx) => {
		console.log(key.customFields.logo);
		const className = `logo-item logo-v${idx + 1}`
		const logoImage = key.customFields.logo.url
		const logoTitle = key.customFields.logo.label
		const link = key.customFields.uRL.href
		const taget = key.customFields.uRL.target
		return (
			<div className={className} key={idx}>
				<Link target={taget} to={link} className='d-block'>
						<Lazyload offset={ Helpers.lazyOffset }><img src={logoImage} alt={logoTitle}></img></Lazyload>
				</Link>
			</div>
		)
	})

	const initLogo = () => {
		let inter
		let section = document.getElementsByClassName('LogoListingModule')[0]
		inter = setInterval(() => {
			if(section.classList.contains('set-animation') && section.querySelectorAll('.slick-list').length) {
				clearInterval(inter)
				section.querySelectorAll('.slick-list')[0].style.height = 'auto'

			}
		}, 5);
	}

	useEffect(() => {
		initLogo()
  });

	const settings = {
		dots: true,
		infinite: true,
    speed: 500,
    arrows: false,
		rows: 1,
		slidesToShow: 6,
    slidesToScroll: 6,
		// adaptiveHeight: true,
		adaptiveHeight: true,
    respondTo: 'slider',
    responsive: [{
      breakpoint: 1199,
        settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
        }
    },{
      breakpoint: 991,
        settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
        }
    },{
      breakpoint: 767,
      settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
      }
    }]
  };

	return (
		<React.Fragment>
			<section className={classSection}>
				<div className="container">
					<div className="LogoListingModule-heading anima-bottom text-center last-mb-none">
						{ heading &&
							<h5>{heading}</h5>
						}
					</div>
					{ logos.length > 0 &&
					<div className="slider-lazy list-logos-slide anima-bottom">
							<Slider {...settings}>
								{listLogos}
							</Slider>
					</div>
					}
				</div>
			</section>
			<Spacing item={item}/>
		</React.Fragment>
	);
}

export default LogoListingModule;
