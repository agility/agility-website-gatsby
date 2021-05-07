import React, {useEffect, useRef, useState} from 'react';
import { renderHTML } from '../agility/utils'
import './NewIntegrationModule.scss'
import Helpers from '../global/javascript/Helpers'
import Lazyload from 'react-lazyload'
import Spacing from './Spacing'
import { animationElementInnerComponent } from '../global/javascript/animation'

const NewIntegrationModule = ({ item }) => {
	const heading = item.customFields.title
	const des = item.customFields.description
	const breadcrumb = item.customFields.breadcrumb
	const btn1 = item.customFields.cTA1Optional
	const btn2 = item.customFields.cTA2Optional
	const classSection = `module mod-banner NewIntegrationModule animation ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white has-btn-white': ''}`
	const array = []
	const [isHomePage, setIsHomePage] = useState(false);
	const [classWrap, setClassWrap] = useState('wrap-ani-home ps-rv internal-wrap');
  const [classBtn, setClassBtn] = useState('wrap-btn internal-btn');
  // console.log('NewIntegrationModule', item)
	let classAniImg = 'col-lg-6 col-right-lr'
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

  const listPartners = item.customFields.integrationPartners.map(partners => {
    const customField = partners.customFields
    const customUrl = '/partners/integrations/'+customField.uRL
    if (customField.partnerLogo.url) {
      return (
        <div className="col-6 text-center" key={'logo-' + partners.contentID}>
           <div className="item-logo-partners bg-white ps-rv" key={'logo-' + partners.contentID}>
             <a href={customUrl} className='ps-as'></a>
						 <Lazyload offset={ Helpers.lazyOffset }><img className='img-logo-partners' src={customField.partnerLogo.url} alt={customField.partnerLogo.label}></img></Lazyload>
          </div>
        </div>
      )
    }
    return null
  })

	// const init = () => {
	// 	callAnimation()
	// 	window.addEventListener('resize', callAnimation);
	// }
	// const callAnimation = () => {
	// 	let banner = document.getElementsByClassName('mod-banner')
	// 	let inter,inter2
	// 	if (banner.length && window.innerWidth >= 1200 && !banner[0].classList.contains('done-ani')) {
	// 		inter2 = setInterval(() => {
	// 			if(window.lottie) {
	// 				loadAni()
	// 				clearInterval(inter2)
	// 			}
	// 		}, 5);
	// 		inter = setInterval(() => {
	// 			if(banner.length > 0 && banner[0] && banner[0].classList.contains('set-animation')) {
	// 				clearInterval(inter)
	// 				callLotie()
	// 			}
	// 		}, 5);
	// 	}
	// }
	// const loadAni = () => {
	// 	let temp = 0
	// 	Array.from(document.querySelectorAll('.ani-banner')).forEach((item,index) => {
	// 		array[index] = window.lottie.loadAnimation({
	// 			container: item,
	// 			renderer: 'svg',
	// 			loop: false,
	// 			autoplay: false,
	// 			path:  `/js/layer_${index}.json`
	// 		})
	// 		if(index === 2 || index === 3) {
	// 			array[index].addEventListener('loaded_images', function (e) {
	// 				temp++
	// 				if (temp === 2) {
	// 					document.getElementsByClassName('mod-banner')[0].classList.add('done-ani')
	// 				}
	// 			})
	// 		}
	// 	})
	// }
	// const callLotie = () => {
	// 	setTimeout(() => {
	// 		array.forEach(element => element.play());
	// 	}, 400)
	// 	setTimeout(() => {
	// 		document.getElementsByClassName('mod-banner')[0].classList.remove('done-ani')
	// 	}, 1000)
	// }
	// const initParallax = () => {
	// 	if (document.getElementsByClassName('ani-banner').length) {
	// 		parallaxBanner()
	// 	}
	// }
	// const parallaxBanner = () => {
	// 	const doc = document.documentElement;
	// 	const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	// 	const item0 = document.getElementsByClassName('ani-banner')[0]
	// 	const item1 = document.getElementsByClassName('ani-banner')[1]
	// 	const item2 = document.getElementsByClassName('ani-banner')[2]
	// 	const item3 = document.getElementsByClassName('ani-banner')[3]
	// 	const item4 = document.getElementsByClassName('ani-banner')[4]
	// 	item0.style.transform =  'translateY(' + -(top / 6) + 'px)'
	// 	item1.style.transform = 'translateY(' + -(top / 5) + 'px)'
	// 	item2.style.transform = 'translateY(' + -(top / 3) + 'px)'
	// 	item3.style.transform = 'translateY(' + -(top / 2.3) + 'px)'
	// 	item4.style.transform = 'translateY(' + -(top / 3.5) + 'px)'
	// }
	const NoImg = () => {
		if (isHomePage) {
			return (
				<React.Fragment>
					<img src="/images/homepage-illustration.png" alt="image video" className="img-mb" />
					<div className="d-none d-xl-block">
						<div className="ani-banner"></div>
						<div className="ani-banner"></div>
						<div className="ani-banner"></div>
						<div className="ani-banner item-bg"></div>
						<div className="ani-banner"></div>
						<img className='d-none' src="/images/ani-banner/img_0.png" alt="image video" />
						<img className='d-none' src="/images/ani-banner/img_1.png" alt="image video" />
					</div>
				</React.Fragment>
			)
		}
		return <React.Fragment></React.Fragment>
	}
	const setHeightLogo = () => {
		let h = 0
		let length = 0
		if(module.length > 0) {
			let module = document.querySelectorAll('.NewIntegrationModule ')
			let logo = module[0].querySelectorAll('.item-logo-partners')
			Array.from(logo).forEach((ele) => {
				let image = ele.querySelectorAll('.img-logo-partners')
				length = image.length
				if (length) {
					if ( h < image[0].offsetHeight + 20) {
						h = image[0].offsetHeight + 20
					}
				}
			})
			Array.from(logo).forEach((ele) => {
				if(length > 0 &&  h > 80) {
					ele.style.height = h + 'px'
					module.classList.add('height-done')
				}
			})
		}
	}
	const ScrollSetHeight = () => {
		window.addEventListener('scroll', () => {
			let module = document.querySelectorAll('.NewIntegrationModule')
			if (module.length > 0 && !module[0].classList.contains('height-done')) {
				setHeightLogo()
			}
		});
	} 
	useEffect(() => {
		detectHomePage()
		setHeightLogo()
		ScrollSetHeight()
		window.addEventListener('resize', setHeightLogo);
		// if (!imgModule && isHomePage) {
		// 	// init()
		// 	if(!navigator.userAgent.match(/Trident\/7\./)) {
		// 		window.addEventListener('scroll', initParallax);
		// 	}
		// }
		return () => {
			window.removeEventListener('resize', setHeightLogo);
		}
  });

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
			<section className={classSection} ref={ thisModuleRef }>
				<div className="container">
					<div className="row flex-md-row-reverse hero-text align-items-lg-center h1-big">
						<div className={classAniImg}>
							<div className={classWrap}>
								<div className="row row-5">
                 {listPartners}
                </div>
							</div>
						</div>
						<div className="col-lg-6 large-paragraph last-mb-none anima-left">
							{breadcrumb && <h5>{breadcrumb}</h5> }
							{heading && <h2 className='h1'>{heading}</h2> }
							{ des &&
								<div dangerouslySetInnerHTML={renderHTML(des)}></div>
							}
							{ (btn1 || btn2) &&
								<p className={classBtn}>
									{ btn1 && btn1.href &&
										<a href={btn1.href} target={btn1.target} className="text-decoration-none btn btn-outline-primary">{btn1.text}</a>
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

export default NewIntegrationModule;


