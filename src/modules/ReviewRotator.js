import { graphql, StaticQuery } from 'gatsby';
import React, { useEffect, useRef,} from 'react';
import Slider from 'react-slick';
import LazyLoad from 'react-lazyload'
import '../global/core/lib/_slick-theme.scss'
import Spacing from './Spacing'
import Helpers from '../global/javascript/Helpers'
import './ReviewRotator.scss'
import { renderHTML } from '../agility/utils';
import { animationElementInnerComponent } from '../global/javascript/animation'

export default props => (
	<StaticQuery
		query={graphql`
			query agilityReviewRotator {
				allAgilityReviews(sort: {fields: properties___itemOrder}) {
					nodes {
						customFields {
							title
							reviewer
							review
							reviewURL {
								href
								target
								text
							}
							starsGraphic {
								url
								label
							}
							reviewDate(formatString: "MMMM DD, yyyy")
						}
						properties {
							referenceName
							itemOrder
						}
					}
				}
			}
		`}
		render={queryData => {
			let listReviews = []
			const fieldsCustom = props.item.customFields
			if(fieldsCustom.reviews) {
				const reference = fieldsCustom.reviews.referencename
				listReviews = queryData.allAgilityReviews.nodes.filter(obj => {
					return obj.properties.referenceName === reference
				})
			}
			const viewModel = {
				item: props.item,
				listReviews
			}
			return (
				<ReviewRotator {...viewModel} />
			)
		}}
	/>
)
const ReviewRotator = ({ item, listReviews }) => {
	const classSection = `ReviewRotator animation ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`
	const heading = item.customFields.title
	const collapseReviewText = item.customFields.collapseReviewText
	const expandReviewText = item.customFields.expandReviewText
	const thisModuleRef = useRef(null)

	// console.log("ReviewRotator", item)
	const slideReviews = listReviews.length > 0 ? listReviews.map((item, idx) => {
		const fieldsReview = item.customFields
		const titleReview = fieldsReview.title
		const review = fieldsReview.review
		const reviewer = fieldsReview.reviewer
		const date = fieldsReview.reviewDate
		
		const initClick = (nb) => {
			const sibing = document.querySelectorAll(`.ReviewRotator-item[data-item='${nb}']`)
			if(!sibing[0].querySelectorAll('.content-smaller').length) {
				if (sibing[0].classList.contains('open')) {
					Array.from(sibing).forEach((ele,i) => {
						const content = ele.querySelectorAll('.content-review')[0]
						content.style.height = '150px'
						ele.classList.remove('open')
					})
				} else {
					Array.from(sibing).forEach((ele,i) => {
						const content = ele.querySelectorAll('.content-review')[0]
						content.style.height = content.scrollHeight + 'px'
						ele.classList.add('open')
					})
				}
			}
		}

		return (
			<div className="ReviewRotator-item small-paragraph" data-item={idx} key={idx}>
				<div className="mess-review ps-rv last-mb-none"  onClick={() => initClick(idx)}>
					{ fieldsReview.starsGraphic && fieldsReview.starsGraphic.url &&
						<LazyLoad offset={ Helpers.lazyOffset }>
							<img src={fieldsReview.starsGraphic.url} alt={fieldsReview.starsGraphic.label}></img>
						</LazyLoad>
					}
					<h4>{titleReview}</h4>
					{ review &&
						<div className="content-review" dangerouslySetInnerHTML={renderHTML(review)}></div>
					}
					<div>
						<span className="show-less" onClick={() => initClick(idx)}>
							<span className='more'>
								{expandReviewText}
							</span>
							<span className='less'>
								{collapseReviewText}
							</span>
							<LazyLoad offset={ Helpers.lazyOffset }>
								<img src="/images/down-icon.svg" alt="five star"></img>
							</LazyLoad>
						</span>
					</div>
				</div>
				<div className="info-review last-mb-none">
					{ reviewer &&
						<h6>{reviewer}</h6>
					}
					{ date &&
						<p>{date}</p>
					}
				</div>
			</div>
		)
	}) : []
	const settings = {
		dots: false,
		infinite: true,
    speed: 500,
		rows: 1,
		slidesToShow: 3,
    slidesToScroll: 1,
    respondTo: 'slider',
    responsive: [{
      breakpoint: 1199,
        settings: {
          slidesToShow: 2
        }
    },{
      breakpoint: 767,
      settings: {
				slidesToShow: 1,
				dots: true,
				arrows: false
      }
    }]
	};
	// const callcheckHeight = () => {
	// 	checkHeight()
	// 	window.addEventListener('resize', checkHeight);
	// }
	const checkHeight = () => {
		const content = document.querySelectorAll('.content-review');
		const maxHeight = 150
		Array.from(content).forEach((item, index) => {
			if(item.scrollHeight <= maxHeight) {
				item.classList.add('smaller')
				item.parentElement.classList.add('content-smaller')
				item.parentElement.parentElement.classList.remove('open')
			} else {
				item.classList.remove('smaller')
				item.parentElement.classList.remove('content-smaller')
			}
		})
		setTimeout (() => {
			const active = document.querySelectorAll('.ReviewRotator-item.open .content-review')
			Array.from(active).forEach((item, index) => {
				let h = 0
				Array.from(item.childNodes).forEach((ele, idx) => {
					h += (ele.scrollHeight + 10)
				})
				item.style.height = h + 'px'
			})
		}, 200)
	}
	useEffect(() => {
		// callcheckHeight()
		checkHeight()
		window.addEventListener('resize', checkHeight);

		return () => {
			window.removeEventListener('resize', checkHeight);
		}
  });

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
			<section className={classSection} ref={ thisModuleRef }>
				<div className="container last-mb-none max-w-940 text-center anima-bottom headling-review">
					{ heading &&
						<h2>{heading}</h2>
					}
				</div>
				<div className="container">
				<div className="slider-lazy ReviewRotator-slider anima-bottom delay-4">
					{slideReviews.length > 0 &&
						<Slider {...settings}>
							{slideReviews}
						</Slider>
					}
				</div>
				</div>
			</section>
			<Spacing item={item}/>
		</React.Fragment>
	);
}

