import React from 'react';
import { Link } from 'gatsby'
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import './MostViewedArticles.scss'

export default  ({ item}) => {
	item = item.customFields;
	const posts = item.posts.map(post => {
		const postUrl = '/resources/posts/' + post.customFields.uRL;
		return (
			<Link to={ postUrl } className="post" key={module.contentID + "-" + post.contentID}>
				<div className="post-image">				
					<AgilityImage image={post.customFields.postImage} layout="constrained" width={104} height={104} />
					{/* <img src={post.customFields.postImage.url + '?h=104&w=108'}  alt={post.customFields.postImage.label}/> */}
				</div>
				<div className="post-text">
					<h5>{post.customFields.title}</h5>
					<span className="read-more">{item.readMoreText}</span>
				</div>
			</Link>
		)
	});
	return (
		<div className="most-viewed-articles">
			<h4>{item.title}</h4>
			<div className="posts-wrapper">
				{posts}
			</div>
		</div>
	)
}