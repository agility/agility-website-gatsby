import React, { useEffect, useRef } from 'react';
import Spacing from './Spacing'
import './RightOrLeftCaseStudyTestimonial.scss'
import { renderHTML } from '../agility/utils';
import LazyBackground from '../utils/LazyBackground'
import { animationElementInnerComponent } from '../global/javascript/animation'

const RightOrLeftCaseStudyTestimonial = ({ item }) => {
	const fields = item.customFields
	const classSection = `module mod-testimonial-detail RightOrLeftCaseStudyTestimonial animation ${fields.darkMode && fields.darkMode === 'true' ? ' dark-mode': ''}`
	const labelCta = fields.cTA
	const imgTest = fields.image
	const testimonial = fields.testimonial
	const caseStudy = fields.casestudy
	const Testimonial = () => {
		const fieldsTest = testimonial.customFields
		if (! fieldsTest) return null
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
	const CaseStudy = () => {
		const fieldCase = caseStudy.customFields
		const contentDes = fieldCase.contentPanelCopy
		const logoCase = fieldCase.customerLogo
		const titleCase = fieldCase.title
		const url = `/resources/case-studies/${fieldCase.uRL}`
		return (
			<div className="box-right-deail last-mb-none">
				{ logoCase &&
					<img src={logoCase.url} alt={logoCase.label}></img>
				}
				{ titleCase &&
					<h2>{titleCase}</h2>
				}
				{ contentDes &&
					<p dangerouslySetInnerHTML={renderHTML(contentDes)}></p>
				}
				{ fieldCase.uRL &&
					<p>
						<a href={url} target="_self" className="btn btn-yellow text-decoration-none">{labelCta}</a>
					</p>
				}
			</div>
		)
	}

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
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 right-test-detail order-lg-2 anima-right">
							{ caseStudy &&
								<CaseStudy/>
							}
						</div>
						<div className="col-lg-6 left-tes-detail anima-left">
							{ imgTest &&
								<LazyBackground className="bg bg-test-detail bg-center" src={imgTest.url}></LazyBackground>
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
