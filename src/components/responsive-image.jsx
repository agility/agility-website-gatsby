import React from 'react';
import { hot } from 'react-hot-loader/root'


class ResponsiveImage extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		let image = this.props.img;
		if (!image || !image.url) return null;

		let url = image.url;
		let alt = image.label;
		let urlNoQuery = url;
		if (urlNoQuery.indexOf("?") != -1) {
			urlNoQuery = urlNoQuery.substring(0, urlNoQuery.indexOf("?"));
		}

		let smallestSrc = url;
		let smallestWidth = -1;

		const sources = this.props.breaks.map((res, index) => {

			let media = "";
			if (res.max) {
				media = "(max-width: " + res.max + "px)";
			} else if (res.min) {
				media = "(min-width: " + res.min + "px)";
			}

			let thumbStr = "?w=" + res.w;
			if (res.h) {
				thumbStr += "&h=" + res.h;
			}

			if (smallestWidth == -1 || res.w < smallestWidth) {
				smallestSrc = urlNoQuery + thumbStr;
				smallestWidth = res.w;
			}

			return (
				<source key={index + '-img'} srcSet={urlNoQuery + thumbStr} media={media} />
			)
		});

		return (
			<picture>
				{sources}
				<img src={smallestSrc} alt={alt} />
			</picture>
		)
	}

}

export default hot(ResponsiveImage);