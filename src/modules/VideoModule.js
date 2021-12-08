import React, { useState, useEffect, useRef } from 'react';
import './BestofBothWorldsModule.scss'
import '../global/_popup-video.scss'
import LazyLoad from 'react-lazyload'
import LazyBackground from '../utils/LazyBackground'
import Spacing from './Spacing'
import ReactPlayer from 'react-player'
import Helpers from '../global/javascript/Helpers'
import { Helmet } from 'react-helmet';
import { animationElementInnerComponent } from '../global/javascript/animation'
const VideoModule = ({ item }) => {
	const fields = item.customFields
	const titleVideo = fields.videointrotext
	const title = fields.title
	const classSection = `module mod-HIW BestofBothWorldsModule`
	const urlVideo = fields.videoPath
	const thumbnail = fields.thumbnail
	const urlThumbnail = thumbnail ? thumbnail.url : '/images/bg-video.jpg'
	const [isPaused, setIsPaused] = useState(false);

	/*  */
	const thisModuleRef = useRef(null)
	const imgOverlayRef = useRef(null)
	const compSliderRef = useRef(null)
	const slideReadyRef = useRef(null)
	// const slideFinishRef = useRef(null)
	let slideFinishRef = null
	/*  */

	const displayWindowSize = () => {
		if (imgOverlayRef.current.length) {
			const wrap = document.getElementsByClassName('img-comp-container')[0];
			const wCurent = wrap.offsetWidth;
			const hCurent = wrap.offsetHeight;
			const img = document.getElementsByClassName('img-comp-overlay')[0];
			const comparImg = (1 / Math.tan(69 * Math.PI / 180)) * hCurent;
			img.style.left = -comparImg + 'px';
			Array.from(img.querySelectorAll('img')).forEach((ele) => {
				ele.style.left = comparImg + 'px';
			})
			compSliderRef.current.style.left = (img.offsetWidth - 30.5 - comparImg) / wCurent * 100 + '%';
		}
	}

	useEffect(() => {

		return () => {
			window.removeEventListener("resize", displayWindowSize);
			// compSliderRef.current.removeEventListener('mousedown', slideReadyRef.current);
			window.removeEventListener('mouseup', slideFinishRef);
			// compSliderRef.current.removeEventListener('touchstart', slideReadyRef.current);
			window.removeEventListener('touchend', slideFinishRef);
		}
	}, []);

	/* animation module */
	useEffect(() => {
		const scrollEventFunc = () => {
			animationElementInnerComponent(thisModuleRef.current)
		}
		animationElementInnerComponent(thisModuleRef.current)
		window.addEventListener('scroll', scrollEventFunc)

		return () => {
			window.removeEventListener('scroll', scrollEventFunc)
		}
	}, [])

	const togglePause = () => {
		setIsPaused(isPaused => !isPaused);
	};
	function Video() {
		return (
			<ReactPlayer url={urlVideo.href} playing={true} controls={true} loop={false} />
		);
	}

	if (urlVideo === undefined && thumbnail === undefined) {
		return null
	}

	return (
		<React.Fragment>

			<Helmet>
				<link rel="preload" as="image" href={urlThumbnail} media="(min-width: 768px)" />
				<link rel="preload" as="image" href='/images/image-fake.jpg' media="(min-width: 768px)" />
			</Helmet>

			<section className={classSection} ref={thisModuleRef}>
				<div className="container animation">
					{titleVideo &&
						<div className="text-center title-HIW last-mb-none anima-bottom delay-4">
							<h5>{titleVideo}</h5>
						</div>
					}
					<div className="ps-rv anima-bottom delay-2">
						<div className={`wrap-video ps-rv ${isPaused ? 'is-show' : ''}`}>
							{isPaused &&
								<Video />
							}
							<div className={` text-decoration-none ${urlVideo && urlVideo.href ? 'has-popup ps-as bg' : 'ps-as'} bg-bottom-center`} allow="autoplay" src={urlThumbnail} style={{ backgroundImage: `url('${urlThumbnail}')`}}>
								{urlVideo && urlVideo.href &&
									<div onClick={togglePause} className="ps-as">
										<span className="icomoon icon-video"><span className="path3"></span></span>
									</div>
								}
							</div>
						</div>
					</div>
				</div>
			</section>
			<Spacing item={item} />
		</React.Fragment>
	);
}

export default VideoModule;
