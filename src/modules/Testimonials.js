import React from 'react';

import { renderHTML } from '../agility/utils'

import "./Testimonials.scss"

const Testimonials = ({ item }) => {

	let moduleItem = item;
	item = item.customFields;

	const testimonials = item.testimonials.map(function (item) {
		return <TestimonialContent item={item.customFields} key={item.contentID + "-" + moduleItem.contentID} />
	})


	return (

		<section className="testimonials">
			<div class="container-my">
				<h2 className="title-component" dangerouslySetInnerHTML={renderHTML(item.header)}></h2>
				<p className="intro" dangerouslySetInnerHTML={renderHTML(item.subHeading)}></p>
				<div className="testimonials-list">


					{testimonials}
				</div>

				<div className="button-wrap">
					{item.bottomlink && item.bottomlink !== undefined && <a className="btn" href={item.bottomlink.href} target={item.bottomlink.target}>{item.bottomlink.text}</a>}
				</div>


			</div>
		</section>


	);
}

export default Testimonials;

class TestimonialContent extends React.Component {

	render() {

		return (

			<div className="testimonial">
				<div className="item-inner">
					<div className="top-row">
						<div className="image">
							{this.props.item.headshot &&
								<img src={this.props.item.headshot.url + '?w=93&h=93'} alt={this.props.item.title} />
							}
						</div>

						{/* <div className="company-logo">
							{this.props.item.companyLogo &&
								<img src={this.props.item.companyLogo.url} alt={this.props.item.companyName} />
							}
						</div> */}

						<div className="title">
							<h3>{this.props.item.title}</h3>
							<div>{this.props.item.jobTitle}</div>
						</div>
					</div>
					<p>{this.props.item.excerpt}</p>
				</div>
			</div>
		);
	}
}