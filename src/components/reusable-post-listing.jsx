import React from 'react';
import { Link } from "gatsby"

import ResponsiveImage from './responsive-image.jsx'
import InfiniteScroll from 'react-infinite-scroller';
import PostTags from "./PostTags.jsx"

class ReusablePostListing extends React.Component {
	constructor(props) {
		super(props)

		// if (typeof window === 'undefined') {
		// 	return;
		// }

		this.moduleItem = props.item;
		this.sitemapNodes = props.sitemapNodes;
		this.allPosts = props.posts;
		this.postCount = parseInt(this.moduleItem.customFields.postCount);
		if (isNaN(this.postCount)) this.postCount = 5;

		this.state = {
			posts: this.allPosts.slice(0, this.postCount),
			skip: 0,
			take: this.postCount,
			loadingMore: false,
			noMoreData: false
		};

	}

	loadMore(event) {
		if (!this.state.loadingMore) {

			this.setState({ loadingMore: true });
			setTimeout(this.loadMorePosts.bind(this), 100);
		}
		else {
			return;
		}
	}

	loadMorePosts() {

		let noMore = false;

		let skip = this.state.skip + this.state.take;
		let thesePosts = [];
		if (skip >= this.allPosts.length) {
			noMore = true;
		} else {
			thesePosts = this.allPosts.slice(skip, skip + this.state.take)
		}

		this.setState(prevState => ({
			posts: prevState.posts.concat(thesePosts),
			loadingMore: false,
			skip: skip,
			noMoreData: noMore
		}));

		//set the state in the browser in case we come back
		window.history.replaceState(this.state, null);

		return;
	}

	render() {


		var posts = this.state.posts.map(item => {

			return <PostListItem item={item} url={item.url} key={this.moduleItem.contentID + "-" + item.contentID} />
		});


		return (
			<div className="blog-listing">
				<InfiniteScroll
					pageStart={0}
					loadMore={this.loadMore.bind(this)}
					hasMore={!this.state.noMoreData}
					loader={<div className="loader" key={0}><img src="https://static.agilitycms.com/layout/img/ico/spinner-1s-113px.gif" width="50px" height="50px" alt="Loading" /> Loading ...</div>}
				>
					<div className="posts">
						{posts}
					</div>

				</InfiniteScroll>
			</div>
		);
	}
}

export default ReusablePostListing;

class PostListItem extends React.Component {


	render() {

		const key = `post-listing-${this.props.item.contentID}`
		const item = this.props.item.customFields

		const author = this.props.item.author;
		const image = item.postImage
		const logo = item.logo

		let url = this.props.url;

		let excerpt = item.excerpt;

		// let tags = this.props.item.tags;

		// if (tags && tags.length > 0) {
		// 	tags = tags.map(tag => {

		// 		let tagUrl = "/resources/posts/tag/" + encodeURIComponent(tag.customFields.title.toLowerCase().replace(/ /g, "-"));

		// 		return (
		// 			<Link to={ tagUrl } key={key + "-" + tag.contentID}>{tag.customFields.title}</Link>
		// 		)
		// 	});
		// }


		return (
			<div className="blog-post" key={key}>
				{image &&
					<div className="image">
						<Link to={url}>
							<ResponsiveImage img={image}
								breaks={[{ w: 640, max: 640 }, { w: 780, max: 800 }]} /></Link>
					</div>
				}
				<div className="content">
					{
						logo &&
						<div className="logo-image">
							<img src={logo.url} alt={ logo.label } loading="lazy" />
						</div>
					}
					<h3 className="h3"><Link to={url}>{item.title}</Link></h3>
					<PostTags post={this.props.item} />

					{
						author &&
						<div className="author">
							<div className="author-image">
								<img src={author.customFields.image ? author.customFields.image.url + '?w=100' : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg?w=100"} alt={ author.customFields.image ? author.customFields.image.label : 'author image' } loading="lazy" />
							</div>
							<h5 className="h5">{author.customFields.title}</h5>
						</div>
					}






					<div className="text"><p>{excerpt}</p></div>
					{
						item.date &&
						<span className="date">{item.date}</span>
					}


				</div>
			</div>
		);
	}
}