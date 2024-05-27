import React from 'react';
import ReactPlayer from 'react-player'
import './Hero.scss'

const Hero = ({ item }) => {
	const fields = item.customFields

	return (

		<section className="hero-module" >
			<div className="container">
				{fields.mediaType === "image" && fields.image &&
					<img src={fields.image.url + "?format=auto&w=480"} alt={fields.image.label} />
				}

				{fields.mediaType === "video" && fields.videoURL &&
					<div className='video-container'>
						<ReactPlayer url={fields.videoURL} playing={true} muted={true} controls={true} loop={false} />
					</div>
				}

				<h1>{fields.heading}</h1>
				<h2>{fields.subHeading}</h2>
				<p>{fields.content}</p>
				{fields.cTA && fields.cTA.text &&
					<a href={fields.cTA.href} target={fields.cTA.target} className="btn btn-yellow">{fields.cTA.text}</a>
				}
			</div>
		</section>

	);
}

export default Hero;
