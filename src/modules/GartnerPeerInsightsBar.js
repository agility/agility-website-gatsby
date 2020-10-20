import React from 'react';
import { Link } from 'gatsby';
import './GartnerPeerInsightsBar.scss'
import LazyLoad from 'react-lazyload'
import Spacing from './Spacing'

const GartnerPeerInsightsBar = ({ item }) => {
	const classSection = `GartnerPeerInsightsBar bg-46 text-white animation anima-bottom ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`

	const linkButton = item.customFields.cTAButton.href
	const textButton = item.customFields.cTAButton.text
	const targetButton = item.customFields.cTAButton.target
	const title = item.customFields.title
	const graphic = item.customFields.gartnerLogo.url
	const stars = item.customFields.starsGraphic.url
	// console.log("GartnerPeerInsightsBar", item)


	return (
		<React.Fragment>
			<section className={classSection}>
				<LazyLoad>
					<img src="/images/bg-top.svg" className="bg-left-star" alt="image"></img>
				</LazyLoad>
				<LazyLoad>
					<img src="/images/bg-top.svg" className="bg-right-star" alt="image"></img>
				</LazyLoad>
				<div className="container">
					<div className="d-flex text-center justify-content-between flex-wrap ">
						<div className="col-left d-flex justify-content-center align-items-center flex-wrap ">
							{ graphic &&
								<LazyLoad>
								<img src={graphic} alt={title} className="intro-stars"></img>
								</LazyLoad>
								}
							<div className="wrap-star last-mb-none ">
								{ stars &&
									<LazyLoad>
									<img src={stars} alt={title} className="img-stars"></img>
									</LazyLoad>
								}
								{title &&
								<h4>{title}</h4>
								}
							</div>
						</div>
						<div className="col-right last-mb-none">
							{ textButton &&
							<Link to={linkButton} target={targetButton} className="btn btn-primary text-decoration-none">{textButton}</Link>
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
