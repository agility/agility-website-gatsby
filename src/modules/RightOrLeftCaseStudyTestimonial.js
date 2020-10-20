import React from 'react';
import Spacing from './Spacing'
import './RightOrLeftCaseStudyTestimonial.scss'

const RightOrLeftCaseStudyTestimonial = ({ item }) => {

	// console.log('RightOrLeftCaseStudyTestimonial', item)
	const fields = item.customFields
	const classSection = `module mod-testimonial-detail RightOrLeftCaseStudyTestimonial animation ${fields.darkMode && fields.darkMode === 'true' ? ' dark-mode': ''}`
	const btnCta = fields.cTA
	const logo = fields.logo
	const imgTest = fields.image
	const heading = fields.heading
	const description = fields.description
	const testimonial = fields.testimonial
	const Testimonial = () => {
		const fieldsTest = testimonial.customFields
		const titleTest = fieldsTest.title
		const jobTitle = fieldsTest.jobTitle
		const excerpt = fieldsTest.excerpt
		return (
			<div className="box-tes-detail last-mb-none">
				{ excerpt &&
					<p>{excerpt}</p>
				}
				{ titleTest &&
					<h6>{titleTest}</h6>
				}
				{ jobTitle &&
					<p className="position">{jobTitle}</p>
				}
			</div>
		)
	}
	return (
		<React.Fragment>
			<section className={classSection}>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 right-test-detail order-lg-2 anima-right">
							<div className="box-right-deail last-mb-none">
								{ logo &&
									<img src={logo.url} alt={logo.label}></img>
								}
								{ heading &&
									<h2>{heading}</h2>
								}
								{ description &&
									<p>{description}</p>
								}
								{ btnCta &&
									<p>
										<a href={btnCta.href} target={btnCta.target} className="btn btn-yellow text-decoration-none">{btnCta.text}</a>
									</p>
								}
							</div>
						</div>
						<div className="col-lg-6 left-tes-detail anima-left">
							{ imgTest &&
								<div className="bg bg-test-detail bg-center" style={{ backgroundImage: `url(${imgTest.url})` }}></div>
							}
							{ testimonial &&
								<Testimonial></Testimonial>
							}
						</div>
					</div>
				</div>
			</section>
			<Spacing item={item}/>
		</React.Fragment>

	);
}

export default RightOrLeftCaseStudyTestimonial;
