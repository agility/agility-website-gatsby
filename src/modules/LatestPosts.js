import React from 'react';
import ResponsiveImage from '../components/responsive-image.jsx'

import './LatestPosts.scss'


const LatestPosts = ({ item }) => {

	console.log("latest posts", item)

	return <div>Latest Posts</div>

	var self = this;
		var four = this.props.items.map(function (item) {
			return <LatestBlogPostsContent item={item} key={item.key} readMoreText={self.props.readMoreLabel} />
		});

		return (

			<section className="features p-w latest-blog-posts">

				<h2 className="title-component">{this.props.title}</h2>
				<div className="blog-wrapper">
					<div className="container-my">
						<div className="row-my">
							{four}
						</div>
					</div>
				</div>

				<a className="btn" href={this.props.primaryButton.href} target={this.props.primaryButton.target}>{this.props.primaryButton.text}</a>
			</section>


		);
}

export default LatestPosts;


class LatestBlogPostsContent extends React.Component {

	render() {

		return (
			<div className="col-md-4">
				<div className="blog-item">
					{this.props.item.image != null &&
						<div className="image"><a href={this.props.item.url} >
							<ResponsiveImage img={this.props.item.image}
								breaks={[{ w: 640, h: 369, max: 640 }, { w: 768, h: 433, min: 800 }, { w: 480, h: 277, min: 1190 }]} /></a>
						</div>
					}
					<div className="content">
						<a href={this.props.item.url} ><h3>{this.props.item.title}</h3></a>
						<p>{this.props.item.excerpt}</p>
						<a href={this.props.item.url} className="btn"><span>{this.props.readMoreText}</span></a>
					</div>
				</div>
			</div>
		);
	}
}