import { Link } from 'gatsby';
import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import Lazyload from 'react-lazyload'
import LazyBackground from '../utils/LazyBackground'
import '../global/core/lib/_slick-theme.scss'
import * as StringUtils from '../utils/string-utils'
import './CaseStudyRotator.scss';
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'
import ResponsiveImage from '../components/responsive-image';
import { animationElementInnerComponent } from '../global/javascript/animation'
import { Helmet } from 'react-helmet';

const CaseStudyRotator = ({ item }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const fields = item.customFields
  const ctaBtnText = fields?.cTAbuttonText
  const title = fields?.title
  const classSection = `module mod-feature-casestudy CaseStudyRotator animation ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode' : ''}`
  const caseStudies = fields?.caseStudies?.map((caseStudy, index) => {
    const customField = caseStudy.customFields
    const excerpt = StringUtils.stripHtml(customField.excerpt, 200)
    const titleCaseStudy = customField?.title
    const postUrl = '/resources/case-studies/' + customField.uRL

    return (
      <div className="item-casetudy text-white overflow-hidden ps-rv" key={caseStudy.contentID}>
        <div className=" ps-as bg bg-center i-case-thumb transition-25">
          <ResponsiveImage img={caseStudy.customFields.image} />
        </div>

        <div className="bg-casestudi d-flex align-items-center">
          <div className="content-case last-mb-none ps-rv">
            {titleCaseStudy &&
              <h3>{titleCaseStudy}</h3>
            }
            {excerpt &&
              <p>{excerpt}</p>
            }
            {ctaBtnText &&
              <p><Link to={postUrl} className="btn btn-yellow text-decoration-none">{ctaBtnText}</Link></p>
            }
          </div>
          {ctaBtnText &&
            <Link to={postUrl} className="ps-as"><span className="sr-only">{ctaBtnText}</span></Link>
          }
        </div>
      </div>
    )
  })


  let listLogo = fields?.caseStudies?.map(caseStudy => {
    const customField = caseStudy.customFields
    if (customField?.customerLogo?.url) {

      return (
        <div className="item-logo-feature d-inline-flex align-items-center justify-content-center" key={'logo-' + caseStudy.contentID}>
          <Lazyload offset={Helpers.lazyOffset}>
            <img src={customField.customerLogo.url + '?w=200'} width="77" height="72" alt={customField.customerLogo.label}></img>
            {/* <ResponsiveImage img={customField?.customerLogo} /> */}
          </Lazyload>
        </div>
      )
    }
    return null
  })

  const [isNotMobile, setIsNotMobile] = useState(false)
  useEffect(() => {
    const isNotMobile = window?.innerWidth < 767 ? false : true
    setIsNotMobile(isNotMobile)
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 5000,
    speed: 350,
    arrows: true,
    centerPadding: '0',
    centerMode: isNotMobile,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    respondTo: 'slider',
    responsive: [{
      breakpoint: 767,
      settings: {
        centerMode: false,
        speed: 300
      }
    }]
  };

  const logosSettings = {
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: listLogo?.length > 2 ? 3 : listLogo?.length,
    swipeToSlide: true,
    focusOnSelect: true,
    speed: 350
  };

  const thisModuleRef = useRef(null)
  /* animation module */
  useEffect(() => {
    const scrollEventFunc = () => {
      animationElementInnerComponent(thisModuleRef.current)
    }
    animationElementInnerComponent(thisModuleRef.current)
    window.addEventListener('scroll', scrollEventFunc)

    return () => {
      window.removeEventListener('scroll', scrollEventFunc)
    }
  }, [])


  return (
    <React.Fragment>
      <section className={classSection} ref={thisModuleRef}>
        {title &&
          <div className="container">
            <div className="title-f-casestudy text-center last-mb-none anima-bottom">
              <h4 className="h2">{title}</h4>
            </div>
          </div>
        }
        {caseStudies && caseStudies.length > 0 &&
          <div className="box-slider-center slider-lazy slick-slider anima-bottom delay-4">
            <Slider {...settings} asNavFor={nav2} ref={c => setNav1(c)} className="list-casestudy-slide">
              {caseStudies}
            </Slider>
          </div>
        }
        {listLogo && listLogo.length > 0 &&
          <div className="container anima-bottom delay-6">
            <div className={`text-center list-logo-feature length-${listLogo?.length} ${listLogo?.length <= 3 ? 'three-item' : ''}`}>
              <Slider
                {...logosSettings}
                asNavFor={nav1} ref={c => setNav2(c)}
              >
                {listLogo}
              </Slider>
            </div>
          </div>
        }
      </section>

      <Spacing item={item} />
    </React.Fragment>
  );
}

export default CaseStudyRotator;
