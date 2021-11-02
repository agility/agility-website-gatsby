import React ,{useEffect, useRef} from 'react';
// import { graphql, StaticQuery } from 'gatsby'
import LazyLoad from 'react-lazyload'
import './GuideLinks.scss'
// import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'
import { animationElementInnerComponent } from '../global/javascript/animation'

const GuideLinks = ({viewModel}) => {
	const fields = viewModel.dynamicPageItem.customFields;
	const classSection = `module mod-user-guides integration-detail has-btn-white text-white GuideLinks animation ${fields.darkMode && fields.darkMode === 'true' ? ' dark-mode': ''}`
	const heading = fields.titleStepImplementation || fields.setupHeading
	const description = fields.descriptionStepImplementation
	const btnCta = fields.cTA
	const imgURL = fields.stepIcon && fields.stepIcon.url.length > 0 ? fields.stepIcon.url : '/images/icon-userguide.svg'
	const thisModuleRef = useRef(null)

	const listGuide = viewModel.steps.map((guide, idx) => {
		const customeFieldsGuide = guide.customFields
		const descriptionGuide = customeFieldsGuide.excerpt || customeFieldsGuide.description
		const titleGuide = customeFieldsGuide.title || customeFieldsGuide.heading
		return (
			<div className="item-guides ps-rv small-paragraph last-mb-none d-flex" key={idx}>
				<div className="number">{idx + 1}.</div>
				<div className="content">
					{ titleGuide &&
						<h4>{titleGuide}</h4>
					}
					{ descriptionGuide && <p>{descriptionGuide}</p> }
				</div>
			</div>
		)
	})

	const init = (() => {
		const nextElm = thisModuleRef.current.nextElementSibling?.nextElementSibling
		if (nextElm && typeof nextElm === 'object' && nextElm.classList.contains('module-chanel')) {
			thisModuleRef.current.classList.add('has-chanel')
		}
	})
	useEffect(() => {
		init()
  });

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
				<LazyLoad offset={ Helpers.lazyOffset }><img src="/images/user-guides.svg" alt='Ready to dive in?' className='bg-guides'></img></LazyLoad>
				<span className="icomoon icon-gears"></span>
				<div className="container row align-items-center mx-auto">
					<div className="col-lg-5 last-mb-none col-content-guide anima-left">
						{ imgURL &&
							<LazyLoad offset={ Helpers.lazyOffset }><img src={imgURL} alt={heading}></img></LazyLoad>
						}
						{ heading &&
							<h2>{heading}</h2>
						}
						{ description &&
							<p>{description}</p>
						}
						{ btnCta && btnCta.href &&
							<p><a href={btnCta.href} target={btnCta.target} className="btn btn-outline-white text-decoration-none ">{ btnCta.text }</a></p>
						}
					</div>
					{ listGuide.length > 0 &&
						<div className="col-lg-7 anima-right">
							<div className="list-guides">
								{listGuide}
							</div>
						</div>
					}
				</div>
			</section>
		</React.Fragment>
	);
}

export default GuideLinks