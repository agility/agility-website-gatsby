import React, { Component } from 'react';
import { Link, graphql, StaticQuery, navigate } from 'gatsby'
import Lazyload from 'react-lazyload'
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
				}
				agilitynestedsitemap {
					internal {
						content
					}
				}
			}
		`}
		render={queryData => {
			const nestedSitemapJSON = queryData.agilitynestedsitemap.internal.content
			const nestSitemap = JSON.parse(nestedSitemapJSON).nodes
			const viewModel = {
				item: queryData.agilityGlobalHeader,
				menu: nestSitemap.filter(node => {
					return node.visible.menu
				})
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
		this.setState({activeMenu: window.location.pathname})
		this.setState({webinar: Helpers.getCookie('WebinarHidden')})
		this.setState({flag: true})
		this.inputLine()
		this.hiddenSeach()
		this.removeClassOpenMenuOnHtml()
		this.clickAwebinar()
		window.addEventListener('scroll', this.scrollWindow);
		window.addEventListener('resize', this.resizeWindow);

		if (navigator.platform.indexOf('Mac') > -1) {
			document.querySelector('html').classList.add('mac-os')
		}
		if (navigator.platform.indexOf('Win') > -1) {
			document.querySelector('html').classList.add('window-os')
		}

		this.updateHeighHeaderBackup()
		// this.setState({ pinHeader: true })
		// this.setHeightFakeHeader()
	}

	componentDidUpdate(prevProps, prevState) {
		this.removeClassOpenMenuOnHtml()
		if (prevState.webinar !== this.state.webinar) {
			this.updateHeighHeaderBackup()
			this.updatePinHeader()
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeWindow)
		window.removeEventListener('scroll', this.scrollWindow)
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
		this.setState({ pinHeader: true })
		this.setHeightFakeHeader()
	}

	/* update height value ò header prepare for append space */
	updateHeighHeaderBackup() {
		if(!(window.innerWidth < 992 && this.state.openMenu)) {
			this.heightHeaderBackup = this.header.offsetHeight
		}
	}
	setHeightFakeHeader() {
		// if(!(window.innerWidth < 992 && this.state.openMenu)) {
		// 	this.mainNode.style.paddingTop = this.header.offsetHeight + 'px'
		// 	this.heightHeaderBackup = this.header.offsetHeight
		// } else {
			this.mainNode.style.paddingTop = this.heightHeaderBackup + 'px'
		// }
	}
	stickyHeader () {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop
		if(winScroll > 1) {
			this.setState({
				sticky: true
			})
		} else {
			this.setState({
				sticky: false
			})
		}
	}
	_handleActiveMenu(menuItem) {
		this.setState({activeMenu: menuItem})
	}
	showMenuMobile () {
		const w = window.innerWidth || document.documentElement.offsetWidth

		if (w < 992) {
			this.setState({
				openMenu: !this.state.openMenu
			})
			this.updatePinHeader()

			// this.removeClassOpenMenuOnHtml()
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
		if(window.innerWidth < 992) {
			const target = event.currentTarget;
			const parentMenu = target.closest('li')
			if (this.state.menuLv2Opening !== parentMenu.dataset.pageId) {
				event.preventDefault();
				this.setState({	menuLv2Opening: parentMenu.dataset.pageId})
			} else {
				this.setState({	menuLv2Opening: '', openMenu: false})
			}
		}
	}
	clickNavArrowLv1(event) {
		if(window.innerWidth < 992) {
			const target = event.currentTarget;
			const parentMenu = target.closest('li')
			if (this.state.menuLv2Opening !== parentMenu.dataset.pageId) {
				this.setState({	menuLv2Opening: parentMenu.dataset.pageId})
			} else {
				this.setState({	menuLv2Opening: ''})
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

	inputLine () {
		const input = document.querySelectorAll('#search-page-header')[0]
		const line = document.querySelectorAll('.bind-text')[0]
		input.addEventListener('keyup', function () {
			line.textContent = input.value
			if (input.value === '') {
				line.classList.remove('change-text')
			} else {
				line.classList.add('change-text')
			}
		});
	}
	clickAwebinar () {
		document.addEventListener('click',(event) => {
			const target = event.target
			if(target.classList.contains('link-line') && target.offsetParent.classList.contains('box-message')) {
				Helpers.setCookie('WebinarHidden', 'true', { path: '/' })
				this.updateHeighHeaderBackup()
				this.updatePinHeader()
			}
		})
	}
	hiddenSeach () {
		document.addEventListener('click',(event) => {
			const group = document.querySelectorAll('.group-search')[0]
			if(group.classList.contains('open') && event.target.classList.length && !event.target.classList.contains('dectect-open')) {
				group.classList.remove('open')
			}
		})
	}
	showSearch () {
		const searchFrame = document.querySelectorAll('.group-search')[0];
		searchFrame.classList.add('open')
		document.getElementById('search-page-header').focus()
	}
	hiddenMessage () {
		this.mainNode.style.paddingTop = this.heightHeaderBackup - (this.boxMessage ? this.boxMessage.offsetHeight : 0) + 'px'
		this.setState({ webinar: 'true' })
		Helpers.setCookie('WebinarHidden', 'true', { path: '/' })
		// this.setHeightFakeHeader()
	}
	render() {
		const menuGetstart = this.props.item.customFields.secondaryButton;
		const primaryButton = this.props.item.customFields.primaryButton;
		const contactButton = this.props.item.customFields.contactus;
		const isOpenMenuText = 'is-open-menu';
		const renderMenu = (menu, level) => {
			const links = []
			if (!menu || !menu.length || menu.length === 0) {
				return null
			}
			const itemClassName = 'h-menu-li'
			menu.forEach((item) => {
				// console.log(item)
				if (!item.visible.menu) {
					return
				}
				let path = item.path;
				const path2 = item.path;
				let target = item.target
				if (item.redirect) {
					path = item.redirect.url.replace('~/', '/')
					target = item.redirect.target
				}
				const isActive = (this.state.activeMenu.indexOf(path2) !== -1 ? 'active': '' )
				if (level > 1) {
					return null
				}
				const subLinks = renderMenu(item.children, level + 1);
				if (subLinks === null || subLinks.length < 0) {
					//no sub menu
					links.push(<li className={isActive} key={item.pageID} onClick={this._handleActiveMenu.bind(this, path)}>
						{path.indexOf('://') !== -1 ? <a href={path} target={target}>{item.menuText}</a> : <Link to={path} target={target}>{item.menuText}</Link> }
						</li>)
				} else {
					//has a sub menu
					let li = null;
					if (!item.isFolder) {
						//regular item...
						li = <li className={isActive + ' has-sub  d-lg-flex align-items-center ' + (parseInt(this.state.menuLv2Opening) === item.pageID ? 'is-open-child' : '')} data-page-id={item.pageID} key={item.pageID}>
							{ path.indexOf("://") !== -1 ?
								<a href={path} target={target} onClick={ (e) => this.openMenuLv1(e) }>{item.menuText}</a>
							:
								<Link to={path} target={target} onClick={ (e) => this.openMenuLv1(e) }>{item.menuText}</Link>
							}
							<div className="nav-item-arrows arrows-lv1 d-lg-none" onClick={ (e) => this.clickNavArrowLv1(e) }>
								<i className="icomoon icon-down-menu" aria-hidden="true"></i>
							</div>
							<div className="dropdown-menu main-menu-dropdown rounded-0">
								{subLinks}
							</div>
						</li>;
					} else {
						//folder
						li = <li className={itemClassName + ' has-children'} key={item.pageID}><span>{item.menuText}</span>
							<span className="sub-menu-icon">
								<Lazyload offset={ Helpers.lazyOffset }>
									<img src="https://static.agilitycms.com/layout/img/ico/down.svg" alt="Expand/Collapse" />
								</Lazyload>
								</span>
							<div className="sub-menu-inner">
								{subLinks}
							</div>
						</li>;
					}
					links.push(li);
				}
			});
			if (links.length === 0) {
				return null
			}
			const className = 'main-menu-ul navbar-nav ml-auto list-inline dectect-open';
			if (level === 0) {
				const btnMenu = <li className="d-lg-flex align-items-center box-search-header" key="btnMenu">
					<div className="group-search">
					<button onClick={this.showSearch} className="open-search link-search d-flex align-items-center justify-content-center dectect-open">
						<Lazyload offset={ Helpers.lazyOffset }><img src={'/images/search.svg'} className="lazy dectect-open" width="25" height="25" alt="search" /></Lazyload>
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
							<input name="s" id="search-page-header" type="text" className="aniamtion-input dectect-open" placeholder="Search.."></input>
							<span className="bind-text"></span>
							<button className="submit-search d-flex align-items-center justify-content-center" type="submit">
								<Lazyload offset={ Helpers.lazyOffset }><img src={'/images/search.svg'} className="lazy dectect-open" alt="search" /></Lazyload>
						</button>
						</form>
					</div>
					<a href={primaryButton.href} target={primaryButton.target} className="text-decoration-none btn btn-outline-primary 12 btn-menu">{primaryButton.text}</a>
					<a target={menuGetstart.target} href={menuGetstart.href} className="text-decoration-none btn btn-outline-primary pin btn-menu btn-pin ">{menuGetstart.text}</a>
					{ contactButton?.href && contactButton?.text &&
					 <a target={contactButton.target} href={contactButton.href} className="text-decoration-none btn btn-primary btn-menu btn-menu-v2  ">{contactButton.text}</a>
					}
				</li>
				links.push(btnMenu)
			}
			return <ul className={level === 0 ? className: 'list-inline'}>{links}</ul>;
		};

		const item = this.props.item.customFields;
		const classHeader = `module header ${this.state.sticky === true ? 'pin-header' : 'unpin-header'}  ${this.state.openMenu === true ? isOpenMenuText : ''} ${this.state.pinHeader === true ? 'pos-fixed' : ''}`;
		const classMainMenu = `navbar-collapse main-menu menu-header-right ${this.state.openMenu === true ? isOpenMenuText : ''}`
		return (
			<React.Fragment>
				<header id="header" className={classHeader} data-module="header" ref={ reference => ( this.header = reference)}>
					{/* <a className="skip-link text-center d-block w-100 bg-black text-white" href="javascript:;">
						<span>Skip to content</span></a> */}
					{ (item.hideMarketingBanner !== 'true') && item.marketingBanner && item.marketingBanner.length > 0 && this.state.webinar !== 'true' &&
						<div className={`box-message text-white `} ref={ this.boxMessage }>
							<div className="container last-mb-none text-center">
								<div className="close-message" onClick={this.hiddenMessage}></div>
								<div className="last-mb-none" dangerouslySetInnerHTML={renderHTML(item.marketingBanner)} />
							</div>
						</div>
					}
					<nav className="container navbar navbar-expand-lg">
						<div className="header-mobile row align-items-center justify-content-between flex-wrap">
							{ item.logo ?
								<div className="col-9 col-lg-12">
									<Link to="/" id="header-logo" title={item.logo.label} className="navbar-brand header-logo w-100">
										<img src={item.stickyLogo.url} alt={item.logo.label} width="158" height="40" className="w-100"/>
									</Link>
								</div>
							:
								''
							}
							<div className="col-3 text-right d-lg-none d-flex justify-content-end align-items-center">
								<Hamburger showMenuMobile={ () => this.showMenuMobile() } />
							</div>
						</div>
						<div className={ classMainMenu } id="main-menu" data-module="menu">
							{renderMenu(this.props.menu, 0)}
						</div>
					</nav>
				</header>
			</React.Fragment>
		);
	}
}


