import React, { useEffect, useState } from 'react';
import { Link } from "gatsby"
import { DateTime } from 'luxon'
import ResponsiveImage from '../components/responsive-image.jsx'
import { renderHTML } from '../agility/utils'
import CallToAction from "../components/call-to-action.jsx"
import LazyBackground from '../utils/LazyBackground'
import Spacing from './Spacing'
import {  graphql, StaticQuery } from "gatsby"
import Helpers from '../global/javascript/Helpers'
import Lazyload from 'react-lazyload'
import "./RichTextArea.scss"
import "./PostDetails.scss"

const AboutAuthor = ({ author }) => {
  return <div className="meta about-author">
    <div className="author">
      <div className="">
        <LazyBackground className="author-image flex-0-0 bg" src={author && author.image ? author.image.url : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg"} />
        {/* <img src={author && author.image ? author.image.url : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg"} alt={author && author.title ? author.title : 'image author'} /> */}
      </div>
      <div className="author-content last-mb-none">
        <h5 className="h5">About the Author</h5>
        {author?.textblob && <div className="text-blob" dangerouslySetInnerHTML={renderHTML(author?.textblob)}></div>}
        {!author?.textblob && <div className="text-blob">{author?.title}</div>}
      </div>
    </div>
  </div>
}

const renderTags = (tags, options = {}) => {
  return tags.map((tag, index) => {
    let link = "/resources/posts" + encodeURIComponent(tag.customFields.title.toLowerCase().replace(/ /g, "-"))
    if (options.skipTitle) {
      link = '/resources/posts'
    }
    if (options.isTag) {
      link = "/resources/posts/tag/" + encodeURIComponent(tag.customFields.title.toLowerCase().replace(/ /g, "-"))
    }
    return <span key={'tags-' + index} className="d-inline-block cs-tag ps-rv">
      {tag?.customFields?.title}
      {!options.skipLink && <Link to={link} target="_self" className="ps-as"><span className="sr-only">{tag?.customFields?.title}</span></Link>}
    </span>
  })
}

const InfoPost = ({ post, item, link }) => {
  let shareLink = link.charAt(0) === '/' ? link.replace('/', '') : link
  shareLink = shareLink.trim()
  const domain = 'https://agilitycms.com'
  let text = post?.furtherReading?.href
  if (post?.furtherReading?.text && post?.furtherReading?.text !== '') {
    text = post?.furtherReading?.text
  }

  return <div className="info-post">
    {post.blogTags && post.blogTags.length && <div className="info-wrap" v>
      <h4>Topic</h4>
      {post.blogTags && renderTags(post.blogTags, { isTag: true })}
    </div>}

    {post?.furtherReading?.href && <div className="info-wrap cs-website">
      <h4>Further Reading</h4>
      <p>
        <a href={post?.furtherReading?.href} target={post?.furtherReading?.target}>{text}</a>
      </p>
    </div>}

    <div className="info-wrap cs-d-social">
      <h5>SHARE POST</h5>
      <div className="soc-box d-flex flex-wrap">
        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${domain + '/' + shareLink}`} target="_blank" className="d-flex align-items-center justify-content-center">
          <span className="icomoon icon-linkedin2"></span>
        </a>
        <a href={`https://twitter.com/intent/tweet/?url=${domain + '/' + shareLink}`} target="_blank" className="d-flex align-items-center justify-content-center">
          <span className="icomoon icon-twitter"></span>
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${domain + '/' + shareLink}`} target="_blank" className="d-flex align-items-center justify-content-center">
          <span className="icomoon icon-facebook"></span>
        </a>
      </div>
    </div>
  </div>
}

const PostDetailItem = ({post}) => {
  const thumbUrl = post?.customFields?.postImage?.url
  const link = '/resources/posts/' + post?.customFields?.uRL
  return <div className="case-box h-100 transition-25 flex-column new-post ps-rv d-flex">
    <div className="case-thumb ps-rv overflow-hidden bg-c9-o25">
      {thumbUrl && <LazyBackground className="ps-as z-2 bg transition-25" src={thumbUrl} />}
      {!thumbUrl && <Lazyload offset={Helpers.lazyOffset}><img src="/images/blog-icon-default.png" className='image-default' alt='Default Blog' loading="lazy" /></Lazyload>}
      <Link to={link} className="ps-as"><span className="sr-only">{post?.customFields?.title}</span></Link>
    </div>
    <div className="case-content d-flex flex-column small-paragraph flex">
      <div className="flex heading">
        <div className="wrap-tags">
          {renderTags([{
            customFields: { title: 'Blog' }
          }], { skipTitle: true })}
        </div>
        <h3>{post?.customFields?.title}</h3>
      </div>
      {link && <Link to={link} className="link-line flex-0-0 link-purple">Read More</Link>}
    </div>
    <Link to={link} className=" ps-as"><span className="sr-only">{post?.customFields?.title}</span></Link>
  </div>
}

const RelatedResources = ({ item, post, relatedPost }) => {
  return <section className="mod-related-resources">
    <div className="container">
      <div className="title text-center">
        <h2>{post?.titleRelatedResources || 'View Related Resources'}</h2>
      </div>
      <div className="row">
        {relatedPost.map(post => {
          return <div className="col-12 col-lg-4 post-item" key={'related-blog' + post.contentID}>
            <PostDetailItem post={post}/>
          </div>
        })}
      </div>
    </div>
  </section>
}

const RightSidebar = ({ post, item, link, relatedPost }) => {
  const isNotEmpty = str => str && str.trim() !== ''
  let rightCTABlock = ''
  let postsRight = JSON.parse(JSON.stringify(relatedPost || []))
  if (postsRight.length > 2) postsRight.length = 2
  if (isNotEmpty(post.titleRightCTA) || isNotEmpty(post.contentRightCTA) || post?.buttonRightCTA?.href) {
    rightCTABlock = <>
      <div className="bg-58 text-center last-mb-none text-white flex-column d-flex align-items-center justify-content-center learn-more-section">
        {isNotEmpty(post.titleRightCTA) && <h3>{post.titleRightCTA}</h3>}
        {isNotEmpty(post.contentRightCTA) && <p>{post.contentRightCTA}</p>}
        {post?.buttonRightCTA?.href && <p>
          <Link to={post?.buttonRightCTA?.href} className="btn btn-white text-decoration-none" target={post?.buttonRightCTA?.target}>{post?.buttonRightCTA?.text}</Link>
        </p>}
      </div>
    </>
  }

  return <>
    <InfoPost post={post} item={item} link={link} />

    <div className="addition-info d-none d-lg-block">
      {postsRight.map(postItem => {
        return <PostDetailItem post={postItem} key={'post-right-' + postItem.contentID} />
      })}

      {/* <div className="mod-space space-dt-50"></div> */}
      {rightCTABlock}
    </div>
  </>
}

const PostDetails = ({ item, dynamicPageItem, page, queryData }) => {
  item = item.customFields;
  const allPost = queryData?.allAgilityBlogPost?.nodes || []
  const post = dynamicPageItem.customFields;
  let link = '/resources/posts/' + post.uRL
  let relatedPost = []
  const getRecentPost = () => {
    let tmpPosts = allPost.filter(postItem => dynamicPageItem.contentID !== postItem.contentID && (postItem.customFields.blogCategories_ValueField || postItem.customFields.blogCategories_ValueField === ''))
    if (tmpPosts.length > 3) tmpPosts.length = 3
    return tmpPosts
  }
  if (post.resourcesList && post.resourcesList.length > 0) {
    relatedPost = post.resourcesList
  } else {
    if (!post.blogCategories_ValueField) {
      relatedPost = getRecentPost()
    } else {
      const categoryNum = post.blogCategories_ValueField.split(',').map(item => Number(item))
      relatedPost = allPost.filter(postItem => {
        return (postItem?.customFields?.blogCategories_ValueField || '').split(',').some(valueField => {
          return postItem.contentID !== dynamicPageItem.contentID && categoryNum.includes(Number(valueField))
        })
      })
      if (relatedPost.length === 0) {
        relatedPost = getRecentPost()
      }
    }
  }
  const author = post?.author?.customFields;
  const hasTweets = post.textblob && post.textblob.indexOf('class="twitter-tweet"') !== -1;
  const [state, setState] = useState({
    loaded: false
  })

  const addHighLightScript = () => {
		const script = document.createElement("script");
		script.id = 'hightlight-code-script'
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js';
		script.async = true;
		document.body.appendChild(script);

    const link = document.createElement('link');
    const head = document.getElementsByTagName('head')[0]
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    head.appendChild(link)
    const runHljs = setInterval(() => {
      if (window.hljs) {
        window.hljs.highlightAll()
        clearInterval(runHljs)
      }
    }, 1000)
	}

  useEffect(() => {
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
      addHighLightScript()
      setState({
        loaded: true,
      })
    }, 1500);
  });

  return (
    <>
      <section className="blog-post-details d-none">
        <div className="">
          <div className="container p-w-small rich-text">
            <h1 className="h1">{post.title}</h1>
            {post.subTitle &&
              <h4 className="h4">{post.subTitle}</h4>
            }
            {/* <PostTags post={post} /> */}

            <div className="meta">
              <div className="author">
                <div className="author-image">
                  <img src={author && author.image ? author.image.url + '?w=100' : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg?w=100"} alt={author && author.title ? author.title : 'image author'} />
                </div>
                <h5 className="h5">{author?.title}</h5>
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
      <section className="blog-post-details">
        <div className="container p-w-small">
          <div className="row">
            <div className="col-xl-7 mb-0">
              <div className="rich-text">
                {
                  item.backButton && item.backButton.text && item.backButton.href &&
                  <Link to={item.backButton.href} className="back d-flex ai-center ps-rv">
                    <span className="icomoon icon-chevron-left"></span>
                    <span>{item.backButton.text}</span>
                  </Link>
                }
                <div className="date">{DateTime.fromISO(post.date).toFormat("MMM d, yyyy")}</div>

                <h1 className="h1">{post.title}</h1>
                {post.subTitle &&
                  <h4 className="h4">{post.subTitle}</h4>
                }

                <div className="meta top">
                  <div className="author">
                    <LazyBackground className="author-image bg" src={author && author.image ? author.image.url : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg"} />
                    {/* <div className="author-image">
                      <img src={author && author.image ? author.image.url + '?w=100' : "https://static.agilitycms.com/authors/blank-head-profile-pic.jpg?w=100"} alt={author && author.title ? author.title : 'image author'} />
                    </div> */}
                    <h5 className="h5">{author?.title}</h5>
                  </div>
                </div>
              </div>

              <div className=" d-block d-lg-none">
                <RightSidebar post={post} item={item} link={link} relatedPost={relatedPost}/>
              </div>
            </div>
            <div className="col-lg-5"></div>
          </div>
          <div className="row">
            <div className="col-lg-7 rich-text mb-0">
              {post.postImage &&
                <div className="image">
                  <ResponsiveImage img={post.postImage} layout="fullWidth" />
                </div>
              }
              <div className="post-content" dangerouslySetInnerHTML={renderHTML(post.textblob)}></div>
              {post.cTA && <CallToAction item={post.cTA} />}
              <div className="mod-space space-40 space-dt-40"></div>
              <AboutAuthor author={author}/>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-4 d-none d-lg-block">
              <RightSidebar post={post} item={item} link={link} relatedPost={relatedPost}/>
            </div>
          </div>
        </div>
      </section>
      <RelatedResources item={item} post={post} relatedPost={relatedPost}/>
      <Spacing item={{ customFields: item }} />
    </>
  );
}

export default props => (
  <StaticQuery
		query={graphql`
		query NewPostDetailQuery {
			allAgilityBlogPost(
				filter: {properties: {referenceName: {eq: "blogposts"}}}
				sort: {fields: customFields___date, order: DESC}
			) {
				nodes {
					contentID
					customFields {
						date(formatString: "MMMM D, YYYY")
						excerpt
						title
						uRL
						postImage {
							label
							url
							filesize
							height
							width
						}
						blogCategories {
							referencename
							sortids
						}
						blogCategories_TextField
						blogCategories_ValueField
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
      return <PostDetails {...props} queryData={queryData} />
		}}
	/>
)