import React from 'react';
import './hamburger.scss'


class Hamburger extends React.Component {

	componentDidMount() {
		if (typeof window === 'undefined') {
			return null;
		}

		// let menu = document.querySelector('.mobile-menu-inner .has-children');
		// if (menu) {
		// 	menu.onclick = function (e) {
		// 		//don't toggle again if we've just clicked a child item anchor are going to load a new page
		// 		if (e.target.className === "sub-menu-a") return;
		// 		//e.cancelBubble = true;
		// 		this.classList.toggle('open');
		// 	};
		// }
		this.menuOpenClose();
	}



	menuOpenClose() {
		var btnMenuOpen = document.querySelector('.Button-menu');
		var html = document.querySelector('html');
		var menuContainer = document.querySelector('.Sidebar');

		var isOpen = false;

		if (btnMenuOpen) {
			btnMenuOpen.addEventListener('click', function () {
				menuContainer.style.left = 0;

				if (isOpen === false) {
					menuContainer.classList.add('active');
					btnMenuOpen.classList.add('active');
					html.classList.add('overflow-scroll');
					isOpen = true;
				} else {
					menuContainer.classList.remove('active');
					btnMenuOpen.classList.remove('active');
					html.classList.remove('overflow-scroll');
					isOpen = false;
				}
			});
		}

		var openMenuBlock = document.querySelector('.nav-icon-close'); // Using a class instead, see note below.
		var openMenuBtn = document.querySelector('.mobile-logo'); // Using a class instead, see note below.

		openMenuBlock.onclick = function () {
			menuContainer.style.left = 0;
			menuContainer.classList.remove('active');
			btnMenuOpen.classList.remove('active');
			html.classList.remove('overflow-scroll');
			isOpen = false;
		};

		openMenuBtn.onclick = function () {
			menuContainer.style.left = 0;
			menuContainer.classList.remove('active');
			btnMenuOpen.classList.remove('active');
			html.classList.remove('overflow-scroll');
			isOpen = false;
		};
	}



	render() {

		function setNativeValue(element, value) {
			const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
			const prototype = Object.getPrototypeOf(element);
			const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

			if (valueSetter && valueSetter !== prototypeValueSetter) {
				prototypeValueSetter.call(element, value);
			} else {
				valueSetter.call(element, value);
			}
		}

		function showSearch(b) {
			b.target.classList.toggle('close');
			var searchFrame = document.querySelector('.search-frame');
			searchFrame.classList.toggle('open');
			document.querySelector('html').classList.toggle('search-open');

			var searchInput = document.querySelector('.search-input')

			setNativeValue(searchInput, '');
			searchInput.dispatchEvent(new Event('input', { bubbles: true }));

			searchInput.focus();
		}

		function toggleSubmenu(e) {

			e.currentTarget.classList.toggle('open');
		}


		const renderMobileMenu = () => {
			let links = [];

			let menu = this.props.menu;
			if (!menu || !menu.length || menu.length === 0) return null;

			//loop through sitemap
			menu.forEach(item => {
				let link = null;

				if (! item.visible.menu) return;

				if (item.children) {
					item.children = item.children.filter(c => {
						return c.visible.menu;
					});
				}



				const hasChildren = item.children != null && item.children.length > 0;

				let path = item.path;
				//mod joelv - if the thing has children, it CAN'T be a link...
				if (item.isFolder || hasChildren) path = "#"
				if (hasChildren) {
					const children = item.children.map(function (child) {
						return <li key={child.pageID + "-" + child.path + "-1"} className="sub-menu-inner"><a className="sub-menu-a" href={child.path} target={child.target}>{child.menuText}</a></li>;
					});

					link =
						<li key={item.pageID + "-" + item.path + "-2"} className="mobile-menu-li has-children" onClick={toggleSubmenu} >
							<a href="javascript:;" className="mobile-menu-a" >{item.menuText}</a>
							<span className="sub-menu-icon">
								<img src="https://static.agilitycms.com/layout/img/ico/down.svg" alt="Expand/Collapse"></img>
							</span>
							<div className="sub-menu-inner">
								<ul className="sub-menu">
									{children}
								</ul>
							</div>
						</li>;
				} else {
					link =
						<li key={item.pageID + "-" + item.path + "-3"} className="mobile-menu-li">
							<a href={path} target={item.target} className="mobile-menu-a">{item.menuText}</a>
						</li>;
				}

				links.push(link)
			});

			//add-in the other links
			let preHeaderLinks = [];

			this.props.item.preHeaderLinks.forEach(item => {

				const link = <li key={item.customFields.title} className="mobile-menu-li">
					<a href={item.customFields.uRL.href} target={item.customFields.uRL.target} className="mobile-menu-a">{item.customFields.uRL.text}</a>
				</li>;
				preHeaderLinks.push(link);
			})

			return (
				<ul className="mob-menu">
					{links}
					{preHeaderLinks}
				</ul>
			);
		};


		const hamburgerClassName = () => {
			let marketingBanner = this.props.item.customFields.marketingBanner;
			if (this.props.item.customFields.hideMarketingBanner === "true") marketingBanner = null;

			let name = 'Button-menu nav-icon1 ';
			if (marketingBanner && marketingBanner.length > 0 && !this.props.isSticky) {
				name += 'w-marketing-banner';
			}
			return name;
		}

		return (
			<div className="hamburger">
				<button className={hamburgerClassName()}><span></span><span></span><span></span></button>

				<div className="Sidebar mob-menu">

					<div className="inner">
						<div className="mobile-logo">
							{this.props.item.customFields.mobileLogo &&
								<a href="/"><img src={this.props.item.customFields.mobileLogo.url} alt={this.props.item.customFields.mobileLogo.label} /></a>
							}
						</div>
						<div className="search-mobile">
							<div className="sign-in">
								<button className="open-search" onClick={showSearch}></button>
							</div>
						</div>
						<button className='Button-menu nav-icon-close'><span></span><span></span><span></span></button>
						<div className="mobile-menu-inner">
							{renderMobileMenu()}
						</div>
						<div className="buttons">
							{this.props.item.customFields.preHeaderPrimaryButton &&
								<a href={this.props.item.customFields.preHeaderPrimaryButton.href} target={this.props.item.customFields.preHeaderPrimaryButton.target} className="btn">{this.props.preHeaderPrimaryButton.text}</a>
							}
							{this.props.item.customFields.primaryButton &&
								<a href={this.props.item.customFields.primaryButton.href} target={this.props.item.customFields.primaryButton.target} className="btn">{this.props.item.customFields.primaryButton.text}</a>
							}
						</div>
					</div>

				</div>
			</div>
		);
	}
}
export default Hamburger;

