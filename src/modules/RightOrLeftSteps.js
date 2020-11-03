import React from 'react';
import Lazyload from 'react-lazyload'
import './RightOrLeftSteps.scss'
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'

const RightOrLeftSteps = ({ item }) => {
	const fields = item.customFields
	const heading = fields.heading
	const title = fields.title
	const subTitle = fields.subTitle
	const description = fields.description
	const step = fields.step
	const textSide = fields.textSide
	const imgURL = fields.image && fields.image.url.length > 0 ? fields.image.url : null
	const classSection = `module mod-framework RightOrLeftSteps animation ${fields.darkMode && fields.darkMode === 'true' ? ' dark-mode style-back text-white bg-17': ''}`
	const classTextSlide = `item-step row ps-rv align-items-center justify-content-space-betwwen anima-bottom delay-2 ${textSide === 'right' ? 'style-right' : ''}`
	return (
		<React.Fragment>
			<section className={classSection}>
				<div className="container">
					{ (title || subTitle) &&
						<div className="title-framework last-mb-none text-center anima-bottom ">
							{ title &&
								<h2>{title}</h2>
							}
							{ subTitle &&
								<p>{subTitle}</p>
							}
						</div>
					}
					<div className={classTextSlide}>
						<div className="col-md-6 content-step ps-rv last-mb-none small-paragraph">
							{ step &&
								<span className="step">{step}</span>
							}
							{ heading &&
								<h3>{heading}</h3>
							}
							{ description &&
								<p>{description}</p>
							}
						</div>
						<div className="step-img ps-rv col-md-6">

							{ imgURL &&
								<React.Fragment>
									<Lazyload offset={ Helpers.lazyOffset }><img src={imgURL} className="ps-rv img-step" alt="Create your content structure"></img></Lazyload>
								</React.Fragment>
							}
						</div>
					</div>
				</div>
			</section>
			<Spacing item={item}/>
		</React.Fragment>
	);
}

export default RightOrLeftSteps;
