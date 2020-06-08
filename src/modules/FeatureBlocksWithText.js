import React from 'react';
import { renderHTML } from '../agility/utils'
import "./FeatureBlocksWithText.scss"

const FeatureBlocksWithText = ({ item }) => {

	const moduleItem = item;
	item = item.customFields;

	var features = item.featureBlocks.map(function (f) {
		return <ProductsFeaturesContent data={f.customFields} key={f.contentID + "-" + moduleItem.contentID} />;
	})

	return (

		<section className="features feature-block-w-text">

			<h2 className="title-component">{item.title}</h2>
			<div className="container-my">
				<div className="products-features">

					<div className="features-left">
						<h3>{item.sideTitle}</h3>
						<div className="text" dangerouslySetInnerHTML={renderHTML(item.sideBody)} />
						<a className="btn" href={item.sideLink.href} target={item.sideLink.target}>{item.sideLink.text}</a>
					</div>
					<div className="features-right">
					<div className="features-list">
						{features}
					</div>
					</div>
				</div>

			</div>

		</section>

	);
}

export default FeatureBlocksWithText;


const ProductsFeaturesContent = ({ data }) => {


	return (

			<div className="feature-item">
				<div className="item-inner">
					<div className="image">
						<img src={data.icon.url} alt={data.icon.label} />
					</div>
					<div className="title">
						<h4>{data.title}</h4>
					</div>
					<div dangerouslySetInnerHTML={{ __html: data.textblob }} />
					{data.bottomLink &&
						<a className="arrow-button" href={data.bottomLink.href} target={data.bottomLink.target}><span>{data.bottomLink.text}</span><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt={data.bottomLink.text} /></a>
					}

				</div>
			</div>

	);

}