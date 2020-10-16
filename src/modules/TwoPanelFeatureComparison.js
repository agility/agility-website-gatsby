import React, {useEffect } from 'react';
import { graphql, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'
import './TwoPanelFeatureComparison.scss'
import Spacing from './Spacing'
import Lazyload from 'react-lazyload'

export default props => (
<StaticQuery
		query={graphql`
			query agilityPanelItemQuery {
				allAgilityPanelItem(sort: {fields: properties___itemOrder}) {
					nodes {
						customFields {
							title
							graphicLocation
							description
							checkedItems_ValueField
							checkedItems {
								referencename
							}
							graphic {
								url
							}
						}
						properties {
							referenceName
							itemOrder
						}
						itemID
					}
				}
				allAgilityFeatureListItem(sort: {fields: properties___itemOrder}) {
					nodes {
						itemID
						customFields {
							title
							textblob
							moreInfoLink {
								href
								target
								text
							}
						}
						properties {
							itemOrder
							referenceName
						}
					}
				}
			}
		`}
		render={queryData => {
			const customFieldsQuery = props.item.customFields
			const referenceGroup1Panels = customFieldsQuery.group1Panels.referencename
			const referenceGroup2Panels = customFieldsQuery.group2Panels.referencename
			let listPanelItems1 = queryData.allAgilityPanelItem.nodes.filter(obj => {
				return obj.properties.referenceName === referenceGroup1Panels
			})
			listPanelItems1 = listPanelItems1.map(obj => {
				const panelItem = Object.assign({}, obj)
				if (panelItem.customFields['checkedItems_ValueField']) {
					const checkItem = panelItem.customFields['checkedItems_ValueField'].split(',')
					const listChecked = queryData.allAgilityFeatureListItem.nodes.filter((checked) => {
						return checkItem.includes(String(checked.itemID))
					})
					panelItem.checkedItems = listChecked
					return panelItem
				}
				return panelItem
			})
			let listPanelItems2 = queryData.allAgilityPanelItem.nodes.filter(obj => {
				return obj.properties.referenceName === referenceGroup2Panels
			})
			listPanelItems2 = listPanelItems2.map(obj => {
				const panelItem = Object.assign({}, obj)
				if (panelItem.customFields['checkedItems_ValueField']) {
					const checkItem = panelItem.customFields['checkedItems_ValueField'].split(',')
					const listChecked = queryData.allAgilityFeatureListItem.nodes.filter((checked) => {
						return checkItem.includes(String(checked.itemID))
					})
					panelItem.checkedItems = listChecked
					return panelItem
				}
				return panelItem
			})
			const dataQuery = {
				listPanelItems1,
				listPanelItems2
			}
			const viewModel = {
				item: props.item,
				dataQuery
			}
			return (
				<TwoPanelFeatureComparison {...viewModel} />
			);
		}}
	/>
)

const TwoPanelFeatureComparison = ({ item, dataQuery }) => {
	
	const classSection = `TwoPanelFeatureComparison module mod-feature ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode': ''}`
	const title1 = item.customFields.group1Title
	const title2 = item.customFields.group2Title
	console.log('dataQuery', dataQuery)
	console.log("TwoPanelFeatureComparison", item)
	const groupPanels1 = dataQuery.listPanelItems1.map((panel, index) => {
		const listCheckItem = panel.checkedItems ? panel.checkedItems.map(checkItem => {
			const fieldCheck = checkItem.customFields
			const classLi = fieldCheck.moreInfoLink && fieldCheck.moreInfoLink.href.length > 0  ? 'has-hover': ''
			return (
				<li className={classLi} key={checkItem.itemID}>
					{ fieldCheck.title }
					{ fieldCheck.moreInfoLink && fieldCheck.moreInfoLink.href.length > 0 &&
						<a href={fieldCheck.moreInfoLink.href} target={fieldCheck.moreInfoLink.target} className="ps-as"><span className="sr-only">{fieldCheck.moreInfoLink.text}</span></a>
					}
				</li>
			)
		}) : []
		const classImage = `col-md-6 box-pin ${panel.customFields.graphicLocation === 'right' ? 'order-md-2 anima-right': 'anima-left'}`
		let img1 = '../images/marketing-1.png'
		let img2 = '../images/trig-bg-2.png'
		if (index === 1) {
			img1='../images/marketing-2.png'
			img2='../images/marketing-trig-2.png'
		}
		if (index === 2 ) {
			img1='../images/marketing-3.png'
			img2='../images/marketing-trig-3.png'
		}
		const ImgNoParallax = () => {
			if (panel.customFields.graphic && panel.customFields.graphic.url) {
				return (
					<img src={panel.customFields.graphic.url} alt={panel.customFields.title}></img>
				)
			}
			return null
		}
		const ImgParallax = () => {
			return (
				<React.Fragment>
					<Lazyload><img src={img1} className="primary-img" alt={panel.customFields.title}></img></Lazyload>
					<Lazyload><img className="bg-parallax" src={img2} alt={panel.customFields.title}></img></Lazyload>
				</React.Fragment>
			)
		}
		return (
			<div className="item-feature row animation" key={panel.itemID}>
				<div className={classImage}>
					<div className='wrap-img'>
						{index > 2 ? <ImgNoParallax /> : <ImgParallax />}
					</div>
				</div>
				<div className="col-md-6 last-mb-none wrap-content-feature anima-left">
					{ panel.customFields.title &&
						<h2>{panel.customFields.title}</h2>
					}
					{
						panel.customFields.description &&
						<div dangerouslySetInnerHTML={renderHTML(panel.customFields.description)}></div>
					}
					{listCheckItem.length > 0 &&
						<ul className="list-url small-paragraph">
							{listCheckItem}
						</ul>
					}
				</div>
			</div>
		)
	})
	const groupPanels2 = dataQuery.listPanelItems2.map((panel,index) => {
		const listCheckItem = panel.checkedItems ? panel.checkedItems.map(checkItem => {
			const fieldCheck = checkItem.customFields
			const classLi = fieldCheck.moreInfoLink && fieldCheck.moreInfoLink.href.length > 0  ? 'has-hover': ''
			return (
				<li className={classLi} key={checkItem.itemID}>
					{ fieldCheck.title }
					{ fieldCheck.moreInfoLink && fieldCheck.moreInfoLink.href.length > 0 &&
						<a href={fieldCheck.moreInfoLink.href} target={fieldCheck.moreInfoLink.target} className="ps-as"><span className="sr-only">{fieldCheck.moreInfoLink.text}</span></a>
					}
				</li>
			)
		}) : []
		const classImage = `col-md-6 box-pin ${panel.customFields.graphicLocation === 'right' ? 'anima-left': 'anima-right'}`
		let img1 = '../images/image.png'
		let img2 = '../images/image-tri.png'
		// console.log(index)
		if (index === 1) {
			img1='../images/image2.png'
			img2='../images/image2-tri.png'
		}
		if (index === 2 ) {
			img1='../images/image3.png'
			img2='../images/image3-trig.png'
		}
		const ImgNoParallax = () => {
			if (panel.customFields.graphic && panel.customFields.graphic.url) {
				return (
					<img src={panel.customFields.graphic.url} alt={panel.customFields.title}></img>
				)
			}
			return <React.Fragment></React.Fragment>
		}
		const ImgParallax = () => {
			return (
				<React.Fragment>
					<Lazyload><img src={img1} className="primary-img" alt={panel.customFields.title}></img></Lazyload>
					<Lazyload><img className="bg-parallax" src={img2} alt={panel.customFields.title}></img></Lazyload>
				</React.Fragment>
			)
		}
		return (
			<div className="item-feature row animation" key={panel.itemID}>
				<div className={classImage}>
					<div className='wrap-img wrap-img2'>
						{index > 2 ? <ImgNoParallax /> : <ImgParallax /> }
					</div>
				</div>
				<div className="col-md-6 last-mb-none wrap-content-feature anima-right">
					{ panel.customFields.title &&
						<h2>{panel.customFields.title}</h2>
					}
					{
						panel.customFields.description &&
						<div dangerouslySetInnerHTML={renderHTML(panel.customFields.description)}></div>
					}
					{listCheckItem.length > 0 &&
						<ul className="list-url small-paragraph">
							{listCheckItem}
						</ul>
					}
				</div>
			</div>
		)
	})
	const smoothScroll = (el, to, duration) => {
		let scrollToTimerCache
		const doc = document.documentElement;
		let scroll = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
    if (duration < 0) {
      return false
    }
    let difference = to - scroll
    let perTick = difference / duration * 10
    scrollToTimerCache = setTimeout(() => {
      clearTimeout(scrollToTimerCache)
      if (!isNaN(parseInt(perTick, 10))) {
        window.scrollTo(0, scroll + perTick)
        smoothScroll(el, to, duration - 10)
      }
    }, 10)
  }
	const checkActive = () => {
		const header = document.getElementsByClassName('header')[0]
		let darkTheme = document.getElementsByClassName('develop-section')[0]
		window.addEventListener('scroll', function(e) {
			if (window.innerWidth >= 992) {
				let title = document.getElementsByClassName('title-feature')[0]
				const doc = document.documentElement;
				let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
				const section = document.getElementsByClassName('mod-feature')[0]
				let moduleTop = section.offsetTop - header.offsetHeight
				let limit = moduleTop + section.offsetHeight + title.offsetHeight
				if (top > moduleTop && top < limit) {
					title.classList.add('fixed')
					title.style.top = header.offsetHeight + 'px'
				} else {
					title.classList.remove('fixed')
					title.style.top = 'auto'
				}
				if(darkTheme){
					if (top + header.offsetHeight + title.offsetHeight > darkTheme.offsetTop) {
						title.classList.add('active-tab2')
					} else {
						title.classList.remove('active-tab2')
					}
				}
			}
		})
		document.getElementsByClassName('features-tab1')[0].addEventListener('click', () => {
			let top = document.getElementsByClassName('marketing-section')[0].offsetTop
			//fix scroll in IE
			if(navigator.userAgent.match(/Trident\/7\./) || /Edge/.test(navigator.userAgent)) {
				smoothScroll(window,top - 79 - 1,300)
			} else {
				window.scroll({
					top: top - 79,
					behavior: 'smooth'
				});
			}
		})
		if(darkTheme){
			document.getElementsByClassName('features-tab2')[0].addEventListener('click', () => {
				//fix scroll in IE
				if(navigator.userAgent.match(/Trident\/7\./) || /Edge/.test(navigator.userAgent)) {
					smoothScroll(window,darkTheme.offsetTop - 79 - 1,300)
				} else {
					window.scroll({
						top: darkTheme.offsetTop - 79 - 1,
						behavior: 'smooth'
					});
				}
			})
		}
	}

	const caculatePin = ($this) => {
		const serviceLeft = $this.querySelector('.wrap-img')
		const serviceRight = $this.querySelector('.wrap-content-feature')
		const $header = document.getElementsByClassName('header')[0]
		const doc = document.documentElement;
		let offsetPin
		let rootOffset
		let header
		let trigger
		let topAdd = 100
		if (window.innerWidth < 1200) {
			topAdd = 50
		}
		const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
		rootOffset = $this.offsetTop - topAdd
		header = $header.offsetHeight
		offsetPin = document.getElementsByClassName('title-feature')[0].offsetHeight
		trigger = top + header + offsetPin
		let difference = top + header + 47 - serviceRight.offsetTop
		if (serviceLeft.offsetHeight + 50 < serviceLeft.parentElement.parentElement.offsetHeight && trigger > rootOffset && serviceLeft.querySelectorAll('.bg-parallax').length) {
			serviceLeft.querySelectorAll('.bg-parallax')[0].style.transform = 'translateY(' + -(difference / 10) + 'px) translateX(-50%)'
			serviceLeft.querySelectorAll('.primary-img')[0].style.transform = 'translateY(' + -(difference / 3) + 'px)'
		}
		return true
	}
	const pinImg = () => {
		setTimeout(() => {
			Array.from(document.querySelectorAll('.item-feature')).forEach( ($this,i) => {
				window.addEventListener('scroll', () => {
					caculatePin($this)
				})
			})
		}, 2000)
	}

	useEffect(() => {
		checkActive()
		pinImg()
  });
	return (
		<React.Fragment>
			<section className={classSection}>
				<div className="title-feature fix-item animation">
					<div className="container">
						<div className="row align-items-center">
							{title1 &&
								<div className="col-lg-6 text-center last-mb-none text-lg-left features-tab features-tab1 anima-left">
									<h4>{title1}</h4>
								</div>
							}
							{ title2 &&
								<div className="col-lg-6 text-center last-mb-none text-lg-right d-none d-lg-block features-tab features-tab2 anima-right">
									<h4>{title2}</h4>
								</div>
							}
						</div>
					</div>
				</div>
				{ groupPanels1.length > 0 &&
					<div className="marketing-section section-lv2">
						<div className="container">
							{groupPanels1}
						</div>
					</div>
				}
				{ title2 &&
					<div className="title-feature ps-rv d-lg-none dark-theme">
						<div className="container">
							<div className="row align-items-center">
								<div className="col-lg-6 text-center last-mb-none features-tab features-tab2">
									<h4>{title2}</h4>
								</div>
							</div>
						</div>
					</div>
				}
				{ groupPanels2.length > 0 &&
					<div className="develop-section section-lv2 dark-theme  text-white">
						<div className="container">
							{groupPanels2}
						</div>
					</div>
				}
			</section>
			<Spacing item={item}/>
		</React.Fragment>
	);
}
