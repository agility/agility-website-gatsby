import React from 'react';
import LazyLoad from 'react-lazyload';
// import { renderHTML } from '../agility/utils';
import LazyBackground from '../utils/LazyBackground'
// import { renderHTML } from '../agility/utils'
import './SingleTestimonialPanel.scss'
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'

const SingleTestimonialPanel = ({ item }) => {
	const fields = item.customFields
	const btnCta = fields.cTAButton
	const classSection = `SingleTestimonialPanel ${fields.darkMode && fields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`
	if (fields.testimonials.length > 0) {
		const randomItem = Math.floor(Math.random() * fields.testimonials.length)
		const singeTestimonial = fields.testimonials[randomItem].customFields
		// console.log('singeTestimonial: ', Math.floor(Math.random() * 10000), fields.testimonials)
		// console.log('Item ramdom', randomItem)
		return (
			<React.Fragment>
			<div className={classSection} data-item={randomItem}>
				<section className="module mod-testimonial animation">
					<div className="container">
						<div className="mess-tesi anima-bottom">
							{ singeTestimonial.excerpt &&
								<div className="quote-content last-mb-none">{singeTestimonial.excerpt}</div>
							}
							<div className="sub-content ps-rv last-mb-none">
								{ singeTestimonial.companyLogo.url &&
									<LazyLoad offset={ Helpers.lazyOffset }><img className="lazy d-none d-md-block logo-desktop" src={singeTestimonial.companyLogo.url} alt={singeTestimonial.companyName} /></LazyLoad>
								}
								{ singeTestimonial.title &&
									<h6>{singeTestimonial.title}</h6>
								}
								{ singeTestimonial.jobTitle &&
									<p className="position">{singeTestimonial.jobTitle}</p>
								}
							</div>
						</div>
						<div className="avatar-testi d-flex align-items-center justify-content-between anima-bottom delay-2">
							{ singeTestimonial.headshot.url &&
								<LazyBackground className="avarta-img bg bg-center" src={singeTestimonial.headshot.url} alt={singeTestimonial.title}></LazyBackground>
							}
							{ singeTestimonial.companyLogo.url &&
								<LazyLoad offset={ Helpers.lazyOffset }><img className="lazy d-md-none" src={singeTestimonial.companyLogo.url} alt={singeTestimonial.companyName} /></LazyLoad>
							}
						</div>
						{ btnCta && btnCta.href &&
							<div className="ps-rv anima-bottom delay-4">
								<div className="cta-testimonial last-mb-none text-center">
									<a href={btnCta.href} target={btnCta.target} className="btn btn-yellow text-decoration-none">{btnCta.text}</a>
								</div>
							</div>
						}
					</div>
				</section>
			</div>
			<Spacing item={item}/>
			</React.Fragment>
		);
	}
	return null
}

export default SingleTestimonialPanel;
