import React from 'react';


export default class LazyImage extends React.Component {
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		loaded: false
	// 	}

	// 	this.handleScroll = this.handleScroll.bind(this);
	// }

	// componentDidMount() {
	// 	this.handleScroll();

	// 	window.addEventListener('scroll', this.handleScroll);
	// }

	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', this.handleScroll);
	// }

	// handleScroll() {
	// 	if (!this.state.loaded && elementInViewport(this.bgElm) && this.bgElm.offsetWidth > 0) {

	// 		let w = this.bgElm.offsetWidth
	// 		// Load real image
	// 		const imgLoader = new Image();
	// 		let src = this.props.src
	// 		if (src.indexOf("?") === -1) {
	// 			src = `${src}?w=${w}`
	// 		}

	// 		imgLoader.src = src;
	// 		imgLoader.onload = () => {
	// 			if (this.bgElm) {
	// 				this.bgElm.setAttribute(
	// 					`style`,
	// 					`background-image: url('${src}')`
	// 				);
	// 			}

	// 			this.setState({
	// 				loaded: true
	// 			});
	// 		}
	// 	}
	// }

	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			dynamicSrc: props.src,
			convert: false
		}
		this.handleScroll = this.handleScroll.bind(this);
	}
	elementInViewport(el) {
		if (el === null) {
			return false
		}
		const rect = el.getBoundingClientRect();
		return (
			rect.top >= -500
			&& rect.left >= -1000
			&& rect.top <= ((window.innerHeight || document.documentElement.clientHeight) + 500)
		)
	}
	componentDidMount() {
		this.handleScroll();
		window.addEventListener('scroll', this.handleScroll);
		window.addEventListener('resize', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('resize', this.handleScroll);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.src !== this.props.src) {
			this.setState({
				loaded: false
			})
		}
		if (prevState.loaded !== this.state.loaded && !this.state.loaded) {
			this.handleScroll()
		}
	}

	handleScroll() {
		// if (this.bgElm && this.bgElm.className.indexOf('b-loaded') !== -1) {
		// 	return false
		// }
		if (!this.state.loaded && this.elementInViewport(this.bgElm) && this.bgElm.offsetWidth > 0) {
			// Load real image
			let w = this.bgElm.offsetWidth;
			const imgLoader = new Image();
			let src = this.props.src
			if (src?.indexOf("?") === -1) {
				src = `${src}?w=${w}`
			}
			imgLoader.src = src;

			imgLoader.onload = () => {
				if (this.bgElm) {
					this.setState({
						loaded: true,
						dynamicSrc: src
					});
				}
			}
			/* load img full origin width if cant load modify img above */
			imgLoader.onerror = () => {
				if (this.bgElm) {
					this.setState({
						loaded: true,
						dynamicSrc: this.props.src
					});
				}
			}
		}
	}

	render() {

		//use a blurry version of the image...
		let baseImage = this.state.dynamicSrc; //this.props.src
		if (baseImage && baseImage.indexOf("?") > 2 && !this.state.loaded) {
			baseImage = baseImage.substring(0, baseImage.lastIndexOf("?"))
		}

		const placeHolder = this.state.loaded ? `${baseImage}` : `${baseImage}?w=20`
		const style = { backgroundImage: `url(${placeHolder})` }
		return (
			<div ref={bgElm => this.bgElm = bgElm} className={this.props.className} style={style}>
				{this.props.children}
			</div>
		)
	}
}