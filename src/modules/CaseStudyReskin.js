import React, { useEffect, useState, useRef } from 'react'
import './CaseStudyReskin.scss'
import LazyBackground from '../utils/LazyBackground'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { AgilityImage } from "@agility/gatsby-image-agilitycms"
import LazyLoad from 'react-lazyload'
import Helpers, { addUrlParam, removeURLParam } from '../global/javascript/Helpers'
import SelectC8 from '../utils/SelectC8'

import Spacing from './Spacing'
import SingleTestimonialPanel from './SingleTestimonialPanel'
import { animationElementInnerComponent } from '../global/javascript/animation'
import PostItem from './PostItem'

const CaseStudyReskin = ({ item, posts = [] }) => {

  const categoryQuery = useStaticQuery(graphql`
    query IndustriesAndChallenges {
      allAgilityCaseStudyIndustry {
        edges {
          node {
            customFields {
              title
            }
            contentID
          }
        }
      }
      allAgilityCaseStudyChallenge {
        edges {
          node {
            customFields {
              title
            }
            contentID
          }
        }
      }
    }
  `)

  let allTagsText = '';
  posts.map(post => {
    allTagsText += `${post?.customFields?.caseStudyChallenges_TextField},${post?.customFields?.caseStudyIndustries_TextField},`

    return post
  })
  const industries = {};
  categoryQuery?.allAgilityCaseStudyIndustry?.edges?.filter(item => {
    if (item.node?.customFields?.title && item.node?.contentID && allTagsText?.indexOf(item.node?.customFields?.title) !== -1) {
      industries[item.node?.contentID] = item.node?.customFields?.title
    }
    return item
  })
  const challenges = {};
  categoryQuery?.allAgilityCaseStudyChallenge?.edges?.map(item => {
    if (item.node?.customFields?.title && item.node?.contentID && allTagsText?.indexOf(item.node?.customFields?.title) !== -1) {
      challenges[item.node?.contentID] = item.node?.customFields?.title
    }
    return item?.node
  })

  /* options for select filter */
  const tmpIndustriesOpts = {
    name: 'industries',
    options: { ...industries, 1: 'All Industries' },
    selectedOption: [1],
  }
  const tmpChallengesOpts = {
    name: 'challenges',
    options: { ...challenges, 1: 'All Solutions' },
    selectedOption: [1],
  }

  // console.log(`posts`, posts)
  // console.log(`categoryQuery`, industries, allTagsText)

  /* list clean Posts */
  const tmpAbovePosts = posts.slice(0, 8);
  const tmpBelowPosts = posts.slice(8, 16);

  /* init state */
  const [abovePosts, setAbovePosts] = useState(tmpAbovePosts)
  const [belowPosts, setBelowPosts] = useState(tmpBelowPosts)
  const [industriesOpts, setIndustriesOpts] = useState(tmpIndustriesOpts)
  const [challengesOpts, setChallengesOpts] = useState(tmpChallengesOpts)
  const [postsList, setPostsList] = useState(posts)

  const [pagingIndex, setPagingIndex] = useState(0)
  const [btnPagingList, setBtnPagingList] = useState([])

  // const timeORef = useRef(null)
  const firstLoadRef = useRef(true)

  const [isMobile, setIsMobile] = useState(false)

  const halfPost = isMobile ? 5 : 8

  /* check first load component */
  useEffect(() => {
    const checkIsMobile = () => {
      // clearTimeout(timeORef.current)
      // timeORef.current = setTimeout(() => {
        if (window.innerWidth < 768) {
          setIsMobile(true)
        } else {
          setIsMobile(false)
        }
      // }, 100)
    }

    const loadFilterOpts = () => {
      const search = window.location.search.substring(1)
      let params = search.split('&')
      params = params.map(p => {
        return (p.split('='))
      })
      const findFilterIdBySlug = (list = {}, slug = '') => {
        let result = 1
        const values = Object.values(list)
        const keys = Object.keys(list)
        values.filter((item, index) => {
          if (item.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-') === slug) {
            result = keys[index]
          }
          return item
        })
        return result
      }

      if (params.length) {
        params.map(p => {
          if (p[0] === 'industry') {
            setIndustriesOpts({ ...industriesOpts, selectedOption: [findFilterIdBySlug(industries, p[1])] })
          }
          if (p[0] === 'challenge') {
            setChallengesOpts({ ...challengesOpts, selectedOption: [findFilterIdBySlug(challenges, p[1])] })
          }
          if (p[0] === 'page') {
            setPagingIndex(p[1] - 1)
          }
        })
      }
    }
    checkIsMobile()
    loadFilterOpts()
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])


  /* calc post per page when has updated */
  const handlePostsPerPage = () => {
    const min = halfPost * 2 * pagingIndex
    const max = halfPost * 2 * (pagingIndex + 1)
    const tmpAbovePosts = postsList.slice(min, max - halfPost);
    const tmpBelowPosts = postsList.slice(min + halfPost, max);
    setAbovePosts([...tmpAbovePosts])
    setBelowPosts([...tmpBelowPosts])
  }

  useEffect(() => {
    handlePostsPerPage()
  }, [halfPost, pagingIndex, postsList])
  /* -------------------- */

  /* chekc update filter options */
  useEffect(() => {

    const indKey = industriesOpts.selectedOption[0]
    const chaKey = challengesOpts.selectedOption[0]
    let slug = ''
    let url = window.location.href
    url = url.substring(0, url.indexOf('?'))
    if (indKey === 1 && chaKey === 1) {
      setPostsList([...posts])
      window.history.pushState({}, '', removeURLParam('industry'))
      window.history.pushState({}, '', removeURLParam('challenge'))
      // window.history.pushState({}, '', url)
    } else {
      /* get text of Category */
      const currentInd = industries[indKey]
      const currentCha = challenges[chaKey]
      let tmpPosts = posts.filter(post => {
        /* just challeges */
        if (!currentInd) {
          if (post.customFields?.caseStudyChallenges_TextField
            && post.customFields?.caseStudyChallenges_TextField?.indexOf(currentCha) !== -1) {
            return post
          }
        }
        /* just industries */
        if (!currentCha) {
          if (post.customFields?.caseStudyIndustries_TextField
            && post.customFields?.caseStudyIndustries_TextField?.indexOf(currentInd) !== -1) {
            return post
          }
        }
        /* both */
        if (post.customFields?.caseStudyIndustries_TextField && post.customFields?.caseStudyIndustries_TextField?.indexOf(currentInd) !== -1
          && post.customFields?.caseStudyChallenges_TextField && post.customFields?.caseStudyChallenges_TextField?.indexOf(currentCha) !== -1) {

          return post
        }
      })
      /* update URL with filter params */
      if (currentInd) {
        const url = addUrlParam('industry', currentInd.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-'))
        window.history.pushState({}, '', url)
      } else {
        window.history.pushState({}, '', removeURLParam('industry'))
      }

      if (currentCha) {
        const url = addUrlParam('challenge', currentCha.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-'))
        window.history.pushState({}, '', url)
      } else {
        window.history.pushState({}, '', removeURLParam('challenge'))
      }

      // console.log(`tmpPosts`, tmpPosts)
      setPostsList([...tmpPosts])
    }
  }, [industriesOpts, challengesOpts])

  /* update URL with pagination */
  useEffect(() => {
    let url = ''
    if (pagingIndex === 0) {
      url = removeURLParam('page')
    } else {
      url = addUrlParam('page', pagingIndex + 1)
    }
    window.history.pushState({}, '', url)
    if (!firstLoadRef.current) {
      scrollTopModule()
    }
  }, [pagingIndex])

  const onChangeFilter = ({ name, value }) => {
    /* reset paging when filter */
    setPagingIndex(0);
    if (name === 'industries') {
      setIndustriesOpts({ ...industriesOpts, selectedOption: value })
    }
    if (name === 'challenges') {
      setChallengesOpts({ ...challengesOpts, selectedOption: value })
    }
  }


  /* Pagination actions */
  const actionFwd = () => {
    const max = Math.ceil(postsList.length / (halfPost * 2))
    setPagingIndex(max - 1)
  }
  const actionBwd = () => {
    setPagingIndex(0)
  }
  const actionNextPage = () => {
    const max = Math.ceil(postsList.length / (halfPost * 2))
    if (pagingIndex < max) {
      setPagingIndex(pagingIndex + 1)
    }
  }
  const actionPrevPage = () => {
    if (pagingIndex > 0) {
      setPagingIndex(pagingIndex - 1)
    }
  }

  const handlePagingList = () => {
    const max = Math.ceil(postsList.length / (halfPost * 2))
    let tmp = []
    if (max < 3) {
      for (let i = 0; i < max; i++) {
        tmp.push(i)
      }
    } else {
      if (pagingIndex === 0) {
        tmp = [0, 1, 2]
      } else
        if (pagingIndex === max - 1) {
          tmp = [max - 3, max - 2, max - 1]
        } else {
          tmp = [pagingIndex - 1, pagingIndex, pagingIndex + 1]
        }
    }

    setBtnPagingList(tmp)
  }

  useEffect(() => {
    handlePagingList()

  }, [pagingIndex, postsList])
  /* --------------------------- */

  const thisModuleRef = useRef(null)

  const scrollTopModule = () => {
    // setTimeout(() => {
      let header = document.querySelectorAll('#header')[0].offsetHeight
      Helpers.animateScrollTop(thisModuleRef.current.offsetTop - header - 20, 350)
    // }, 100)
  }

  /* animation module */
  useEffect(() => {
    const scrollEventFunc = () => {
      animationElementInnerComponent(thisModuleRef.current)
    }
    animationElementInnerComponent(thisModuleRef.current)
    window.addEventListener('scroll', scrollEventFunc)

    /* update ref first Load */
    firstLoadRef.current = false
    return () => {
      window.removeEventListener('scroll', scrollEventFunc)
    }
  }, [])


  const renderPosts = (posts, longBoxOnLeft = false) => {
    return posts.map((post, index) => {
      const isPurpleBackground = post.customFields?.isPurpleBackground === 'true' ? true : false
      /* Mobile => each 5 items, show 1 special item on index 5 */
      if (isMobile) {
        if (isPurpleBackground) {
          return (
            <div key={index} className="col-md-6 col-lg-4 case-col" >
              < PostSpecialItem post={post} isSpecial={isPurpleBackground} />
            </div>)
        } else {
          return (
            <div key={index} className="col-md-6 col-lg-4 case-col">
              < PostItem showCustomerLogo={true} post={post} />
            </div>)
        }
      } else {
        /* Desktop => each 5 items, item 4 and 5 is special */

        if (index % 5 === 3 && longBoxOnLeft) {
          return (
            <div key={index} className={`col-md-6 col-lg-8 case-col`}>
              < PostSpecialItem post={post} longBox={true} isSpecial={isPurpleBackground} />
            </div>)
        }
        if (index % 5 === 4 && !longBoxOnLeft) {
          return (
            <div key={index} className={`col-md-6 col-lg-8 case-col`}>
              < PostSpecialItem post={post} longBox={true} isSpecial={isPurpleBackground} />
            </div>)
        }
        if (isPurpleBackground) {
          return (
            <div key={index} className={`col-md-6 col-lg-4 case-col`}>
              < PostSpecialItem post={post} isSpecial={isPurpleBackground} />
            </div>)
        }

        return (
          <div key={index} className="col-md-6 col-lg-4 case-col">
            < PostItem showCustomerLogo={true} post={post} />
          </div>)
      }
    })
  }

  return (
    <>
      <section ref={thisModuleRef} className="animation">
        <div className="container anima-bottom delay-2 cs-above">
          <div className="case-filter-box small-paragraph">
            <SelectC8 className="d-inline-block" data={industriesOpts} onChange={onChangeFilter} />
            <SelectC8 className="d-inline-block" data={challengesOpts} onChange={onChangeFilter} />
          </div>
          <div className="row">
            {abovePosts?.length > 0 ? renderPosts(abovePosts, true) :
              <div className="col last-mb-none">
                <h4 className="h3" style={{color: '#5800d4'}}>There is no results match with your search.</h4>
              </div>
            }
          </div>
        </div>
        <SingleTestimonialPanel item={item} />
        <div className="container anima-bottom delay-2">
          <div className="row">
            {renderPosts(belowPosts, false)}
          </div>
        </div>
        <div className={`container ${postsList?.length > 0 ? '' : 'd-none'}`}>
          {abovePosts?.length > 0 && btnPagingList.length > 1 &&
            <div className="">
              <ul className="pagination">
                <li className={`style-prev style-double ${pagingIndex <= 0 ? 'disable-paging' : ''}`} onClick={() => { actionBwd() }}>
                  <span className="icomoon icon-arrow"></span>
                </li>
                <li className={`style-prev ${pagingIndex <= 0 ? 'disable-paging' : ''}`} onClick={() => { actionPrevPage() }}>
                  <span className="icomoon icon-arrow"></span>
                </li>
                {btnPagingList.map((index) => {
                  return (
                    <li key={index} className={pagingIndex === index ? 'active' : ''} onClick={() => { setPagingIndex(index) }}>{index + 1}</li>
                  )
                })}
                <li className={`page-next ${pagingIndex >= postsList.length / (halfPost * 2) - 1 ? 'disable-paging' : ''}`} onClick={() => { actionNextPage() }}>
                  <span className="icomoon icon-arrow"></span>
                </li>
                <li className={`style-double ${pagingIndex >= postsList.length / (halfPost * 2) - 1 ? 'disable-paging' : ''}`} onClick={() => { actionFwd() }}>
                  <span className="icomoon icon-arrow"></span>
                </li>
              </ul>
            </div>
          }
        </div>
      </section>
      <Spacing item={item} />
    </>
  )
}

export default CaseStudyReskin


const trimText = (text) => {
  let txt = text.split(' ')
  return txt.length > 18 ? txt.slice(0, 18).join(' ').concat('...') : txt.join(' ')
}

const PostSpecialItem = ({ post, longBox = false, isSpecial = false }) => {

  const thumbUrl = post?.customFields?.postImage?.url
  const link = post?.url
  const title = post?.customFields?.title
  const body = post?.customFields?.excerpt
  const logo = post?.customFields?.customerWhiteLogo || post?.customFields?.logo
  let longBoxClass = ''
  if (isSpecial) {
    longBoxClass += 'bg-6d is-special'
  } else {
    longBoxClass = longBox ? 'long-box' : ''
  }
  return (
    <div className={`case-spe-box h-100 transition-25 ps-rv ${longBoxClass}`}>
      {longBox &&
        <LazyBackground className={`transition-25 ps-as bg`} src={thumbUrl} />
      }
      <div className="case-content d-table ps-rv h-100 small-paragraph">
        <div className="d-table-cell ps-rv align-middle">
          <div className="case-logo">
            <LazyLoad offset={Helpers.lazyOffset}>
              <img src={logo.url} alt={logo.label || title} loading="lazy" />
            </LazyLoad>
          </div>
          <h3>{title}</h3>
          <p>{trimText(body)}</p>
          {link &&
            <Link to={link} className={`mb-0 btn ${longBox ? 'btn-yellow' : 'btn-outline-white'}`}>Read More</Link>
          }
        </div>
      </div>
      {/* {longBox && */}
      <Link to={link} className=" ps-as"><span className="sr-only">{title}</span></Link>
      {/* } */}
    </div>
  )
}
