import React from 'react';
import { hot } from 'react-hot-loader/root'
import './header.scss'
import SignIn from './sign-in.jsx'
import Hamburger from './hamburger.jsx'
import HeaderSearch from './header-search.jsx'
import Sticky from 'react-sticky-el'
import MarketingBanner from './marketing-banner.jsx'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSticky: false
        }
    }

    componentDidMount() {
        
        //dropdown Menu
        if (document) {
            var hiddenParent = document.querySelector('.header-menu .has-children');
            hiddenParent.addEventListener('click', function (e) {
                this.classList.toggle('open');
            });

            //check for preview bar
            //HACK
            var previewBar = document.getElementById('pnlAgilityStatusBar');
            if (previewBar) {
                const header = document.getElementsByClassName('header-container')[0];
                if(header) {
                    header.classList.add('is-preview');
                }
            }
        }
    }

    render() {
        let headerClass = "header p-w";

        const renderMenu = (menu, level) => {
            let links = []
            if (!menu || !menu.length || menu.length == 0) return null;

            let itemClassName = "h-menu-li";
            let aClassName = "h-menu-a"
            if (level > 0) {
                itemClassName = "sub-menu-li";
                aClassName = "sub-menu-a"
            }

            menu.forEach(item => {

                const subLinks = renderMenu(item.children, level + 1);
                if (subLinks == null) {
                    //no sub menu
                    links.push(<li className={itemClassName} key={item.key}><a href={item.url} target={item.target} className={aClassName}>{item.text}</a></li>)
                } else {
                    //has a sub menu
                    var li = <li className={itemClassName + ' has-children'} key={item.key}><a href={item.url} target={item.target} className={aClassName}>{item.text}</a>
                        <span className="sub-menu-icon"><img src="https://static.agilitycms.com/layout/img/ico/down.svg" alt="Expand/Collapse" /></span>
                        <div className="sub-menu-inner">
                            {subLinks}
                        </div>
                    </li>;

                    links.push(li);
                }
            });

            let className = "header-menu";
            if (level > 0) {
                className = "sub-menu";
            }

            return <ul className={className}>{links}</ul>;
        };

        const onStickyActive = () => {
            this.setState({sticky: !this.state.sticky })
        }

        return (

            <div className="header-container">
                {this.props.marketingBanner && this.props.marketingBanner.length > 0 &&
                <MarketingBanner message={this.props.marketingBanner} />
                }
                <HeaderSearch siteSearchSettings={this.props.siteSearchSettings} />
                <SignIn preHeaderLinks={this.props.preHeaderLinks} preHeaderPrimaryButton={this.props.preHeaderPrimaryButton} />
                <Hamburger {...this.props} isSticky={this.state.sticky} />
                

                
                <header className={headerClass}>
                    <div className="sticky-header">
                        <Sticky onFixedToggle={onStickyActive} className="sticky-header-inner" stickyClassName="sticky-header-active">
                            <div className="container-my">
                                {this.props.logo &&
                                    <div className="header-logo">
                                        <a href="/"><img src={this.props.logo.url} alt={this.props.logo.label} /></a>
                                    </div>
                                }

                                {this.props.stickyLogo &&
                                    <div className="header-logo-sticky">
                                        <a href="/"><img src={this.props.stickyLogo.url} alt={this.props.stickyLogo.label} /></a>
                                    </div>
                                }

                                {renderMenu(this.props.menu, 0)}

                                <div className="btn-set">
                                    {this.props.primaryButton && this.props.primaryButton.href &&
                                        <a href={this.props.primaryButton.href} target={this.props.primaryButton.target} className="btn">{this.props.primaryButton.text}</a>
                                    }

                                    {this.props.secondaryButton && this.props.secondaryButton.href &&
                                        <a href={this.props.secondaryButton.href} target={this.props.secondaryButton.target} className="btn btn-light header-btn-secondary">{this.props.secondaryButton.text}</a>
                                    }
                                </div>
                            </div>
                        </Sticky>
                    </div>
                </header>
                
                <div className="drop-shadow"></div>
            </div>

        );
    }
}
export default hot(Header);


