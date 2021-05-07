import { Link } from 'gatsby';
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Lazyload from 'react-lazyload'
import './LogoListingModule.scss'
import '../global/core/lib/_slick-theme.scss'
import ArrayUtils from '../utils/array-utils.js';
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'
import { animationElementInnerComponent } from '../global/javascript/animation'

const LogoListingModule = ({ item }) => {
	const heading = item.customFields.title
	const logos = item.customFields.logos
	const classSection = `module LogoListingModule animation  ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`
	const listLogos = ArrayUtils.shuffleArray(logos).map((key, idx) => {
		const className = `logo-item logo-v${idx + 1}`
		const logoImage = key.customFields.logo.url
		const logoTitle = key.customFields.logo.label
		// const link = key.customFields.uRL.href
		// const taget = key.customFields.uRL.target
		return (
			<div className={className} key={idx}>
				<div className='d-block'>
						<Lazyload offset={ Helpers.lazyOffset }><img src={logoImage} alt={logoTitle}></img></Lazyload>
				</div>
			</div>
		)
	})

	const initLogo = () => {
		let inter
		const section = document.getElementsByClassName('LogoListingModule')[0]
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
				slidesToScroll: 2
      }
    }]
  };

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
			<section className={classSection} ref={ thisModuleRef }>
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
