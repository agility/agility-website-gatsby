import React, { useState, useEffect, useRef } from 'react';
import './BestofBothWorldsModule.scss'
import './BestofBothWorlds2Paragraphs.scss'
import LazyLoad from 'react-lazyload'
import LazyBackground from '../utils/LazyBackground'
import Spacing from './Spacing'
import ReactPlayer from 'react-player'
import Helpers from '../global/javascript/Helpers'
import { Helmet } from 'react-helmet';
import { animationElementInnerComponent } from '../global/javascript/animation'
const BestofBothWorldsModule = ({ item }) => {
	const fields = item.customFields

	const classSection = `module mod-HIW BestofBothWorlds2Paragraphs`
	const [isPaused, setIsPaused] = useState(false);

	/*  */
	const thisModuleRef = useRef(null)
	const imgOverlayRef = useRef(null)
	const compSliderRef = useRef(null)
	const slideReadyRef = useRef(null)
	// const slideFinishRef = useRef(null)
	let slideFinishRef = null
	/*  */

	const initComparisons = () => {
		// var imgOverlayRef.current;
		// imgOverlayRef.current = imgOverlayRef.current // document.getElementsByClassName('img-comp-overlay');
		// if (x) {
		// const compSliderRef.current = document.getElementsByClassName('img-comp-slider')[0];
		// let inter
		thisModuleRef.current.querySelectorAll('.best-HIW')[0].classList.add('is-active')
		// inter = setInterval(() => {
		// if( x.length && x[0].offsetWidth > 100) {
		// Array.from(thisModuleRef.current.querySelectorAll('.item-how input')).forEach(function (item) {
		// 	item.checked = true;
		// });
		// console.log('...', thisModuleRef.current.querySelectorAll('.item-how input'));
		// clearInterval(inter)
		// for (i = 0; i < x.length; i++) {
		compareImages(imgOverlayRef.current);
		// }
		// }
		// }, 50);


		// window.addEventListener("resize", displayWindowSize);

		// }
	}
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

	/* action hold and drag icon left/right to compare best of both, have call when fake-image onload */
	const compareImages = (img) => {
		var clicked = 0, w, h, comparImg;
		const wrap = document.getElementsByClassName('img-comp-container')[0];
		w = wrap.offsetWidth;
		h = wrap.offsetHeight;
		comparImg = (1 / Math.tan(69 * Math.PI / 180)) * h;
		img.style.width = ((w / 2) + comparImg) + 'px';
		img.style.left = -comparImg + 'px';

		Array.from(img.querySelectorAll('img')).forEach((ele) => {
			ele.style.left = comparImg + 'px';
		})
		compSliderRef.current.style.left = (w / 2) - 30.5 + 'px';
		// compSliderRef.current.addEventListener('mousedown', slideReady);
		// window.addEventListener('mouseup', slideFinish);
		// compSliderRef.current.addEventListener('touchstart', slideReady);
		// window.addEventListener('touchend', slideFinish);
		// function slideReady(e) {
		// 	e.preventDefault();
		// 	clicked = 1;
		// 	window.addEventListener('mousemove', slideMove);
		// 	window.addEventListener('touchmove', slideMove);
		// }
		// function slideFinish() {
		// 	clicked = 0;
		// 	wrap.classList.add('add-transition')
		// 	let h = wrap.offsetHeight;
		// 	let comparImg = (1 / Math.tan(69 * Math.PI / 180)) * h;
		// 	slide((wrap.offsetWidth + comparImg * 2 - 8) / 2)
		// 	window.removeEventListener('mousemove', slideMove);
		// 	window.removeEventListener('touchmove', slideMove);
		// 	setTimeout(() => {
		// 		wrap.classList.remove('add-transition')
		// 	}, 350)
		// }
		function slideMove(e) {
			var pos;
			const hCurent = wrap.offsetHeight;
			const wCurent = wrap.offsetWidth;
			const comparImg = (1 / Math.tan(69 * Math.PI / 180)) * hCurent;
			if (clicked === 0) return false;
			pos = getCursorPos(e)
			if (pos < comparImg * 1.5) pos = comparImg * 1.5;
			if (pos > (wCurent + comparImg / 2) - 8) pos = wCurent + comparImg / 2 - 8;
			slide(pos);
		}
		function getCursorPos(e) {
			const hCurent = wrap.offsetHeight;
			const comparImg = (1 / Math.tan(69 * Math.PI / 180)) * hCurent;
			var a, x = 0;
			e = e || window.event;
			a = img.getBoundingClientRect();
			let pagex = e.pageX
			if (pagex === undefined) {
				pagex = e.changedTouches[0].pageX
			}
			x = pagex - a.left - comparImg / 2;
			x = x - window.pageXOffset;
			return x;
		}
		function slide(x) {
			const wCurent = wrap.offsetWidth;
			const hCurent = wrap.offsetHeight;
			const comparImg = (1 / Math.tan(69 * Math.PI / 180)) * hCurent;
			img.style.width = x / wCurent * 100 + '%';
			img.style.left = -comparImg + 'px';
			if (compSliderRef.current) {
				compSliderRef.current.style.left = (x - 30.5 - comparImg) / wCurent * 100 + '%';
			}
			const l = x - 30.5 - comparImg
			Array.from(img.querySelectorAll('img')).forEach((ele) => {
				ele.style.left = comparImg + 'px';
			})
			const best = document.getElementsByClassName('best-HIW')[0];
			if (best) {
				if (l > wCurent / 2) {
					best.classList.remove('active-v2')
					best.classList.remove('active-v1')
					best.classList.add('is-active')
					if (l > (wCurent / 2 + 10)) {
						best.classList.add('active-v1')
						best.classList.remove('is-active')
					}
				}
				else {
					best.classList.remove('active-v2')
					best.classList.remove('active-v1')
					best.classList.add('is-active')
					if (l < (wCurent / 2 - 60)) {
						best.classList.add('active-v2')
						best.classList.remove('is-active')
					}
				}
			}
		}

		// slideReadyRef.current = slideReady
		slideFinishRef = slideFinish
		compSliderRef.current.addEventListener('mousedown', slideReady);
		window.addEventListener('mouseup', slideFinishRef);
		compSliderRef.current.addEventListener('touchstart', slideReady);
		window.addEventListener('touchend', slideFinishRef);
		function slideReady(e) {
			e.preventDefault();
			clicked = 1;
			window.addEventListener('mousemove', slideMove);
			window.addEventListener('touchmove', slideMove);
		}
		function slideFinish() {
			clicked = 0;
			wrap.classList.add('add-transition')
			let h = wrap.offsetHeight;
			let comparImg = (1 / Math.tan(69 * Math.PI / 180)) * h;
			slide((wrap.offsetWidth + comparImg * 2 - 8) / 2)
			window.removeEventListener('mousemove', slideMove);
			window.removeEventListener('touchmove', slideMove);
			setTimeout(() => {
				wrap.classList.remove('add-transition')
			}, 350)
		}

		// document.getElementsByClassName('healine-v1')[0].addEventListener('click', () => {
		// 	const comparImg = (1 / Math.tan(69 * Math.PI / 180)) * wrap.offsetHeight;
		// 	wrap.classList.add('add-transition')
		// 	slide(wrap.offsetWidth + comparImg / 2 - 8)
		// 	setTimeout(() => {
		// 		wrap.classList.remove('add-transition')
		// 	}, 350)
		// });
		// document.getElementsByClassName('healine-v2')[0].addEventListener('click', () => {
		// 	const comparImg = (1 / Math.tan(69 * Math.PI / 180)) * wrap.offsetHeight;
		// 	wrap.classList.add('add-transition')
		// 	slide(comparImg * 1.5)
		// 	setTimeout(() => {
		// 		wrap.classList.remove('add-transition')
		// 	}, 350)
		// });
	}
	useEffect(() => {
		initComparisons()

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


	return (
		<React.Fragment>

			<section className={classSection} ref={thisModuleRef}>

				<div className="best-HIW animation anima-bottom">
					<div className="container ">

						<div className="middle-flex last-mb-none text-center d-md-flex align-items-center">
							<div className="lazy compare-2img">
								<LazyLoad offset={Helpers.lazyOffset}><img src="/images/bg-bottom2.svg" className="bg-2img-top" alt="image" loading="lazy"></img></LazyLoad>
								<LazyLoad offset={Helpers.lazyOffset}><img src="/images/bg-bottom2.svg" className="bg-2img-bottom" alt="image" loading="lazy"></img></LazyLoad>
								<div className="img-comp-container">
									<div className="img-comp-img">

										<React.Fragment>
											<img src="/images/image-fake.jpg" className='img-primary' onLoad={() => { compareImages(imgOverlayRef.current); }}></img>
											<LazyLoad offset={Helpers.lazyOffsetRes}><img src="/images/image-author-2.png" className='img-second-author' loading="lazy"></img></LazyLoad>
										</React.Fragment>

									</div>
									<div className="img-comp-slider" ref={compSliderRef}>
										<svg xmlns="http://www.w3.org/2000/svg" id="Group_40" data-name="Group 40" width="61.176" height="61.176" viewBox="0 0 61.176 61.176">
											<g id="Oval" transform="translate(0 0)" fill="#1d242a" stroke="#ffc414" strokeMiterlimit="10" strokeWidth="2">
												<circle cx="30.588" cy="30.588" r="30.588" stroke="none" />
												<circle cx="30.588" cy="30.588" r="29.588" fill="none" />
											</g>
											<path id="Path" d="M18.548,23.025H7.466L15.819,8.6l8.353,14.428,2.436,4.3h5.03L15.818,0,0,27.324H20.489Z" transform="translate(14.338 14.338)" fill="#ffc414" />
										</svg>
									</div>
									<div className="img-comp-img img-comp-overlay" ref={imgOverlayRef}>

										<React.Fragment>
											<img src="/images/image-fake.jpg" className='img-primary' onLoad={() => { compareImages(imgOverlayRef.current); }}></img>
											<LazyLoad offset={Helpers.lazyOffsetRes}><img src="/images/image-dev-2.png" className='img-second-dev'></img></LazyLoad>
										</React.Fragment>
									</div>
								</div>
							</div>

						</div>
					</div>


					<div className="container flex-paras">
						<div className='para'>
							<h3>{fields.marketerHeading}</h3>
							<p>
								{fields.marketerContent}
							</p>
							{fields.marketerCTA.href && fields.marketerCTA.target && fields.marketerCTA.text &&
								<a href={fields.marketerCTA.href} target={fields.marketerCTA.target} >{fields.marketerCTA.text} →</a>
							}
							<div className='highlight'></div>
						</div>
						<div className='para'>
							<h3>{fields.developerHeading}</h3>
							<p>
								{fields.developerContent}
							</p>
							{fields.developerCTA.href && fields.developerCTA.target && fields.developerCTA.text &&
								<a href={fields.developerCTA.href} target={fields.developerCTA.target}>{fields.developerCTA.text} →</a>
							}
							<div className='highlight'></div>
						</div>



					</div>

					<LazyLoad offset={Helpers.lazyOffset}><img src="/images/bg-bottom2.svg" className="bg-bottom" alt="image"></img></LazyLoad>
				</div>
			</section>
			<Spacing item={item} />
		</React.Fragment >
	);
}

export default BestofBothWorldsModule;
