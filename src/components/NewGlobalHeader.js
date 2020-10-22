import React, { Component } from 'react';
import { Link, graphql, StaticQuery, navigate } from "gatsby"
import Lazyload from 'react-lazyload'
import HeaderSearch from './header-search.jsx'
import { renderHTML } from '../agility/utils'
// import SignIn from './sign-in.jsx'
import Hamburger from './Newhamburger.jsx'
// import HeaderSearch from './header-search.jsx'
import Sticky from 'react-sticky-el'
// import MarketingBanner from './marketing-banner.jsx'
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

			const nestedSitemapJSON = queryData.agilitynestedsitemap.internal.content;
			const nestSitemap = JSON.parse(nestedSitemapJSON).nodes;


			const viewModel = {
				item: queryData.agilityGlobalHeader,
				menu: nestSitemap.filter(node => {
					return node.visible.menu;
				})
			}
			return (
				<NewGlobalHeader {...viewModel} />
			);
		}}
	/>
)

class NewGlobalHeader extends Component {
	constructor(props) {
		super(props);
		this.header = React.createRef()

		this.state = {
			sticky: false,
			openMenu: false,
			menuLv2Opening: '',
			activeMenu: ''
		};
		this.stickyHeader = this.stickyHeader.bind(this)
		this.showMenuMobile = this.showMenuMobile.bind(this)
		this.removeClassOpenMenuOnHtml = this.removeClassOpenMenuOnHtml.bind(this)
	}
	componentDidMount() {
		// console.log('NewGlobalHeader', this.props.menu)
		this.setState({activeMenu: window.location.pathname})
		this.inputLine()
		this.hiddenSeach()
		this.removeClassOpenMenuOnHtml()
		this.setPaddingBody()
		window.addEventListener('scroll', this.stickyHeader);
		window.addEventListener('resize', this.setPaddingBody);
	}
	setPaddingBody () {
		setTimeout (() => {
			if(!(window.innerWidth < 992 && document.querySelectorAll('html')[0].classList.contains('is-open-menu'))) {
				let header = document.querySelectorAll('#header')[0].offsetHeight
				let main = document.querySelectorAll('.main-content')[0]
				main.style.paddingTop = header + 'px'
			}
		}, 200)
	}
	stickyHeader () {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop
		if(winScroll > 50) {
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
			this.removeClassOpenMenuOnHtml()
		}
	}
	removeClassOpenMenuOnHtml() {
		const isOpenMenuText = 'is-open-menu';
		const html = document.querySelector('html')
		// console.log(this.state.openMenu)
		setTimeout(() => {
			if (this.state.openMenu === false) {
				html.classList.remove(isOpenMenuText)
			} else {
				html.classList.add(isOpenMenuText)
			}
		}, 50)
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
			// console.log(this.state.menuLv2Opening)
			if (this.state.menuLv2Opening !== parentMenu.dataset.pageId) {
				this.setState({	menuLv2Opening: parentMenu.dataset.pageId})
			} else {
				this.setState({	menuLv2Opening: ''})
			}
		}
	}

	setNativeValue(element, value) {
		const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
		const prototype = Object.getPrototypeOf(element);
		const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

		if (valueSetter && valueSetter !== prototypeValueSetter) {
			prototypeValueSetter.call(element, value);
		} else {
			valueSetter.call(element, value);
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
	hiddenSeach () {
		document.addEventListener('click',(event) => {
			let group = document.querySelectorAll('.group-search')[0]
			if(group.classList.contains('open') && event.target.classList.length && !event.target.classList.contains('dectect-open')) {
				group.classList.remove('open')
			}
		})
	}
	showSearch () {
		const searchFrame = document.querySelectorAll('.group-search')[0];
		searchFrame.classList.add('open')
	}
	hiddenMessage () {
		document.querySelectorAll('.box-message')[0].classList.add('hidden-mess')
		let main = document.querySelectorAll('.main-content')[0]
		let header = document.querySelectorAll('#header .navbar')[0].offsetHeight
		main.style.paddingTop = header + 'px'
	}
	render() {
		let preHeaderLinks = this.props.item.preHeaderLinks;
		let menuGetstart = this.props.item.customFields.secondaryButton;
		let primaryButton = this.props.item.customFields.primaryButton;
		const isOpenMenuText = 'is-open-menu';
		const renderMenu = (menu, level) => {
			let links = []
			if (!menu || !menu.length || menu.length === 0) return null;
			let itemClassName = "h-menu-li"

			menu.forEach((item) => {
				if (!item.visible.menu) return;
				let path = item.path;
				let path2 = item.path;
				if (item.redirect) {
					path = item.redirect.url.replace("~/", "/");
				}
				const isActive = (this.state.activeMenu.indexOf(path2) !== -1 ? 'active': '' )
				const subLinks = renderMenu(item.children, level + 1);
				if (subLinks === null || subLinks.length < 0) {
					//no sub menu
					links.push(<li className={isActive} key={item.pageID} onClick={this._handleActiveMenu.bind(this, path)}>
						{path.indexOf("://") !== -1 ? <a href={path} target={item.target}>{item.menuText}</a> : 	<Link to={path} target={item.target}>{item.menuText}</Link> }
						</li>)
				} else {
					//has a sub menu
					let li = null;
					if (!item.isFolder) {
						//regular item...

						li = <li className={isActive + ' has-sub  d-lg-flex align-items-center ' + (parseInt(this.state.menuLv2Opening) === item.pageID ? 'is-open-child' : '')} data-page-id={item.pageID} key={item.pageID}>

							{ path.indexOf("://") !== -1 ?
								<a href={path} target={item.target} onClick={ (e) => this.openMenuLv1(e) }>{item.menuText}</a>
							:
								<Link to={path} target={item.target} onClick={ (e) => this.openMenuLv1(e) }>{item.menuText}</Link>
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

			if (links.length === 0) return null;

			const className = "main-menu-ul navbar-nav ml-auto list-inline";
			if (level === 0) {
				// const linkSignIn = preHeaderLinks.map((link, idx) => {
				// 	const fieldCustome = link.customFields
				// 	return <Link to={primaryButton.href} blank={primaryButton.target} key={idx} className="text-decoration-none btn btn-outline-primary 12 btn-menu">{primaryButton.text}</Link>
				// })
				const btnMenu = <li className="d-lg-flex align-items-center box-search-header" key="btnMenu">
					<div className="group-search">
					<button onClick={this.showSearch} className="open-search link-search d-flex align-items-center justify-content-center">
						<Lazyload offset={ Helpers.lazyOffset }><img src={'/images/search.svg'} className="lazy dectect-open" alt="search" /></Lazyload>
					</button>
						<form onSubmit={event => {
							event.preventDefault()
							const valSearch = document.querySelectorAll('#search-page-header')[0]
							navigate(`/search?s=${valSearch.value}`)
						}}>
							<label htmlFor="search-page-header" className="sr-only">Search...</label>
							<input name="s" id="search-page-header" type="text" className="aniamtion-input dectect-open" placeholder="Search.."></input>
							<span className="bind-text"></span>
							<button className="submit-search d-flex align-items-center justify-content-center" type="submit">
								<Lazyload offset={ Helpers.lazyOffset }><img src={'/images/search.svg'} className="lazy dectect-open" alt="search" /></Lazyload>
						</button>
						</form>
					</div>
				
					<Link to={primaryButton.href} blank={primaryButton.target} className="text-decoration-none btn btn-outline-primary 12 btn-menu">{primaryButton.text}</Link>
					<a blank={menuGetstart.target} href={menuGetstart.href} className="text-decoration-none btn btn-primary pin btn-menu btn-pin ">{menuGetstart.text}</a>
				</li>
				links.push(btnMenu)
			}
			return <ul className={level === 0 ? className: 'list-inline'}>{links}</ul>;
		};

		const onStickyActive = () => {

			let stickyNow = false;
			if (this.state) stickyNow = this.state.sticky;

			this.setState({ sticky: !stickyNow })
		}
		const item = this.props.item.customFields;
		const classHeader = `module header ${this.state.sticky === true ? 'pin-header' : 'unpin-header'}  ${this.state.openMenu === true ? isOpenMenuText : ''}`;
		const classMainMenu = `navbar-collapse main-menu menu-header-right ${this.state.openMenu === true ? isOpenMenuText : ''}`
		return (
			<React.Fragment>
				{/* <HeaderSearch siteSearchSettings={this.props.item.customFields.siteSearchSettings} /> */}
				<header id="header" className={classHeader} data-module="header">
					<Link className="skip-link text-center d-block w-100 bg-black text-white" to="javascript:;">
						<span>Skip to content</span></Link>
					{ (item.hideMarketingBanner !== "true") && item.marketingBanner && item.marketingBanner.length > 0 &&
					<div className="box-message text-white"> {/*version2: add class style-black */}
						<div className="container last-mb-none text-center">
							<div className="close-message" onClick={this.hiddenMessage}></div>
							<div className="last-mb-none" dangerouslySetInnerHTML={renderHTML(item.marketingBanner)} />
						</div>
					</div>
					}
					<nav className="container navbar navbar-expand-lg">
						<div className="header-mobile row align-items-center justify-content-between flex-wrap">
							{item.logo ?
								<div className="col-9 col-lg-12">
									<Link to="/" id="header-logo" title={item.logo.label} className="navbar-brand header-logo w-100">
										<img src={item.stickyLogo.url} alt={item.logo.label} />
									</Link>
								</div>
							:
								''
							}
							<div className="col-3 text-right d-lg-none">
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


