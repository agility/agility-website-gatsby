import React, {useState, useEffect } from 'react';
import './BestofBothWorldsModule.scss'
import '../global/_popup-video.scss'
// import PopupVideo from 'react-modal-video'
// import LazyLoad from 'react-lazyload'
import './VideoPlayerModule.scss'
import LazyBackground from '../utils/LazyBackground'
import YouTube from 'react-youtube';
import Spacing from './Spacing'

const VideoPlayerModule = ({ item }) => {
	const fields = item.customFields
	const title = fields.title
	const classSection = `module mod-HIW VideoPlayerModule ${item.customFields.darkMode && item.customFields.darkMode === 'true' ? 'dark-mode bg-17 text-white': ''}`
	const [isPaused, setIsPaused] = useState(false);
	console.log("VideoPlayerModule", item)
	const togglePause = () => {
    setIsPaused(!isPaused);
  };
	function Video(props) {
		console.log(props);
		const opts = {
			height: "230",
			width: "460",
			playerVars: {
				autoplay: 1
			}
		};
	
		const _onReady = event => {
			if(props.isPaused) {
				event.target.playVideo()
			} else {
				event.target.pauseVideo()
			}
		};
	
		const _onStateChange = event => {
		};
		return (
			<YouTube
				videoId={"5QiQU7uCHjU"}
				opts={opts}
				onReady={_onReady}
				onStateChange={_onStateChange}
			/>
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
							<Video isPaused={isPaused} />
							<LazyBackground className=" text-decoration-none has-popup ps-as bg bg-bottom-center" allow="autoplay" src="/images/bg-video.jpg">
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
