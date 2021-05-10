import React from 'react';
import { AgilityImage } from "@agility/gatsby-image-agilitycms"


const ResponsiveImage = ({img, layout, breaks, className}) => {

		let image = img;

		if (layout === undefined || ! layout) layout = "constrained"
		if (!image || !image.url) return null;

		let url = image.url;
		let alt = image.label;
		let urlNoQuery = url;
		if (urlNoQuery.indexOf("?") !== -1) {
			urlNoQuery = urlNoQuery.substring(0, urlNoQuery.indexOf("?"));
		}

		//if this is an svg, just output it
		if (urlNoQuery.indexOf(".svg") !== -1) {
			return <img src={urlNoQuery} alt={alt} className={className} />
		}

		if (image.height && image.width) {
			return <AgilityImage image={image} layout={layout} />
		}

		let smallestSrc = url;
		let smallestWidth = -1;

		if (! breaks) {
			//if we don't have height/width data, and we don't have break info...
			return <img src={url} alt={alt} className={className} />
		}

		const sources = breaks.map((res, index) => {

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

			if (smallestWidth === -1 || res.w < smallestWidth) {
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
				<img src={smallestSrc} alt={ alt ? alt : 'image resource' }  loading="lazy" />
			</picture>
		)
}

export default ResponsiveImage;