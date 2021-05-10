import React, { useEffect, useRef, useState } from 'react';
import './BestofBothWorldsModule.scss'
import '../global/_popup-video.scss'
import './VideoPlayerModule.scss'
import LazyBackground from '../utils/LazyBackground'
import ReactPlayer from 'react-player'
import Spacing from './Spacing'
import { animationElementInnerComponent } from '../global/javascript/animation'

const VideoPlayerModule = ({ item }) => {
	const fields = item.customFields
	const title = fields.title
	const classSection = `module mod-HIW VideoPlayerModule ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`
	const urlVideo = fields.videoURL
	const [isPaused, setIsPaused] = useState(false);
	const thumbnail = fields.thumbnailVideo
	const urlThumbnail = thumbnail ? thumbnail.url : '/images/bg-video.jpg'
	const togglePause = () => {
		if(urlVideo !== null) {
			setIsPaused(!isPaused);
		}
  };
	function Video() {
		return (
			<ReactPlayer url={urlVideo.href} playing={true} controls={true} loop={false}/>
		);
	}

	const thisModuleRef = useRef(null)
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

	return (
		<React.Fragment>
			<section className={classSection}>
				<div className="container animation" ref={ thisModuleRef }>
					{ title &&
						<div className="text-center title-HIW last-mb-none anima-bottom delay-4">
							<h5>{title}</h5>
						</div>
					}
					<div className="wrap-video-HIW-v2 ps-rv anima-bottom delay-2">
						<div className={`wrap-video ps-rv ${isPaused ? 'is-show' : ''}`}>
							{isPaused &&
								<Video/>
							}
							<LazyBackground className=" text-decoration-none has-popup ps-as bg bg-bottom-center" allow="autoplay" src={urlThumbnail}>
								<div onClick={togglePause} className="ps-as">
									<span className="icomoon icon-video"><span className="path3"></span></span>
								</div>
							</LazyBackground>
						</div>
					</div>
				</div>
			</section>
			<Spacing item={item}/>
		</React.Fragment>
	);
}

export default VideoPlayerModule;
