import React, { useEffect, useRef } from 'react';
import { Widget, PopupButton, Sidetab } from '@typeform/embed-react'



const TypeFormModule = () => {
	return (
		<>
			<div style={{ marginBottom: 50 }}>
				<Widget id="CoqXEWCv" style={{ width: '50%', margin: "auto", height: 500 }} className="my-form" />
			</div>

			<div style={{ marginBottom: 50, "textAlign": "center" }}>
				<PopupButton id="CoqXEWCv" style={{ margin: "auto" }}> click to open form in popup</PopupButton>
			</div>

			<div style={{ marginBottom: 50 }}>
				<Sidetab id="CoqXEWCv" buttonText="Get A Quote" buttonColor='#ffcb28' />
			</div>
		</>
	)
}

export default TypeFormModule