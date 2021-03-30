import React from 'react';

// import './hamburger.scss'

class Hamburger extends React.Component {

	componentDidMount() {
		if (typeof window === 'undefined') {
			return null;
		}
		// this.menuOpenClose();
	}

	menuOpenClose() {
		var btnMenuOpen = document.querySelector('.hamburger-menu');
		// var html = document.querySelector('html');
		// var header = document.querySelector('.header');
		// var menuContainer = document.querySelector('.main-menu');

		// var isOpen = false;

		if (btnMenuOpen) {
			// btnMenuOpen.addEventListener('click', function () {
			// 	menuContainer.style.left = 0;

			// 	if (isOpen === false) {
			// 		header.classList.add('is-open-menu');
			// 		menuContainer.classList.add('is-open-menu');
			// 		btnMenuOpen.classList.add('is-open-menu');
			// 		html.classList.add('is-open-menu');
			// 		isOpen = true;
			// 	} else {
			// 		header.classList.remove('is-open-menu');
			// 		menuContainer.classList.remove('is-open-menu');
			// 		btnMenuOpen.classList.remove('is-open-menu');
			// 		html.classList.remove('is-open-menu');
			// 		isOpen = false;
			// 	}
			// });
		}
  }

	render() {
		return (
      <button className="border-0 hamburger-menu" type="button" data-toggle="collapse" data-target="#main-menu"
        aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation" onClick={ this.props.showMenuMobile }>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icomoon icon-close"></span>
        <span className="sr-only">Open Menu</span>
      </button>

		);
	}
}
export default Hamburger;

