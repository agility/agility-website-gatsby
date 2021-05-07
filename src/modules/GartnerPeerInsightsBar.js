import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import './GartnerPeerInsightsBar.scss'
import LazyLoad from 'react-lazyload'
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'
import { animationElementInnerComponent } from '../global/javascript/animation'

const GartnerPeerInsightsBar = ({ item }) => {
	const classSection = `GartnerPeerInsightsBar bg-46 text-white animation anima-bottom ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`

	const linkButton = item.customFields.cTAButton.href
	const textButton = item.customFields.cTAButton.text
	const targetButton = item.customFields.cTAButton.target
	const title = item.customFields.title
	const graphic = item.customFields.gartnerLogo.url
	const stars = item.customFields.starsGraphic.url
	const thisModuleRef = useRef(null)

	/* animation module */
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
				<LazyLoad offset={ Helpers.lazyOffset }>
					<img src="/images/bg-top.svg" className="bg-left-star" alt="image"></img>
				</LazyLoad>
				<LazyLoad offset={ Helpers.lazyOffset }>
					<img src="/images/bg-top.svg" className="bg-right-star" alt="image"></img>
				</LazyLoad>
				<div className="container">
					<div className="d-flex text-center justify-content-between flex-wrap ">
						<div className="col-left d-flex justify-content-center align-items-center flex-wrap ">
							{ graphic &&
								<div className="wrap-before-star">
									<LazyLoad offset={ Helpers.lazyOffset }>
									<img src={graphic} alt={title} className="intro-stars"></img>
									</LazyLoad>
								</div>
								}
							<div className="wrap-star align-items-center last-mb-none ">
								{ stars &&
									<div className="wrap-inn-star d-flex align-items-center">
										<LazyLoad offset={ Helpers.lazyOffset }>
										<img src={stars} alt={title} className="img-stars"></img>
										</LazyLoad>
									</div>
								}
								{title &&
								<h4>{title}</h4>
								}
							</div>
						</div>
						<div className="col-right last-mb-none">
							{ textButton && linkButton &&
							<a href={linkButton} target={targetButton} className="btn btn-primary text-decoration-none">{textButton}</a>
							}
						</div>
					</div>
				</div>
			</section>
			<Spacing item={item}/>
		</React.Fragment>
	);
}

export default GartnerPeerInsightsBar;
