import { Link } from 'gatsby';
import React, { useState } from 'react';
import Slider from 'react-slick';
import Lazyload from 'react-lazyload'
import LazyBackground from '../utils/LazyBackground'
import '../global/core/lib/_slick-theme.scss'
import StringUtils from '../utils/string-utils'
import './CaseStudyRotator.scss';
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'

const CaseStudyRotator = ({ item }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const fields = item.customFields
  const ctaBtnText = fields.cTAbuttonText
  const title = fields.title
  const classSection = `module mod-feature-casestudy CaseStudyRotator animation ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode': ''}`
  const caseStudies = fields.caseStudies.map((caseStudy) => {
    const customField = caseStudy.customFields
    const excerpt = StringUtils.stripHtml(customField.excerpt, 200)
    const titleCaseStudy = customField.title
    const postUrl = '/resources/case-studies/' + customField.uRL
    return (
      <div className="item-casetudy text-white" key={caseStudy.contentID}>
        <LazyBackground className="bg-casestudi bg bg-center d-flex align-items-center" src={caseStudy.customFields.image.url} >  {/* style={{ backgroundImage: `url('${caseStudy.customFields.image.url}')` }} */}
          <div className="content-case last-mb-none h3-big ps-rv">
            { titleCaseStudy &&
              <h3>{titleCaseStudy}</h3>
            }
            { excerpt &&
              <p>{excerpt}</p>
            }
            { ctaBtnText &&
              <p><Link to={postUrl} className="btn btn-yellow text-decoration-none">{ctaBtnText}</Link></p>
            }
          </div>
            { ctaBtnText &&
              <Link to={postUrl} className="ps-as"><span className="sr-only">{ctaBtnText}</span></Link>
            }
        </LazyBackground>
      </div>
    )
  })
  const listLogo = fields.caseStudies.map(caseStudy => {
    const customField = caseStudy.customFields
    if (customField.customerLogo.url) {
      return (
        <div className="item-logo-feature d-inline-flex align-items-center justify-content-center" key={'logo-' + caseStudy.contentID}>
          <Lazyload offset={ Helpers.lazyOffset }><img src={customField.customerLogo.url} alt={customField.customerLogo.label}></img></Lazyload>
        </div>
      )
    }
    return null
  })
	const settings = {
		dots: false,
		infinite: true,
    speed: 500,
    arrows: true,
    centerPadding: '0',
    centerMode: true,
		rows: 1,
		slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    respondTo: 'slider',
    responsive: [{
      breakpoint: 1500,
        settings: {
          centerPadding: '305px'
        }
    },{
      breakpoint: 1199,
        settings: {
          centerPadding: '186px'
        }
    },{
      breakpoint: 991,
        settings: {
          centerPadding: '84px'
        }
    },{
      breakpoint: 767,
      settings: {
        centerPadding: '0px',
        speed: 300
      }
    }]
  };

	return (
    <React.Fragment>
    <section className={classSection}>
      { title &&
        <div className="container">
          <div className="title-f-casestudy text-center last-mb-none anima-bottom">
            <h2>{title}</h2>
          </div>
        </div>
      }
      { caseStudies.length > 0 &&
        <div className="box-slider-center slider-lazy slick-slider anima-bottom delay-4">
          <Slider {...settings} asNavFor={nav2} ref={c => setNav1(c)} className="list-casestudy-slide">
            {caseStudies}
          </Slider>
        </div>
      }
      { listLogo.length > 0 &&
        <div className="container anima-bottom delay-6">
          <div className="text-center list-logo-feature">
            <Slider asNavFor={nav1} ref={c => setNav2(c)} slidesToShow={3} slidesToScroll={1} swipeToSlide={true} focusOnSelect={true} centerMode={true}>
              {listLogo}
            </Slider>
          </div>
        </div>
      }
    </section>
    <Spacing item={item}/>
    </React.Fragment>
	);
}

export default CaseStudyRotator;
