import React from 'react';

function elementInViewport(el) {
	const rect = el.getBoundingClientRect();

	return (
		rect.top >= -500
		&& rect.left >= -1000
		&& rect.top <= ((window.innerHeight || document.documentElement.clientHeight) + 500)
	)
}

export default class LazyImage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false
		}

		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		this.handleScroll();

		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll() {
		if (!this.state.loaded && elementInViewport(this.bgElm) && this.bgElm.offsetWidth > 0) {

			let w = this.bgElm.offsetWidth
			// Load real image
			const imgLoader = new Image();
			let src = this.props.src
			if (src.indexOf("?") === -1) {
				src = `${src}?w=${w}`
			}

			imgLoader.src = src;
			imgLoader.onload = () => {
				if (this.bgElm) {
					this.bgElm.setAttribute(
						`style`,
						`background-image: url('${src}')`
					);
				}

				this.setState({
					loaded: true
				});
			}
		}
	}

	render() {

		//use a blurry version of the image...
		let baseImage = this.props.src
		if (baseImage.indexOf("?") > 2) {
			baseImage = baseImage.substring(0, baseImage.lastIndexOf("?"))
		}

		const placeHolder = `${baseImage}?w=20`
		const style = { backgroundImage: `url(${placeHolder})` }

		return (
			<div ref={bgElm => this.bgElm = bgElm} className={this.props.className} style={style}>
				{ this.props.children}
			</div>
		)
	}
}