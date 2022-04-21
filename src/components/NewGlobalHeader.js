import React, { Component } from 'react';
import { Link, graphql, StaticQuery, navigate } from 'gatsby'
import Lazyload, { forceCheck } from 'react-lazyload'
import { renderHTML } from '../agility/utils'
import Hamburger from './Newhamburger.jsx'
import Helpers from '../global/javascript/Helpers'

export default props => (
	<StaticQuery
		query={graphql`
		query NewGlobalHeaderQuery {
			agilityGlobalHeader(properties: {referenceName: {eq: "globalheader"}}) {
			  customFields {
				hideMarketingBanner
				marketingBanner
				mobileLogo {
				  label
				  url
				}
				primaryButton {
				  href
				  target
				  text
				}
				contactus {
				  href
				  target
				  text
				}
				secondaryButton {
				  href
				  target
				  text
				}
				marketingBannerButton {
				  href
				  target
				  text
				}
				stickyLogo {
				  url
				}
				logo {
				  url
				  label
				}
			  }
			  preHeaderLinks {
				customFields {
				  title
				  uRL {
					href
					target
					text
				  }
				}
			  }
			  menuStructure {
				id
				customFields {
				  subNavigation {
					referencename
				  }
				  linkorSpotlight
				  megaTitle
				  megaContent {
					referencename
				  }
				  title
				  uRL {
					href
					target
					text
				  }
				}
				subNavigation {
				  id
				  customFields {
					description
					title
					uRL {
					  href
					  target
					  text
					}
				  }
				   properties {
					itemOrder
				  }
				}
				megaContent {
				  customFields {
					title
					description
					uRL {
					  href
					  target
					  text
					}
					imageorIcon {
					  url
					  width
					  height
					}
				  }
				  properties {
					itemOrder
				  }
				}
				properties {
				  itemOrder
				}
			  }
			}
		  }


		`}
		render={queryData => {

			const navigationTopLevel = queryData.agilityGlobalHeader?.menuStructure.sort((a, b) => {
				return a.properties.itemOrder > b.properties.itemOrder ? 1 : -1
			})

			navigationTopLevel.forEach(n => {
				n.megaContent = n.megaContent.sort((a, b) => {
					return a.properties.itemOrder > b.properties.itemOrder ? 1 : -1
				})

				n.subNavigation = n.subNavigation.sort((a, b) => {
					return a.properties.itemOrder > b.properties.itemOrder ? 1 : -1
				})
			})


			const viewModel = {
				item: queryData.agilityGlobalHeader,
				menu2: navigationTopLevel
			}

			return (
				<NewGlobalHeader {...viewModel} />
			)
		}}
	/>
)

class NewGlobalHeader extends Component {
	constructor(props) {
		super(props);
		this.header = React.createRef()
		this.mainNode = React.createRef()
		this.heightHeaderBackup = React.createRef()
		this.boxMessage = React.createRef()
		this.state = {
			sticky: false,
			openMenu: false,
			pinHeader: false,
			menuLv2Opening: '',
			activeMenu: '',
			webinar: '',
			flag: false
		}
		this.stickyHeader = this.stickyHeader.bind(this)
		this.setHeightFakeHeader = this.setHeightFakeHeader.bind(this)
		this.updatePinHeader = this.updatePinHeader.bind(this)
		this.updateHeighHeaderBackup = this.updateHeighHeaderBackup.bind(this)
		this.hiddenMessage = this.hiddenMessage.bind(this)
		this.showMenuMobile = this.showMenuMobile.bind(this)
		this.removeClassOpenMenuOnHtml = this.removeClassOpenMenuOnHtml.bind(this)
		this.resizeWindow = this.resizeWindow.bind(this)
		this.scrollWindow = this.scrollWindow.bind(this)
	}
	componentDidMount() {
		this.mainNode = document.querySelector('.main-content')
		this.setState({ webinar: Helpers.getCookie('WebinarHidden') })
		this.setState({ flag: true })
		this.inputLine()
		this.hiddenSeach()
		this.removeClassOpenMenuOnHtml()
		this.clickAwebinar()
		window.addEventListener('scroll', this.scrollWindow);
		window.addEventListener('resize', this.resizeWindow);
		document.addEventListener('click', this.hiddenSeach)

		/* init active navigation item */
		let matchedNavId = null
		const pathname = window.location.pathname
		const menus = this.props.menu2

		/* Check level 1 */
		menus.map(item => {
			if (item.customFields?.uRL?.href === pathname || pathname.indexOf(item.customFields?.uRL?.href) !== -1) {
				matchedNavId = item.id
			}
			return item
		})
		/* Check level 2 after done level 1 */
		menus.map(item => {
			item.subNavigation.map(subItem => {
				if (subItem.customFields?.uRL?.href === pathname || pathname.indexOf(subItem.customFields?.uRL?.href) !== -1) {
					matchedNavId = subItem.id
				}
				return subItem
			})
			return item
		})
		this.setState({ activeMenu: matchedNavId })

		/* START hover on Nav Item level 1, smooth when move from lv1 to sub item dropdown-box */
		let timeO = null
		const isHoveringTxt = 'is-hovering'
		const listNavLv1 = this.header.querySelectorAll('.main-menu-ul > li.has-sub > a')
		/* create fake element */
		const lv1Before = document.createElement('div');
		lv1Before.classList.add('lv1-before');
		const lv1After = document.createElement('div');
		lv1After.classList.add('lv1-after');
		/* event mouse enter and mouse leave on nav lv1 */
		[...listNavLv1].map(nav => {
			nav.addEventListener('mouseenter', (event) => {
				clearTimeout(timeO)
				document.querySelector(`.${isHoveringTxt}`)?.classList.remove(isHoveringTxt);
				nav.parentNode.classList.add(isHoveringTxt)
				nav.parentNode.appendChild(lv1Before)
				nav.parentNode.appendChild(lv1After)
			})
			nav.addEventListener('mouseleave', (event) => {
				timeO = setTimeout(() => {
					document.querySelector(`.${isHoveringTxt}`)?.classList.remove(isHoveringTxt)
				}, 250);
			})
			return nav
		})
		/* END hover on Nav Item level 1 */


		if (navigator.platform.indexOf('Mac') > -1) {
			document.querySelector('html').classList.add('mac-os')
		}
		if (navigator.platform.indexOf('Win') > -1) {
			document.querySelector('html').classList.add('window-os')
		}

		this.updateHeighHeaderBackup()
	}

	componentDidUpdate(prevProps, prevState) {
		this.removeClassOpenMenuOnHtml()
		if (prevState.webinar !== this.state.webinar) {
			this.updateHeighHeaderBackup()
			this.updatePinHeader()
		}

		if (prevState.openMenu !== this.state.openMenu || prevState.menuLv2Opening !== this.state.menuLv2Opening) {
			setTimeout(() => {
				forceCheck()
			}, 300)
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeWindow)
		window.removeEventListener('scroll', this.scrollWindow)
		document.removeEventListener('click', this.hiddenSeach)
	}

	/* resize Window */
	resizeWindow() {
		this.updateHeighHeaderBackup()
		this.updatePinHeader()
	}
	/* SCROLL */
	scrollWindow() {
		this.updatePinHeader()
		this.stickyHeader()
	}

	updatePinHeader() {
		if (!this.state.pinHeader) {
			this.setState({ pinHeader: true })
		}
		this.setHeightFakeHeader()
	}

	/* update height value ò header prepare for append space */
	updateHeighHeaderBackup() {
		if (!(window.innerWidth < 1200 && this.state.openMenu)) {
			this.heightHeaderBackup = this.header.offsetHeight
		}
	}
	setHeightFakeHeader() {
		// if(!(window.innerWidth < 1200 && this.state.openMenu)) {
		// 	this.mainNode.style.paddingTop = this.header.offsetHeight + 'px'
		// 	this.heightHeaderBackup = this.header.offsetHeight
		// } else {
		this.mainNode.style.paddingTop = this.heightHeaderBackup + 'px'
		// }
	}
	stickyHeader() {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop
		if (winScroll > 1) {
			if (!this.state.sticky) {
				this.setState({
					sticky: true
				})
			}
		} else {
			if (this.state.sticky) {
				this.setState({
					sticky: false
				})
			}
		}
	}
	_handleActiveMenu(menuId) {
		this.setState({ activeMenu: menuId })
	}
	showMenuMobile() {
		const w = window.innerWidth || document.documentElement.offsetWidth

		if (w < 1200) {
			this.setState({
				openMenu: !this.state.openMenu
			})
			this.updatePinHeader()
		}
	}
	removeClassOpenMenuOnHtml() {
		const isOpenMenuText = 'is-open-menu';
		const html = document.querySelector('html')
		if (this.state.openMenu === false) {
			html.classList.remove(isOpenMenuText)
		} else {
			html.classList.add(isOpenMenuText)
		}
	}
	openMenuLv1(event) {
		if (window.innerWidth < 1200) {
			const target = event.currentTarget;
			const parentMenu = target.closest('li')
			if (this.state.menuLv2Opening !== parentMenu.dataset.pageId) {
				event.preventDefault();
				this.setState({ menuLv2Opening: parentMenu.dataset.pageId })
			} else {
				this.setState({ menuLv2Opening: '', openMenu: false })
			}
		}
	}
	clickNavArrowLv1(event) {
		if (window.innerWidth < 1200) {
			const target = event.currentTarget;
			const parentMenu = target.closest('li')
			if (this.state.menuLv2Opening !== parentMenu.dataset.pageId) {
				this.setState({ menuLv2Opening: parentMenu.dataset.pageId })
			} else {
				this.setState({ menuLv2Opening: '' })
			}
		}
	}

	setNativeValue(element, value) {
		const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set
		const prototype = Object.getPrototypeOf(element)
		const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set
		if (valueSetter && valueSetter !== prototypeValueSetter) {
			prototypeValueSetter.call(element, value)
		} else {
			valueSetter.call(element, value)
		}
	}

	inputLine() {
		const input = document.querySelectorAll('#search-page-header')[0]
		const line = document.querySelectorAll('.bind-text')[0]
		input?.addEventListener('keyup', function () {
			line.textContent = input.value
			if (input.value === '') {
				line?.classList.remove('change-text')
			} else {
				line?.classList.add('change-text')
			}
		});
	}
	clickAwebinar() {
		document.addEventListener('click', (event) => {
			const target = event.target
			if (target.classList.contains('link-line') && target.offsetParent.classList.contains('box-message')) {
				Helpers.setCookie('WebinarHidden', 'true', { path: '/' })
				this.updateHeighHeaderBackup()
				this.updatePinHeader()
			}
		})
	}
	hiddenSeach(event) {
		const group = document.querySelectorAll('.group-search')[0]
		if (group?.classList.contains('open')
			&& (!event.target.classList.contains('group-search')
				&& !event.target.closest('.group-search'))) {
			group?.classList.remove('open')
		}
	}
	showSearch() {
		const searchFrame = document.querySelectorAll('.group-search')[0];
		searchFrame?.classList.add('open')
		document.getElementById('search-page-header').focus()
	}
	hiddenMessage() {
		this.mainNode.style.paddingTop = this.heightHeaderBackup - (this.boxMessage ? this.boxMessage.offsetHeight : 0) + 'px'
		this.setState({ webinar: 'true' })
		Helpers.setCookie('WebinarHidden', 'true', { path: '/' })
		// this.setHeightFakeHeader()
	}
	render() {
		const menuGetstart = this.props.item.customFields.secondaryButton;
		const primaryButton = this.props.item.customFields.primaryButton;
		const contactButton = this.props.item.customFields.contactus;
		const marketingBannerButton = this.props.item.customFields.marketingBannerButton;
		const isOpenMenuText = 'is-open-menu';

		const renderMenu2 = (menu) => {
			const levelOneList = menu.map((menuItem) => {
				const subMenu = menuItem?.subNavigation
				const url = menuItem?.customFields?.uRL

				/* active parent menu when sub menu is active */
				let isSubMenuActive = false
				subMenu.find(item => {
					if (item.id === this.state.activeMenu) {
						isSubMenuActive = true
					}
				})
				const isActive = (this.state.activeMenu === menuItem.id || isSubMenuActive ? 'active' : '')
				return (
					<li key={menuItem.id}
						className={`d-xl-flex align-items-center ${isActive} ${subMenu?.length ? 'has-sub' : ''} ${(this.state.menuLv2Opening === menuItem.id ? 'is-open-child' : '')} `}
						onClick={!subMenu?.length ? this._handleActiveMenu.bind(this, menuItem.id) : () => { }}
						data-page-id={menuItem.id}>
						{url.href.indexOf("://") !== -1 ?
							<a href={url.href} target={url.target} onClick={subMenu?.length ? (e) => this.openMenuLv1(e) : () => { }}>{menuItem.customFields?.title || url.text}</a>
							:
							<Link to={url.href} target={url.target} onClick={subMenu?.length ? (e) => this.openMenuLv1(e) : () => { }}>{menuItem.customFields?.title || url.text}</Link>
						}

						{/* sub navigation */}
						{subMenu.length ? renderSubMenu(menuItem) : ''}
					</li>
				)
			})

			/* search layout */
			const btnMenu = <li className="d-xl-flex align-items-center box-search-header" key="btnMenu">
				{/* <div className="group-search">
					<button onClick={this.showSearch} className="open-search link-search d-flex align-items-center justify-content-center ">
						<Lazyload offset={Helpers.lazyOffset}><img src={'/images/search.svg'} className="lazy " width="25" height="25" alt="search" /></Lazyload>
					</button>
					<form onSubmit={event => {
						event.preventDefault()
						const valSearch = document.querySelectorAll('#search-page-header')[0]
						if (valSearch && valSearch.value.trim().length > 0) {
							navigate(`/search?s=${valSearch.value}`)
						} else {
							valSearch.value = ''
						}
					}}>
						<label htmlFor="search-page-header" className="sr-only">Search...</label>
						<input name="s" id="search-page-header" type="text" className="aniamtion-input " placeholder="Search.."></input>
						<span className="bind-text"></span>
						<button className="submit-search d-flex align-items-center justify-content-center" type="submit">
							<Lazyload offset={Helpers.lazyOffset}><img src={'/images/search.svg'} className="lazy " alt="search" /></Lazyload>
						</button>
					</form>
				</div> */}
				<a target={menuGetstart.target} href={menuGetstart.href} className="text-decoration-none btn btn-outline-primary pin btn-menu btn-pin ">{menuGetstart.text}</a>
				{contactButton?.href && contactButton?.text &&
					<a target={contactButton.target} href={contactButton.href} className="text-decoration-none btn btn-primary btn-menu btn-menu-v2 d-sm-none d-xl-block">{contactButton.text}</a>
				}
			</li>

			levelOneList.push(btnMenu)
			return levelOneList
		}

		const renderSubMenu = (menuItem) => {
			const subMenu = menuItem?.subNavigation
			const megaContent = menuItem?.megaContent
			const megaTitle = menuItem?.customFields?.megaTitle
			const linkOrSpotlight = menuItem?.customFields?.linkorSpotlight
			const hasMegaMenuContent = megaContent?.length

			return (
				<>
					<div className="nav-item-arrows arrows-lv1 d-xl-none" onClick={(e) => this.clickNavArrowLv1(e)}>
						<i className="icomoon icon-down-menu" aria-hidden="true"></i>
					</div>
					<div className={`dropdown-menu main-menu-dropdown ${hasMegaMenuContent ? 'has-mega-content' : ''}`}>
						<div className={`dr-navi-col`}>
							<ul className="list-inline">
								{subMenu.map((subMenuItem, index) => {
									const url = subMenuItem.customFields?.uRL
									const isActive = this.state.activeMenu === subMenuItem.id ? 'active' : ''
									return (
										<li key={`child-${index}`} className={`d-xl-flex align-items-center ${isActive}`}>
											{url?.href.indexOf("://") !== -1 ?
												<a href={url?.href} target={url?.target}>{url?.text || subMenuItem.customFields?.title}</a>
												:
												<Link to={url?.href} target={url?.target}>{url?.text || subMenuItem.customFields?.title}</Link>
											}
										</li>
									)
								})}
							</ul>
						</div>
						{hasMegaMenuContent ? (
							<div className="dr-navi-col">
								{megaMenuContent(megaContent, megaTitle, linkOrSpotlight)}
							</div>
						) : ""}
					</div>
				</>

			)
		}

		const megaMenuContent = (megaContent, megaTitle, linkOrSpotlight) => {
			const isSpotlight = linkOrSpotlight === 'Spotlight' // Spotlight - Link

			const renderMegaContent = megaContent.map((content, index) => {
				const customFields = content.customFields
				const url = customFields?.uRL
				const image = { ...customFields?.imageorIcon, alt: customFields?.title }
				return (
					<div key={'mega-' + index} className={`mega-content-item ps-rv last-mb-none`}>
						{url &&
							<Link to={url?.href} target={url?.target} className="ps-as" />
						}
						{/* is Spotlight Type */}
						{isSpotlight &&
							<>
								{image &&
									<div className="spotlight-thumb">
										<Lazyload offset={Helpers.lazyOffset}><img src={image.url + '?w=236'} className="lazy" alt={customFields?.title || customFields?.description} /></Lazyload>
									</div>
								}
								{customFields?.title &&
									<h6>{customFields?.title}</h6>
								}
							</>
						}
						{/* is Link Type */}
						{!isSpotlight &&
							<>
								{image &&
									<div className="mega-link-logo">
										<Lazyload offset={Helpers.lazyOffset}><img src={image.url} className="lazy" alt={customFields?.title || customFields?.description} /></Lazyload>
									</div>
								}
								{(customFields?.title || customFields?.description) &&
									<div className="flex-grow-1 last-mb-none">
										{customFields?.title &&
											<h6>{customFields?.title}</h6>
										}
										{customFields?.description &&
											<p>{customFields?.description}</p>
										}
									</div>
								}
							</>
						}

					</div>
				)
			})

			return (
				<div className={`mega-content last-mb-none ${isSpotlight ? 'is-spotlight' : 'is-link'}`}>
					{megaTitle &&
						<h5>{megaTitle}</h5>
					}
					{renderMegaContent}
				</div>
			)
		}

		const item = this.props.item.customFields;
		const classMainMenu = `navbar-collapse main-menu menu-header-right ${this.state.openMenu === true ? isOpenMenuText : ''}`
		return (
			<React.Fragment>
				<header id="header" className={`module header ${this.state.sticky === true ? 'pin-header' : 'unpin-header'}  ${this.state.openMenu === true ? isOpenMenuText : ''} ${this.state.pinHeader === true ? 'pos-fixed' : ''}`} ref={reference => (this.header = reference)}>
					{(item.hideMarketingBanner !== 'true') && item.marketingBanner && item.marketingBanner.length > 0 && this.state.webinar !== 'true' &&
						<div className={`box-message text-white d-none d-xl-flex align-items-center`} ref={this.boxMessage}>
							<div className="container last-mb-none">
								{/* <div className="close-message d-none" onClick={this.hiddenMessage}></div> */}
								<div className="row">
									<div className="col-7 col-xl-8">
										<div className="last-mb-none" dangerouslySetInnerHTML={renderHTML(item.marketingBanner)} />
									</div>
									<div className="col-5 col-xl-4 text-right d-flex align-items-center justify-content-end">
										<a className="d-inline-block flash-btn" href={primaryButton.href} target={primaryButton.target}>{primaryButton.text}</a>
										<a className="d-inline-block flash-btn" href={marketingBannerButton?.href} target={marketingBannerButton?.target}>{marketingBannerButton?.text}</a>
									</div>
								</div>
							</div>
						</div>
					}
					<nav className="container navbar navbar-expand-xl">
						<div className="container header-mobile mx-auto row align-items-center justify-content-between flex-wrap">
							{item.logo ?
								<div className="col-9 col-md-6 col-xl-12">
									<Link to="/" id="header-logo" title={item.logo.label} className="navbar-brand header-logo w-100">
										<img src={item.stickyLogo.url} alt={item.logo.label} width="158" height="40" className="w-100" loading="lazy" />
									</Link>
								</div>
								:
								''
							}
							<div className="col-3 col-md-6 text-right d-xl-none d-flex justify-content-end align-items-center">
								{contactButton?.href && contactButton?.text &&
									<a target={contactButton.target} href={contactButton.href} className="text-decoration-none btn btn-primary btn-menu btn-menu-v2 d-none d-md-block">{contactButton.text}</a>
								}
								<Hamburger showMenuMobile={() => this.showMenuMobile()} />
							</div>
						</div>
						<div className={classMainMenu} id="main-menu" data-module="menu">
							<div className={`container`}>
								<ul className="main-menu-ul navbar-nav mx-auto justify-content-end list-inline ">
									{renderMenu2(this.props.menu2)}
								</ul>

								<div className="box-mess-mb ps-rv text-white text-center d-xl-none">
									<a className="d-block flash-btn" style={{marginBottom: 5}} href={marketingBannerButton?.href} target={marketingBannerButton?.target}>{marketingBannerButton?.text}</a>
									<a className="d-block flash-btn" href={primaryButton?.href} target={primaryButton?.target}>{primaryButton?.text}</a>
								</div>
							</div>
						</div>
					</nav>
				</header>
			</React.Fragment>
		);
	}
}
