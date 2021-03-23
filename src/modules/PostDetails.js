import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"
import {DateTime} from 'luxon'
import ResponsiveImage from '../components/responsive-image.jsx'
import { renderHTML } from '../agility/utils'
import PostTags from "../components/PostTags.jsx"
import CallToAction from "../components/call-to-action.jsx"

import "./RichTextArea.scss"
import "./PostDetails.scss"


const PostDetails = ({ item, dynamicPageItem, page }) => {

	item = item.customFields;
	const post = dynamicPageItem.customFields;
	const author = post.author.customFields;

	//see if the post has a tweet in it...
	const hasTweets = post.textblob && post.textblob.indexOf('class="twitter-tweet"') !== -1;

	const [state, setState] = useState({
		loaded: false
	})

	useEffect(() => {

		//load the g2 script...
		if (typeof window === 'undefined') return;

		if (state.loaded) return;

		setTimeout(function () {

			if (hasTweets) {
				//add the twitter embed...
				let script = document.createElement("script")
				script.src = "https://platform.twitter.com/widgets.js"
				script.async = true
				document.body.appendChild(script)
			}

			setState({
				loaded: true,
			})
		}, 1500);


	});


	return (
		<section className="blog-post-details">
			<div className="">
				<div className="container p-w-small rich-text">
					<h1 className="h1">{post.title}</h1>
					{post.subTitle &&
						<h4 className="h4">{post.subTitle}</h4>
					}
					<PostTags post={post} />

					<div className="meta">
						<div className="author">
							<div className="author-image">
								<img src={author.image ? author.image.url + '?w=100' : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg?w=100"} alt={ author.title ? author.title : 'image author' } />
							</div>
							<h5 className="h5">{author.title}</h5>
						</div>
						<span className="date">{DateTime.fromISO(post.date).toFormat("MMM d, yyyy")}</span>
					</div>



					{post.postImage &&
						<div className="image">
							<ResponsiveImage img={post.postImage} layout="fullWidth" />
						</div>
					}

					<div className="post-content" dangerouslySetInnerHTML={renderHTML(post.textblob)}></div>

					{post.cTA && <CallToAction item={post.cTA} />}


					{
						item.backButton && item.backButton.text && item.backButton.href &&
						<Link to={item.backButton.href} className="back d-flex ai-center"><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt="" /><span>{item.backButton.text}</span></Link>
					}
				</div>



			</div>
		</section>

	);
}

export default PostDetails;
