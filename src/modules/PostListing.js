import React from 'react';
import { Link, graphql, StaticQuery } from "gatsby"
import StringUtils from "../utils/string-utils"


import ResponsiveImage from '../components/responsive-image.jsx'
import InfiniteScroll from 'react-infinite-scroller';
import PostTags from "../components/PostTags.jsx"

import './PostListing.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query PostListingQuery {

			allAgilityBlogPost(filter: {properties: {referenceName: {eq: "blogposts"}}}, sort: {fields: customFields___date, order: DESC}) {
			  nodes {
				contentID
				customFields {
				  date(formatString: "MMMM D, YYYY")
				  excerpt
				  title
				  uRL
				  postImage {
					url
					label
				  }
				}
				category {
				  customFields {
					title
				  }
				}
				author {
				  customFields {
					image {
					  url
					  label
					}
					title
				  }
				}
				tags {
					contentID
					customFields {
						title
					}
				}
			  }
			}
		  }
        `}
		render={queryData => {

			//filter out only those logos that we want...
			let posts = queryData.allAgilityBlogPost.nodes;

			//filter by tag if neccessary
			if (props.dynamicPageItem && props.dynamicPageItem.properties.definitionName === "BlogTag") {
				const tagContentID = props.dynamicPageItem.contentID;

				posts = posts.filter(p => {
					if (! p.tags || ! (p.tags.length > 0)) return false;
					const index = p.tags.findIndex(t => { return parseInt(t.contentID) === parseInt(tagContentID); });
					return index >= 0;
				});
			}

			//adjust the excerpt
			posts.forEach(p => {
				let excerpt = p.customFields.excerpt;
				if (excerpt) {
					p.customFields.excerpt = StringUtils.stripHtml(excerpt, 200);
				}
			});

			const viewModel = {
				item: props.item,
				posts: posts
			}
			return (
				<PostListing {...viewModel} />
			);
		}}
	/>
)

class PostListing extends React.Component {
	constructor(props) {
		super(props)

		if (typeof window === 'undefined') {
			return;
		}

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
		if (! this.state.loadingMore) {

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

		if (typeof window === 'undefined') {
			return <div className="blog-listing">Loading...</div>;
		}

		var posts = this.state.posts.map(item => {

			let postUrl = "/resources/posts/" + item.customFields.uRL;

			return <PostListItem item={item} url={postUrl} key={this.moduleItem.contentID + "-" + item.contentID} />
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


class PostListItem extends React.Component {


	render() {

		const key = `post-listing-${this.props.item.contentID}`
		const item = this.props.item.customFields

		const author = this.props.item.author;
		const image = item.postImage

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
					<h3 className="h3"><Link to={url}>{item.title}</Link></h3>
					<PostTags post={this.props.item} />

					{
						author &&
						<div className="author">
							<div className="author-image">

								<img src={author.customFields.image ? author.customFields.image.url + '?w=100' : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg?w=100"} alt="" />
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
