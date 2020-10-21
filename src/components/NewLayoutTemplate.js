import React, { useEffect } from "react"
// import HtmlReactParser from "html-react-parser"
import '../global/mixins/_mixins-global.scss'
import '../global/_react-debug.scss'
// import '../global/_reset.scss'
import '../global/_reboot.scss'
import '../global/_variables-global.scss'
import '../global/_components.scss'

//MOD - joelv - moved _media.scss out of here to GlobalHeader
import '../global/_main.scss'
import '../global/_canvas.scss'
import '../global/_fontface.scss'
import '../global/_previewbar.scss'
// import '../global/_two-column-template.scss'
import '../global/_landing-page-template.scss'

import '../global/_helper.scss'
import '../global/_menu.scss'
import '../global/_header.scss'
// import './LayoutTemplate.scss'

import '../global/core/lib/_animationPage.scss'
import '../global/core/lib/_loading.scss'
import '../global/core/lib/_slick-theme.scss'

import BrowserDetection from '../global/javascript/BrowserDetection'

export default ({ page, children }) => {



	// let globalTopScript = `<!-- Google Tag Manager -->
	// <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	// })(window,document,'script','dataLayer','GTM-KQ22VX2');</script>
	// <!-- End Google Tag Manager -->
	// <meta name="google-site-verification" content="BWFr20EnIEwulm-wMnP6bnwCZtF6hF45yFrXdxsNkzo" />

	// <script type='text/javascript'>
	// window.__lo_site_id = 194235;

	// 	(function() {
	// 		var wa = document.createElement('script'); wa.type = 'text/javascript'; wa.async = true;
	// 		wa.src = 'https://d10lpsik1i8c69.cloudfront.net/w.js';
	// 		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(wa, s);
	// 	  })();
	// 	</script>`;

	// let globalBottomScript = `<!-- Google Tag Manager (noscript) -->
	// <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQ22VX2"
	// height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	// <!-- End Google Tag Manager (noscript) -->

	// <!-- Visitor Queue Script -->
	// <script>function vqTrackId(){return 'f61582da-fed8-4577-bf59-6489b7dedfd8';} (function(d, e) { var el = d.createElement(e); el.sa = function(an, av){this.setAttribute(an, av); return this;}; el.sa('id', 'vq_tracking').sa('src', '//t.visitorqueue.com/p/tracking.min.js?id='+vqTrackId()).sa('async', 1).sa('data-id', vqTrackId()); d.getElementsByTagName(e)[0].parentNode.appendChild(el); })(document, 'script'); </script>
	// <!-- End Visitor Queue Script -->`

	// if (page.scripts.excludedFromGlobal) {
	// 	globalTopScript = "";
	// 	globalBottomScript = "";
	// }

	useEffect(() => {
		BrowserDetection.browserDetection()
	})


	return (

		<div>
			{/* {HtmlReactParser(globalTopScript)} */}
			{children}
			{/* {HtmlReactParser(globalBottomScript)} */}
		</div>

	)
}

