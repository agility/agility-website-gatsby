const HelperFunc = {
  animateScrollTop: (elementY, duration) => {
		var startingY = window.pageYOffset;
		var diff = elementY - startingY;
		var start;

		// Bootstrap our animation - it will get called right before next frame shall be rendered.
		window.requestAnimationFrame(function step(timestamp) {
			if (!start) start = timestamp;
			// Elapsed milliseconds since start of scrolling.
			var time = timestamp - start;
			// Get percent of completion in range [0, 1].
			var percent = Math.min(time / duration, 1);

			window.scrollTo(0, startingY + diff * percent);

			// Proceed with animation as long as we wanted it to.
			if (time < duration) {
				window.requestAnimationFrame(step);
			}
		})
  },
	lazyOffsetRes: 0,
	lazyOffset: 500,
	 setCookie: (cname, cvalue, exdays) => {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},
	getCookie:(cname) => {
		if (! document) return ""
		if (! document.cookie) return "";
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},
	findOffsetTop: (elm) => {
		let node = elm
		let curtop = 0;
		let curtopscroll = 0;
		if (node.offsetParent) {
			do {
				curtop += node.offsetTop;
				curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
				node = node.offsetParent
			} while (node);
		}
		return (curtop - curtopscroll)
	}
}


export default HelperFunc
