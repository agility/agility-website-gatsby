import React, {useState, useEffect } from 'react';
import './BestofBothWorldsModule.scss'
import '../global/_popup-video.scss'
// import PopupVideo from 'react-modal-video'
// import LazyLoad from 'react-lazyload'
import './VideoPlayerModule.scss'
import LazyBackground from '../utils/LazyBackground'
// import YouTube from 'react-youtube';
import ReactPlayer from 'react-player'
import Spacing from './Spacing'

const VideoPlayerModule = ({ item }) => {
	const fields = item.customFields
	const title = fields.title
	const classSection = `module mod-HIW VideoPlayerModule ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`
	const urlVideo = fields.videoURL
	const [isPaused, setIsPaused] = useState(false);
	const thumbnail = fields.thumbnailVideo
	const urlThumbnail = thumbnail ? thumbnail.url : '/images/bg-video.jpg'
	// console.log("VideoPlayerModule", item)
	const togglePause = () => {
		if(urlVideo !== null) {
			setIsPaused(!isPaused);
		}
  };
	function Video() {
		return (
			<ReactPlayer url={urlVideo.href} playing={true} controls={true} loop={true}/>
		);
	}
	useEffect(() => {
  });

	return (
		<React.Fragment>
			<section className={classSection}>
				<div className="container animation">
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
