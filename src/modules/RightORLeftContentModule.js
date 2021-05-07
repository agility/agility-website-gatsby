import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from "react-helmet"
import { renderHTML } from '../agility/utils'
import './RightORLeftContentModule.scss'
import Spacing from './Spacing'
import { animationElementInnerComponent } from '../global/javascript/animation'



const HasImg = ({ img, isHomePage }) => {

	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
			setIsLoaded(true)
	}, [])

	return (
		<React.Fragment>
			{/* <picture>
					<source srcSet={img.url}></source>
					<img src={img.url} alt={ img.label ? img.label : 'image video' } className="img-mb"  />
				</picture> */}
				<Helmet>
					<link rel="preload" as="image" href={img.url} media="screen" />
				</Helmet>


			<img src={img.url} width={ !isLoaded ? '320' : '' } height={ !isLoaded ? '208' : '' } alt={img.label ? img.label : 'image video'} className={isHomePage ? 'img-mb' : 'anima-right'} />
			{isHomePage &&
				<div className="d-none d-sl-block">
					<div className="ani-banner"></div>
					<div className="ani-banner"></div>
					<div className="ani-banner"></div>
					<div className="ani-banner item-bg"></div>
					<div className="ani-banner"></div>
				</div>
			}

		</React.Fragment>
	)
	// return (
	// 	<img src={img.url} className="anima-right" alt={ img.label ? img.label : 'image video' } />
	// )
}

const ImgRender = React.memo(HasImg)


const RightOrLeftContent = ({ item }) => {
	const heading = item.customFields.title
	const des = item.customFields.description
	const breadcrumb = item.customFields.breadcrumb
	const btn1 = item.customFields.cTA1Optional
	const btn2 = item.customFields.cTA2Optional
	const classSection = `module mod-banner right-or-left-content animation ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white has-btn-white' : ''}`
	const array = []
	const [isHomePage, setIsHomePage] = useState(false);
	// const [classWrap, setClassWrap] = useState('wrap-ani-home ps-rv internal-wrap');
	// const [classBtn, setClassBtn] = useState('wrap-btn internal-btn');
	let classAniImg = 'col-md-6 col-right-lr'
	let imgModule
	if (item.customFields.graphic && item.customFields.graphic.url) {
		imgModule = item.customFields.graphic
	} else {
		classAniImg = classAniImg + ' anima-right'
	}


	/*  */

	const bannerRef = useRef(null)
	const [isLottieLoad, setIsLottieLoad] = useState(false)

	/*  */
	const detectHomePage = () => {
		// if(typeof window !== `undefined`) {

		const detectHome = ['/new-home', '/new-home/', '/'].includes(window.location.pathname)

		setIsHomePage(detectHome)

		// if (isHomePage || detectHome) {

		// 	// setClassWrap('wrap-ani-home ps-rv')
		// 	// setClassBtn('wrap-btn')
		// }

		// }
	}
	const appenLottie = (callback = function () { }) => {
		const script = document.createElement("script");
		script.src = "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.5.7/lottie_light_html.min.js";
		script.async = true;
		document.body.appendChild(script);
		script.onload = () => {
			// console.log('loottie', window.lottie);
			callback()
		}
	}
	const init = () => {
		callAnimation()
		window.addEventListener('resize', callAnimation);
	}

	/*  */
	const callAnimation = () => {
		let banner = bannerRef.current
		if (banner.classList.contains('mod-banner') && window.innerWidth >= 1025 && !banner.classList.contains('done-ani')) {
			appenLottie(() => { setIsLottieLoad(true) })
		}
	}
	const loadAni = () => {
		let temp = 0
		Array.from(document.querySelectorAll('.ani-banner')).forEach((item, index) => {
			array[index] = window.lottie.loadAnimation({
				container: item,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				path: `/js/layer_${index}.json`
			})
			if (index === 2 || index === 3) {
				array[index].addEventListener('loaded_images', function (e) {
					temp++
					if (temp === 2) {
						document.getElementsByClassName('mod-banner')[0].classList.add('done-ani')
					}
				})
			}
		})

		setTimeout(() => {
			array.forEach(element => element.play());
		}, 600)
	}

	const initParallax = () => {
		if (document.getElementsByClassName('ani-banner').length) {
			parallaxBanner()
		}
	}
	const parallaxBanner = () => {
		const doc = document.documentElement;
		const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		const item0 = document.getElementsByClassName('ani-banner')[0]
		const item1 = document.getElementsByClassName('ani-banner')[1]
		const item2 = document.getElementsByClassName('ani-banner')[2]
		const item3 = document.getElementsByClassName('ani-banner')[3]
		const item4 = document.getElementsByClassName('ani-banner')[4]
		item0.style.transform = 'translateY(' + -(top / 6) + 'px)'
		item1.style.transform = 'translateY(' + -(top / 5) + 'px)'
		item2.style.transform = 'translateY(' + -(top / 3) + 'px)'
		item3.style.transform = 'translateY(' + -(top / 2.3) + 'px)'
		item4.style.transform = 'translateY(' + -(top / 3.5) + 'px)'
	}
	const NoImg = () => {
		return <React.Fragment></React.Fragment>
	}


	
	useEffect(() => {
		detectHomePage()

		/* animation module */
		const scrollEventFunc = () => {
			animationElementInnerComponent(bannerRef.current)
		}
		animationElementInnerComponent(bannerRef.current)
		window.addEventListener('scroll', scrollEventFunc)

		return () => {
			window.removeEventListener('scroll', scrollEventFunc)
		}
	}, []);

	useEffect(() => {
		// detectHomePage()
		if (imgModule && isHomePage) {
			init()
			if (!navigator.userAgent.match(/Trident\/7\./)) {
				window.addEventListener('scroll', initParallax);
			}
		} else {
			window.removeEventListener('scroll', initParallax);
		}

		return () => {
			window.removeEventListener('resize', callAnimation);
			window.removeEventListener('scroll', initParallax);
		}
	}, [isHomePage, imgModule]);

	/* catch running lottie animation */
	useEffect(() => {
		if (isLottieLoad) {
			loadAni()
		}
	}, [isLottieLoad])
	return (
		<React.Fragment>
			<section className={classSection} ref={bannerRef}>
				<div className="container">
					<div className="row flex-md-row-reverse hero-text align-items-lg-center h1-big">
						<div className={classAniImg}>
							<div className={`wrap-ani-home ps-rv ${isHomePage ? 'is-home' : 'internal-wrap'}`}>
								<ImgRender img={imgModule} isHomePage={isHomePage} />
							</div>
						</div>
						<div className="col-md-6 large-paragraph last-mb-none anima-left">
							{breadcrumb && <h5>{breadcrumb}</h5>}
							<h1>{heading}</h1>
							{des &&
								<div dangerouslySetInnerHTML={renderHTML(des)}></div>
							}
							{(btn1 || btn2) &&
								<p className={`wrap-btn ${isHomePage ? '' : 'internal-btn'}`}>
									{btn1 && btn1.href &&
										<a href={btn1.href} target={btn1.target} className="text-decoration-none btn btn-primary">{btn1.text}</a>
									}
									{btn2 && btn2.href &&
										<a href={btn2.href} target={btn2.target} className="text-decoration-none btn btn-outline-primary">{btn2.text}</a>
									}
								</p>
							}
						</div>
					</div>
				</div>
			</section>
			<Spacing item={item} />
		</React.Fragment>
	);
}

export default RightOrLeftContent;


