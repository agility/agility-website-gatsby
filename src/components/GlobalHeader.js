import React, { Component } from 'react';
import { Link, graphql, StaticQuery } from "gatsby"

import SignIn from './sign-in.jsx'
import Hamburger from './hamburger.jsx'
import HeaderSearch from './header-search.jsx'
import Sticky from 'react-sticky-el'
import MarketingBanner from './marketing-banner.jsx'



import './GlobalHeader.scss'


export default props => (
	<StaticQuery
		query={graphql`
        query GlobalHeaderQuery {
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
				<GlobalHeader {...viewModel} />
			);
		}}
	/>
)

class GlobalHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sticky: false
		};
	}
	componentDidMount() {

	}

	render() {
		let headerClass = "header p-w";

		const renderMenu = (menu, level) => {
			let links = []
			if (!menu || !menu.length || menu.length === 0) return null;

			let itemClassName = "h-menu-li";
			let aClassName = "h-menu-a"
			if (level > 0) {
				itemClassName = "sub-menu-li";
				aClassName = "sub-menu-a"
			}

			menu.forEach(item => {
				if (!item.visible.menu) return;


				let path = item.path;
				if (item.redirect) {
					path = item.redirect.url.replace("~/", "/");
				}


				const subLinks = renderMenu(item.children, level + 1);
				if (subLinks === null || subLinks.length < 0) {
					//no sub menu
					links.push(<li className={itemClassName} key={item.pageID}>
						{path.indexOf("://") !== -1 &&
								<a href={path} target={item.target} className={aClassName}>{item.menuText}</a>
							}
							{path.indexOf("://") === -1 &&
								<Link to={path} target={item.target} className={aClassName}>{item.menuText}</Link>
							}
						</li>)
				} else {
					//has a sub menu
					let li = null;
					if (!item.isFolder) {
						//regular item...
						li = <li className={itemClassName + ' has-children'} key={item.pageID}>
							{path.indexOf("://") !== -1 &&
								<a href={path} target={item.target} className={aClassName}>{item.menuText}</a>
							}
							{path.indexOf("://") === -1 &&
								<Link to={path} target={item.target} className={aClassName}>{item.menuText}</Link>
							}
							<span className="sub-menu-icon"><img src="https://static.agilitycms.com/layout/img/ico/down.svg" alt="Expand/Collapse" /></span>
							<div className="sub-menu-inner">
								{subLinks}
							</div>
						</li>;
					} else {
						//folder
						li = <li className={itemClassName + ' has-children'} key={item.pageID}><span className={aClassName}>{item.menuText}</span>
							<span className="sub-menu-icon"><img src="https://static.agilitycms.com/layout/img/ico/down.svg" alt="Expand/Collapse" /></span>
							<div className="sub-menu-inner">
								{subLinks}
							</div>
						</li>;
					}

					links.push(li);
				}
			});

			if (links.length === 0) return null;

			let className = "header-menu";
			if (level > 0) {
				className = "sub-menu";
			}

			return <ul className={className}>{links}</ul>;
		};

		const onStickyActive = () => {

			let stickyNow = false;
			if (this.state) stickyNow = this.state.sticky;

			this.setState({ sticky: !stickyNow })
		}
		let item = this.props.item.customFields;
		let preHeaderLinks = this.props.item.preHeaderLinks;

		return (
			<div className="header-container">
				{ (item.hideMarketingBanner !== "true") && item.marketingBanner && item.marketingBanner.length > 0 &&
					<MarketingBanner message={item.marketingBanner} />
				}
				<HeaderSearch siteSearchSettings={item.siteSearchSettings} />
				<SignIn preHeaderLinks={preHeaderLinks} preHeaderPrimaryButton={item.preHeaderPrimaryButton} />
				<Hamburger {...this.props} isSticky={this.state === null ? false : this.state.sticky} />

				<header className={headerClass}>
					<div className="sticky-header">
						<Sticky onFixedToggle={onStickyActive} className="sticky-header-inner" stickyClassName="sticky-header-active">
							<div className="container-my">
								{item.logo &&
									<div className="header-logo">
										<Link to="/"><img src={item.logo.url} alt={item.logo.label} /></Link>

									</div>
								}

								{item.stickyLogo &&
									<div className="header-logo-sticky">
										<Link to="/"><img src={item.stickyLogo.url} alt={item.stickyLogo.label} /></Link>
									</div>
								}

								{renderMenu(this.props.menu, 0)}

								<div className="btn-set">
									{item.primaryButton && item.primaryButton.href &&
										<a href={item.primaryButton.href} target={item.primaryButton.target} className="btn">{item.primaryButton.text}</a>
									}

									{item.secondaryButton && item.secondaryButton.href &&
										<a href={item.secondaryButton.href} target={item.secondaryButton.target} className="btn btn-light header-btn-secondary">{item.secondaryButton.text}</a>
									}
								</div>
							</div>
						</Sticky>
					</div>
				</header>
				{ this.state.sticky &&
				<div style={{height:"70px"}}>&nbsp;</div>}

			</div>


		);
	}


}


