import React, { useEffect, useRef } from 'react';
import Spacing from './Spacing'
import './2BoxContent.scss'
import { animationElementInnerComponent } from '../global/javascript/animation'

const BoxContent = ({ item }) => {
	const fields = item.customFields
	const classSection = `mod module-chanel 2BoxContent animation ${fields.darkMode && fields.darkMode === 'true' ? 'dark-mode': ''}`
	const btnCta = fields.cTA
	const btnCta2 = fields.cTA2
	const description = fields.description
	const description2 = fields.description2
	const heading = fields.heading
	const heading2 = fields.heading2
	const image = fields.image
	const image2 = fields.image2
	const classitem  = ( btnCta || image || heading || description) && ( btnCta2 || image2 || heading2 || description2)  ? 'col-lg-6 item-chanel' : 'col-lg-8 item-chanel'

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

	useEffect(() => {
		const prevElem = thisModuleRef.current.previousElementSibling?.previousElementSibling
		if (prevElem && typeof prevElem === 'object' && prevElem.classList.contains('mod-user-guides')) {
			prevElem.classList.add('has-chanel')
		}
	})

	return (
		<React.Fragment>
		<section className={classSection} ref={ thisModuleRef }>
			<div className="container">
				<div className="row justify-content-center anima-bottom">
					{ (btnCta || image || heading || description) &&
					<div className={classitem}>
						<div className="wrap-chanel text-center last-mb-none ps-rv">
							{ btnCta && btnCta.href &&
								<a href={btnCta.href} target={btnCta.target} className="ps-as"><span className='sr-only'>{btnCta.text}</span></a>
							}
							{ image &&
								<img src={image.url} alt={image.label}></img>
							}
							{ heading &&
								<h2>{heading}</h2>
							}
							{ description &&
								<p>{description}</p>
							}
							{ btnCta && btnCta.href &&
								<p><a href={btnCta.href} target={btnCta.target} className="link-line line-purple">{btnCta.text}</a></p>
							}
						</div>
					</div>
					}
					{ (btnCta2 || image2 || heading2 || description2) &&
						<div className={classitem}>
							<div className="wrap-chanel text-center last-mb-none ps-rv">
								{ btnCta2 && btnCta2.href &&
									<a href={btnCta2.href} target={btnCta2.target} className="ps-as"><span className='sr-only'>{btnCta2.text}</span></a>
								}
								{ image2 &&
									<img src={image2.url} alt={image2.label}></img>
								}
								{ heading2 &&
									<h2>{heading2}</h2>
								}
								{ description2 &&
									<p>{description2}</p>
								}
								{ btnCta2 && btnCta2.href &&
									<p><a href={btnCta2.href} target={btnCta2.target} className="link-line line-purple">{btnCta2.text}</a></p>
								}
							</div>
						</div>
					}
				</div>
			</div>
		</section>
		<Spacing item={item}/>
		</React.Fragment>
	);
}

export default BoxContent;
