import React from 'react';
// import LazyLoad from 'react-lazyload';

import ResponsiveImage from '../components/responsive-image.jsx'

import './FeaturedCaseStudies.scss'



const FeaturedCaseStudies = ({ item }) => {


	let moduleItem = item.customFields;

	//render the case studies
	let caseStudies = moduleItem.caseStudies.map(function (cs) {
		return <FeaturedCaseStudy key={cs.contentID + "-" + item.contentID} item={cs} />
	});

	return (

		<section className="features p-w featured-case-studies">

			<h2 className="title-component">{moduleItem.title}</h2>
			<div className="case-wrapper">
				<div className="case-studies">
					{caseStudies}
				</div>
			</div>
			{
				moduleItem.primaryButton &&
				<a className="btn" href={moduleItem.primaryButton.href} target={moduleItem.primaryButton.target}>{moduleItem.primaryButton.text}</a>
			}

		</section>

	);
}

export default FeaturedCaseStudies;


class FeaturedCaseStudy extends React.Component {
	render() {


		let caseStudyItem = this.props.item;
		let caseStudy = caseStudyItem.customFields;

		return (
			<div className="case-item">
				<div className="case-item-inner">
					<a href={"/resources/case-studies/" + caseStudy.uRL}>
						<div className="image">

							<ResponsiveImage img={caseStudy.image}
								breaks={[{ w: 640, max: 640 }, { w: 768, min: 800 }, { w: 480, min: 1190 }]} />
						</div>
						<div className="customer-logo">
							<img src={caseStudy.customerLogo.url} alt={caseStudy.customerLogo.label} />
						</div>
						<div className="content">
							<p>{caseStudy.excerpt}</p>
						</div>
					</a>
				</div>
			</div>
		);
	}
}
