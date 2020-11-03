import React from 'react';
import { Link } from "gatsby"
import StringUtils from "../utils/string-utils"
import ResponsiveImage from '../components/responsive-image.jsx'
import "./FeaturedResources.scss"
const FeaturedResources = ({ item }) => {
	const moduleItem = item;
	item = item.customFields;
	const featuredRes = item.resources.map(function (ft) {
		return <FeaturedResContent key={ft.contentID + "-" + moduleItem.contentID} item={ft} readMoreLabel={item.readMoreLabel} />
	});
	return (
		<section className="features p-w featured-resources get-shadow">
			<h2 className="title-component">{item.title}</h2>
			<p className="intro">{item.subTitle}</p>
			<div className="container-my">
				<div className="featured-wrapper">
					{featuredRes}
				</div>
			</div>
		</section>
	);
}

export default FeaturedResources;
const FeaturedResContent = ({ item, readMoreLabel }) => {
	item = item.customFields;
	let excerpt = item.excerpt;
	if (excerpt) {
		excerpt = StringUtils.stripHtml(excerpt, 100);
	}

	const resType = item.resourceTypeName.toLowerCase().replace(/ /g, '-');
	item.url = `/resources/${resType}/${item.uRL}`;
	return (
		<div className="featured-item">
			<Link to={item.url}>
				<div className="image">
					<ResponsiveImage img={item.image}
						breaks={[{ w: 768, h: 433, max: 800 }, { w: 768, h: 433, min: 800 }, { w: 480, h: 277, min: 1190 }]} />
				</div>
			</Link>
			<div className="content">
				<h3><Link to={item.url}>{item.title}</Link></h3>
				<p>{excerpt}</p>
			</div>
			<div className="read-more">
				<Link to={item.url} className="btn" ><span>{readMoreLabel}</span></Link>
			</div>
		</div>
	);
}