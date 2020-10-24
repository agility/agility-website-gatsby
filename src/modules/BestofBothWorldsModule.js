import React, {useState, useEffect } from 'react';
import './BestofBothWorldsModule.scss'
import '../global/_popup-video.scss'
import LazyLoad from 'react-lazyload'
import LazyBackground from '../utils/LazyBackground'
import Spacing from './Spacing'
import ReactPlayer from 'react-player'
import Helpers from '../global/javascript/Helpers'
const BestofBothWorldsModule = ({ item }) => {
	const fields = item.customFields
	const ctaBtn = fields.cTA1
	const titleVideo = fields.videointrotext
	const title = fields.title
	const leftGroupName = fields.leftGroupName
	const leftGroupedFeatures = fields.leftGroupedFeatures
	const rightGroupName = fields.rightGroupName
	const rightGroupedFeatures = fields.rightGroupedFeatures
	const classSection = `module mod-HIW BestofBothWorldsModule ${fields.darkMode && fields.darkMode === 'true' ? 'dark-mode': ''}`
	const urlVideo = fields.videoPath
	const thumbnail = fields.thumbnail
	const urlThumbnail = thumbnail ? thumbnail.url : '/images/bg-video.jpg'
	const [isPaused, setIsPaused] = useState(false);
	const initComparisons = () => {
		var x, i;
		x = document.getElementsByClassName('img-comp-overlay');
		if (x.length) {
			const wrap = document.getElementsByClassName('img-comp-container')[0];
			const slider = document.getElementsByClassName('img-comp-slider')[0];
			let inter
			document.querySelectorAll('.best-HIW')[0].classList.add('is-active')
			inter = setInterval(() => {
				if( x.length && x[0].offsetWidth > 100) {
					Array.from(document.querySelectorAll('.item-how input')).forEach(function(item) {
						item.checked = true;
					});
					clearInterval(inter)
					for (i = 0; i < x.length; i++) {
						compareImages(x[i]);
					}
				}
			}, 50);

			function compareImages(img) {
				var img, clicked = 0, w, h,comparImg;
				w = wrap.offsetWidth;
				h = wrap.offsetHeight;
				comparImg = (1 / Math.tan(69 * Math.PI/180))*h;
				img.style.width = ((w / 2) + comparImg ) + 'px';
				img.style.left = -comparImg + 'px';

				Array.from(img.querySelectorAll('img')).forEach((ele) => {
					ele.style.left = comparImg + 'px';
				})
				slider.style.left = (w / 2) - 30.5  + 'px';
				slider.addEventListener('mousedown', slideReady);
				window.addEventListener('mouseup', slideFinish);
				slider.addEventListener('touchstart', slideReady);
				window.addEventListener('touchend', slideFinish);
				function slideReady(e) {
					e.preventDefault();
					clicked = 1;
					window.addEventListener('mousemove', slideMove);
					window.addEventListener('touchmove', slideMove);
				}
				function slideFinish() {
					clicked = 0;
					wrap.classList.add('add-transition')
					slide((wrap.offsetWidth + comparImg*2 - 8)/2)
					setTimeout(() => {
						wrap.classList.remove('add-transition')
					}, 350)
				}
				function slideMove(e) {
					var pos;
					const hCurent = wrap.offsetHeight;
					const wCurent = wrap.offsetWidth;
					const comparImg = (1 / Math.tan(69 * Math.PI/180))*hCurent;
					if (clicked === 0) return false;
					pos = getCursorPos(e)
					if (pos < comparImg*1.5) pos = comparImg*1.5;
					if (pos > (wCurent + comparImg/2) - 8) pos = wCurent + comparImg/2 - 8;
					slide(pos);
				}
				function getCursorPos(e) {
					const hCurent = wrap.offsetHeight;
					const comparImg = (1 / Math.tan(69 * Math.PI/180))*hCurent;
					var a, x = 0;
					e = e || window.event;
					a = img.getBoundingClientRect();
					let pagex = e.pageX
					if (pagex === undefined) {
						pagex = e.changedTouches[0].pageX
					}
					x = pagex - a.left - comparImg/2;
					x = x - window.pageXOffset;
					return x;
				}
				function slide(x) {
					const wCurent = wrap.offsetWidth;
					const hCurent = wrap.offsetHeight;
					const comparImg = (1 / Math.tan(69 * Math.PI/180))*hCurent;
					img.style.width = x/wCurent*100 + '%';
					img.style.left = -comparImg + 'px';
					slider.style.left = (x - 30.5 - comparImg)/wCurent*100  + '%';
					const l = x - 30.5 - comparImg
					Array.from(img.querySelectorAll('img')).forEach((ele) => {
						ele.style.left = comparImg + 'px';
					})
					const best = document.getElementsByClassName('best-HIW')[0];
					if(best){
						if(l > wCurent/2 ) {
							best.classList.remove('active-v2')
							best.classList.remove('active-v1')
							best.classList.add('is-active')
							if (l > (wCurent/2 + 10)) {
								best.classList.add('active-v1')
								best.classList.remove('is-active')
							}
						}
						else {
							best.classList.remove('active-v2')
							best.classList.remove('active-v1')
							best.classList.add('is-active')
							if (l < (wCurent/2 - 60)) {
								best.classList.add('active-v2')
								best.classList.remove('is-active')
							}
						}
					}
				}
				document.getElementsByClassName('healine-v1')[0].addEventListener('click', () => {
					const comparImg = (1 / Math.tan(69 * Math.PI/180))*wrap.offsetHeight;
					wrap.classList.add('add-transition')
					slide(wrap.offsetWidth + comparImg/2 - 8)
					setTimeout(() => {
						wrap.classList.remove('add-transition')
					}, 350)
				});
				document.getElementsByClassName('healine-v2')[0].addEventListener('click', () => {
					const comparImg = (1 / Math.tan(69 * Math.PI/180))*wrap.offsetHeight;
					wrap.classList.add('add-transition')
					slide(comparImg*1.5)
					setTimeout(() => {
						wrap.classList.remove('add-transition')
					}, 350)
				});
			}
			window.addEventListener("resize", displayWindowSize);
			function displayWindowSize() {
				if (x.length) {
					const wCurent = wrap.offsetWidth;
					const hCurent = wrap.offsetHeight;
					const img = document.getElementsByClassName('img-comp-overlay')[0];
					const comparImg = (1 / Math.tan(69 * Math.PI/180))*hCurent;
					img.style.left = -comparImg + 'px';
					Array.from(img.querySelectorAll('img')).forEach((ele) => {
						ele.style.left = comparImg + 'px';
					})
					slider.style.left = (img.offsetWidth - 30.5 - comparImg)/wCurent*100  + '%';
				}
			}
		}
	}
	useEffect(() => {
		calluseEffect()
	});
	const calluseEffect = () => {
		initComparisons()
	}
	const togglePause = () => {
    setIsPaused(!isPaused);
  };
	function Video() {
		return (
			<ReactPlayer url={urlVideo.href} playing={true} controls={true} loop={false} />
		);
	}
	const listIemHIW = leftGroupedFeatures.map((key, idx) => {
		const className = `item-how item-how-v1 item-v1-${idx + 1}`
		const idInput = `API${key.contentID}`
		return (
			<div className={className} key={key.contentID}>
				<input type="checkbox" id={idInput} name="API"></input>
				<label htmlFor={idInput}>{key.customFields.title}</label><br></br>
			</div>
		)
	})

	const listIemHIW2 = rightGroupedFeatures.map((key2, idx) => {
		const className = `item-how item-how-v2 item-v2-${idx + 1}`
		const idInput = `API${key2.contentID}`
		return (
			<div className={className} key={key2.contentID}>
				<input type="checkbox" id={idInput} name="API"></input>
				<label htmlFor={idInput}>{key2.customFields.title}</label><br></br>
			</div>
		)
	})
	return (
		<React.Fragment>
			<section className={classSection}>
				<div className="container animation">
					{ titleVideo &&
						<div className="text-center title-HIW last-mb-none anima-bottom delay-4">
							<h5>{titleVideo}</h5>
						</div>
					}
					<div className="wrap-video-HIW ps-rv anima-bottom delay-2">
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
						<LazyLoad offset={ Helpers.lazyOffset }><img src="/images/bg-top.svg" className="bg-top-video" alt="image"></img></LazyLoad>
					</div>
				</div>
				<div className="best-HIW animation anima-bottom">
					<div className="container ">
						{ title &&
							<div className="title-best-HIW last-mb-none text-center">
								<h2 className="h1">{title}</h2>
							</div>
						}
						<div className="middle-HIW last-mb-none text-center d-md-flex align-items-center">
							<div className="lazy compare-2img">
								<img src="/images/bg-bottom2.svg" className="bg-2img-top" alt="image"></img>
								<img src="/images/bg-bottom2.svg" className="bg-2img-bottom" alt="image"></img>
								<div className="img-comp-container">
									<div className="img-comp-img">
									{ rightGroupName &&
									  <React.Fragment>
										  <img src="/images/author-image.png" className='img-primary'  alt={rightGroupName.text}></img>
											<img src="/images/image-author-2.png" className='img-second-author' alt={rightGroupName.text}></img>
										</React.Fragment>
									}
									</div>
									<div className="img-comp-slider">
										<svg xmlns="http://www.w3.org/2000/svg" id="Group_40" data-name="Group 40" width="61.176" height="61.176" viewBox="0 0 61.176 61.176">
											<g id="Oval" transform="translate(0 0)" fill="#1d242a" stroke="#ffc414" strokeMiterlimit="10" strokeWidth="2">
												<circle cx="30.588" cy="30.588" r="30.588" stroke="none"/>
												<circle cx="30.588" cy="30.588" r="29.588" fill="none"/>
											</g>
											<path id="Path" d="M18.548,23.025H7.466L15.819,8.6l8.353,14.428,2.436,4.3h5.03L15.818,0,0,27.324H20.489Z" transform="translate(14.338 14.338)" fill="#ffc414"/>
										</svg>
									</div>
									<div className="img-comp-img img-comp-overlay">
										{ leftGroupName &&
										  <React.Fragment>
												<img src="/images/dev-image.png" className='img-primary' alt={leftGroupName.text}></img>
                        <img src="/images/image-dev-2.png" className='img-second-dev' alt={leftGroupName.text}></img>
										  </React.Fragment>
										}
									</div>
								</div>
							</div>
							{ leftGroupName &&
								<h3 className="healine-v1">{leftGroupName.text}</h3>
							}
							{ rightGroupName &&
								<h3 className="healine-v2">{rightGroupName.text}</h3>
							}
						</div>
					</div>
					{ (leftGroupedFeatures.length > 0 || rightGroupedFeatures.length > 0) &&
						<div className="list-item-HIW">
							{ leftGroupedFeatures.length > 0 && listIemHIW }
							{ rightGroupedFeatures.length > 0 && listIemHIW2 }
						</div>
					}
					{ ctaBtn && ctaBtn.href &&
						<div className="container">
							<div className="text-center cta-HIW">
								<a href={ctaBtn.href} target={ctaBtn.target} className="btn btn-primary text-decoration-none">{ctaBtn.text}</a>
							</div>
						</div>
					}
					<LazyLoad offset={ Helpers.lazyOffset }><img src="/images/bg-bottom2.svg" className="bg-bottom" alt="image"></img></LazyLoad>
				</div>
			</section>
			<Spacing item={item}/>
		</React.Fragment>
	);
}

export default BestofBothWorldsModule;
