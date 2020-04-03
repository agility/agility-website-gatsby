import React from 'react';
import { Link } from "gatsby"

export default ({ post }) => {

	let tags = post.tags;
	if (! tags) tags = post.blogTags;

	if (tags && tags.length > 0 && tags.map) {
		tags = tags.map(tag => {

			let tagUrl = "/resources/posts/tag/" + encodeURIComponent(tag.customFields.title.toLowerCase().replace(/ /g, "-"));

			return (
				<Link to={tagUrl} key={post.contentID + "-" + tag.contentID}>{tag.customFields.title}</Link>
			)
		});

		return <div className="tags">{tags}</div>
	} else {
		return <i></i>;
	}


}