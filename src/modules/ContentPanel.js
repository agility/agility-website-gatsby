import React from 'react';
import { renderHTML } from '../agility/utils'
import './ContentPanel.scss'
import ResponsiveImage from '../components/responsive-image.jsx'
import Triangles from "../components/triangles.jsx"

const ContentPanel = ({ item }) => {

	if (! item.customFields.panel
		|| ! item.customFields.panel) return null;

	//adjust the item...
	item = item.customFields.panel.customFields;

	if (! item) return null;

	const enableBackgroundImage = item.enableBackgroundImage;

	const renderImage = (imagePosition, imageTransparency, imageSkewed, imageShadow, image) => {

		let transparencyClass = "";
		let skewedClass = "";
		let shadowClass = ""

		if (imageTransparency === "true") {
			transparencyClass = 'transparent-image';
		}

		if (imageShadow === "true") {
			shadowClass = "shadow-image";
		}

		if (imageSkewed === "true") {
			skewedClass = 'skewed-image';
		}

		return (
			<div className={'start-image ' + imagePosition + ' ' + transparencyClass + ' ' + skewedClass + ' ' + shadowClass}>
				<ResponsiveImage img={image}
								breaks={[{ w: 320, max: 380 },{ w: 400, max: 640 }, { w: 640, max: 750 }, { w: 640, min: 751 }]} />

			</div>
		)
	}
	return (
		<React.Fragment>
			<section className="front-start p-w">
				<Triangles />
				<div className={enableBackgroundImage === "true" ? 'rotated-bg' : ''}></div>

				<div className="container-my">
					{item.imagePosition === 'left' && item.image &&
						renderImage(item.imagePosition, item.imageisTransparent, item.imageisSkewed, item.imageHasShadow, item.image)
					}

					<div className="start-content">

						<h1 dangerouslySetInnerHTML={renderHTML(item.title)}></h1>
						<div dangerouslySetInnerHTML={renderHTML(item.textblob)} />
						<div className="start-buttons">
							{item.primaryButton &&
								<a href={item.primaryButton.href} target={item.primaryButton.target} className="btn">{item.primaryButton.text}</a>
							}
							{item.secondaryButton &&
								<a href={item.secondaryButton.href} target={item.secondaryButton.target} className="btn-link">{item.secondaryButton.text} <span><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt={item.secondaryButton.text} /></span></a>
							}
						</div>
					</div>

					{item.imagePosition === 'right' && item.image &&
						renderImage(item.imagePosition, item.imageisTransparent, item.imageisSkewed, item.imageHasShadow, item.image)
					}
				</div>
			</section>

		</React.Fragment>
	);

}

export default ContentPanel;
