import React from 'react';

import './ContentPanel.scss'


const ContentPanel = ({ item }) => {


	//adjust the item...
	item = item.customFields.panel.customFields;

	const renderImage = (imagePosition, imageTransparency, imageSkewed, image) => {
		let transparencyClass = "";
		let skewedClass = "";

		if (imageTransparency) {
			transparencyClass = 'transparent-image';
		}

		if (imageSkewed) {
			skewedClass = 'skewed-image';
		}

		return (
			<div className={'start-image ' + imagePosition + ' ' + transparencyClass + ' ' + skewedClass}>
				<img src={image.url} alt={image.label} />
			</div>
		)
	}
	return (
		<section className="front-start p-w">
			<div className="canvas" id="canvas-1"></div>
			<div className={item.enableBackgroundImage ? 'rotated-bg' : ''}></div>

			<div className="container-my">
				{item.imagePosition === 'left' && item.image &&
					renderImage(item.imagePosition, item.imageisTransparent, item.imageisSkewed, item.image)
				}

				<div className="start-content">
					<h1 dangerouslySetInnerHTML={{ __html: item.title }}></h1>
					<div dangerouslySetInnerHTML={{ __html: item.textBlob }} />
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
					renderImage(item.imagePosition, item.imageisTransparent, item.imageisSkewed, item.image)
				}
			</div>


		</section>
	);

}

export default ContentPanel;
