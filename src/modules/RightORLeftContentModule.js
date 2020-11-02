import React, {useEffect, useState} from 'react';
import { renderHTML } from '../agility/utils'
import './RightORLeftContentModule.scss'
import Spacing from './Spacing'
const RightOrLeftContent = ({ item }) => {
	const heading = item.customFields.title
	const des = item.customFields.description
	const breadcrumb = item.customFields.breadcrumb
	const btn1 = item.customFields.cTA1Optional
	const btn2 = item.customFields.cTA2Optional
	const classSection = `module mod-banner right-or-left-content animation ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white has-btn-white': ''}`
	let array = []
	const [isHomePage, setIsHomePage] = useState(false);
	const [classWrap, setClassWrap] = useState('wrap-ani-home ps-rv internal-wrap');
	const [classBtn, setClassBtn] = useState('wrap-btn internal-btn');
	let classAniImg = 'col-md-6 col-right-lr'
	let imgModule
	if (item.customFields.graphic && item.customFields.graphic.url) {
		imgModule = item.customFields.graphic
	} else {
		classAniImg = classAniImg + ' anima-right'
	}
	const detectHomePage = () => {
		if(typeof window !== `undefined`) {
			const detectHome = ['/new-home', '/new-home/', '/'].includes(window.location.pathname)
			setIsHomePage(detectHome)
			if (isHomePage) {
				setClassWrap('wrap-ani-home ps-rv')
				setClassBtn('wrap-btn')
			}
		}
	}
	const appenLottie = () => {
		const script = document.createElement("script");
		script.src = "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.5.7/lottie_light_html.min.js";
		script.async = true;
		document.body.appendChild(script);
	}
	const init = () => {
		callAnimation()
		window.addEventListener('resize', callAnimation);
	}
	const callAnimation = () => {
		let banner = document.getElementsByClassName('mod-banner')
		let inter,inter2
		if (banner.length && window.innerWidth >= 1025 && !banner[0].classList.contains('done-ani') && !banner[0].classList.contains('banner-runing')) {
			banner[0].classList.add('banner-runing')
			if (!banner[0].classList.contains('appen-lottie')) {
				appenLottie()
				banner[0].classList.add('appen-lottie')
			}
			inter2 = setInterval(() => {
				if(window.lottie) {
					loadAni()
					clearInterval(inter2)
				}
			}, 5);
			inter = setInterval(() => {
				if(banner.length > 0 && banner[0] && banner[0].classList.contains('set-animation')) {
					clearInterval(inter)
					callLotie()
				}
			}, 5);
		}
	}
	const loadAni = () => {
		let temp = 0
		array = []
		Array.from(document.querySelectorAll('.ani-banner')).forEach((item,index) => {
			array[index] = window.lottie.loadAnimation({
				container: item,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				path:  `/js/layer_${index}.json`
			})
			if(index === 2 || index === 3) {
				array[index].addEventListener('loaded_images', function (e) {
					temp++
					if (temp === 2) {
						document.getElementsByClassName('mod-banner')[0].classList.add('done-ani')
					}
				})
			}
		})
	}
	const callLotie = () => {
		setTimeout(() => {
			array.forEach(element => element.play());
		}, 400)
		setTimeout(() => {
			let banner = document.getElementsByClassName('mod-banner')
			if(banner.length) {
				banner[0].classList.remove('banner-runing')
			}
		}, 4000)
	}
	const initParallax = () => {
		if (document.getElementsByClassName('ani-banner').length) {
			parallaxBanner()
		}
	}
	const parallaxBanner = () => {
		const doc = document.documentElement;
		const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
		const item0 = document.getElementsByClassName('ani-banner')[0]
		const item1 = document.getElementsByClassName('ani-banner')[1]
		const item2 = document.getElementsByClassName('ani-banner')[2]
		const item3 = document.getElementsByClassName('ani-banner')[3]
		const item4 = document.getElementsByClassName('ani-banner')[4]
		item0.style.transform =  'translateY(' + -(top / 6) + 'px)'
		item1.style.transform = 'translateY(' + -(top / 5) + 'px)'
		item2.style.transform = 'translateY(' + -(top / 3) + 'px)'
		item3.style.transform = 'translateY(' + -(top / 2.3) + 'px)'
		item4.style.transform = 'translateY(' + -(top / 3.5) + 'px)'
	}
	const NoImg = () => {
		return <React.Fragment></React.Fragment>
	}
	const HasImg = ({img}) => {
		if (isHomePage) {
			return (
				<React.Fragment>
					<img src={img.url} alt={ img.label ? img.label : 'image video' } className="img-mb"  />
					<div className="wrap-ani">
						<div className="ani-banner"></div>
						<div className="ani-banner"></div>
						<div className="ani-banner"></div>
						<div className="ani-banner item-bg"></div>
						<div className="ani-banner"></div>
					</div>
				</React.Fragment>
			)
		}
		return (
			<img src={img.url} className="anima-right" alt={ img.label ? img.label : 'image video' } />
		)
	}
	useEffect(() => {
		detectHomePage()
		if (imgModule && isHomePage) {
			init()
			if(!navigator.userAgent.match(/Trident\/7\./)) {
				window.addEventListener('scroll', initParallax);
			}
		}
  });
	return (
		<React.Fragment>
			<section className={classSection}>
				<div className="container">
					<div className="row flex-md-row-reverse hero-text align-items-lg-center h1-big">
						<div className={classAniImg}>
							<div className={classWrap}>
								{ imgModule ? <HasImg img={imgModule}/> : <NoImg /> }
							</div>
						</div>
						<div className="col-md-6 large-paragraph last-mb-none anima-left">
							{breadcrumb && <h5>{breadcrumb}</h5> }
							{heading && <h1>{heading}</h1> }
							{ des &&
								<div dangerouslySetInnerHTML={renderHTML(des)}></div>
							}
							{ (btn1 || btn2) &&
								<p className={classBtn}>
									{ btn1 && btn1.href &&
										<a href={btn1.href} target={btn1.target} className="text-decoration-none btn btn-primary">{btn1.text}</a>
									}
									{ btn2 && btn2.href &&
										<a href={btn2.href} target={btn2.target} className="text-decoration-none btn btn-outline-primary">{btn2.text}</a>
									}
								</p>
							}
						</div>
					</div>
				</div>
			</section>
			<Spacing item={item}/>
		</React.Fragment>
	);
}

export default RightOrLeftContent;


