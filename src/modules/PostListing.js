import React from 'react';
import { Link, graphql, StaticQuery } from "gatsby"


import ResponsiveImage from '../components/responsive-image.jsx'
import InfiniteScroll from 'react-infinite-scroller';

import './PostListing.scss'

export default props => (
	<StaticQuery
		query={graphql`
		query PostListingQuery {
			allAgilitySitemapNode(filter: {contentID: {gt: 0}, pagePath: {regex: "/\/resources\/posts\//i"}}) {
				nodes {
					pageID
					contentID
					pagePath
				}
			}
			allAgilityBlogPost(filter: {properties: {referenceName: {eq: "blogposts"}}}, sort: {fields: customFields___date, order: DESC}) {
			  nodes {
				contentID
				customFields {
				  date(formatString: "MMMM D, YYYY")
				  excerpt
				  title
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
			  }
			}
		  }
        `}
		render={queryData => {

			//filter out only those logos that we want...
			let posts = queryData.allAgilityBlogPost.nodes;
			let sitemapNodes = queryData.allAgilitySitemapNode.nodes;

			const viewModel = {
				item: props.item,
				posts: posts,
				sitemapNodes: sitemapNodes
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

		var url = "";
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


			let sitemapNode = this.sitemapNodes.find(n => n.contentID === item.contentID);

			return <PostListItem item={item} sitemapNode={sitemapNode} key={this.moduleItem.contentID + "-" + item.contentID} />
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

		const sitemapNode = this.props.sitemapNode;
		let url = "";
		if (sitemapNode) url = sitemapNode.pagePath;

		let excerpt = item.excerpt;
		if (excerpt) {
			var element = document.createElement('div');
			element.innerHTML = excerpt;
			excerpt = element.innerText;
			element = null;

			if (excerpt.length > 200) {
				excerpt = excerpt.substring(0, 200) + "...";
			}

		}

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
