import React, { useEffect, useRef } from 'react';
import { Widget, PopupButton, Sidetab } from '@typeform/embed-react'



const TypeFormModule = ({ item }) => {

	const formJSON = item.customFields.form
	const form = JSON.parse(formJSON)
	const display = item.customFields.display
	const buttonLabel = item.customFields.buttonLabel
	const buttonColor = item.customFields.buttonColor || "#ffcb28"
	console.log("TypeForm", item)

	return (
		<>
			{display && display === "inline" &&
				<div style={{ marginBottom: 50 }}>
					<Widget id={form.formID} style={{ width: '50%', margin: "auto", height: 500 }} className="my-form" />
				</div>
			}

			{display && display === "popup" &&
				<div style={{ marginBottom: 50, "textAlign": "center" }}>
					<PopupButton id={form.formID} style={{ margin: "auto", backgroundColor: buttonColor }}>{buttonLabel}</PopupButton>
				</div>
			}

			{display && display === "sidetab" &&

				<Sidetab id={form.formID} buttonText={buttonLabel} buttonColor={buttonColor} />

			}
		</>
	)
}

export default TypeFormModule