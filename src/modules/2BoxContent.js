import React from 'react';
import Spacing from './Spacing'
import './2BoxContent.scss'

const BoxContent = ({ item }) => {

	console.log('2BoxContent', item)
	const fields = item.customFields
	const classSection = `mod module-chanel 2BoxContent ${fields.darkMode && fields.darkMode === 'true' ? 'dark-mode': ''}`
	const btnCta = fields.cTA
	const btnCta2 = fields.cTA2
	const description = fields.description
	const description2 = fields.description2
	const heading = fields.heading
	const heading2 = fields.heading2
	const image = fields.image
	const image2 = fields.image2
	console.log('typeof', typeof fields.mobileSpace)
	return (
		<React.Fragment>
		<section className={classSection}>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-6 item-chanel">
						<div className="wrap-chanel text-center last-mb-none ps-rv">
							{ btnCta &&
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
							{ btnCta &&
								<p><a href={btnCta.href} target={btnCta.target} className="link-line line-purple">{btnCta.text}</a></p>
							}
						</div>
					</div>
					<div className="col-lg-6 item-chanel">
						<div className="wrap-chanel text-center last-mb-none ps-rv">
							{ btnCta &&
								<a href={btnCta.href} target={btnCta.target} className="ps-as"><span className='sr-only'>{btnCta.text}</span></a>
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
							{ btnCta2 &&
								<p><a href={btnCta2.href} target={btnCta2.target} className="link-line line-purple">{btnCta2.text}</a></p>
							}
						</div>
					</div>
				</div>
			</div>
		</section>
		<Spacing item={item}/>
		</React.Fragment>
	);
}

export default BoxContent;
