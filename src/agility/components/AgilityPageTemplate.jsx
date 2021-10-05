import React from 'react'

const AgilityPageTemplate = (props) => {
	const pageTemplateName = props.page.templateName.replace(/[^0-9a-zA-Z]/g, '-').toLowerCase();
	let PageTemplateComponentToRender = null
	//try to load the page template via jsx or js file.

	try {

		PageTemplateComponentToRender = require(`../../pageTemplates/${pageTemplateName}.jsx`).default
	} catch (er) {
		console.log(`Could not load page template ${pageTemplateName} via jsx`)
	}
	if (! PageTemplateComponentToRender) {
		try {
			PageTemplateComponentToRender = require(`../../pageTemplates/${pageTemplateName}.js`).default
		} catch (er) {
			console.log(`Could not load page template ${pageTemplateName} via js`)
		}

	}

	if (! PageTemplateComponentToRender) {
		return (
			<div style={{ padding: 50, textAlign:"center"}}>Error: Page template <strong>{pageTemplateName}</strong> could not be found.</div>
		)
	}


	//get the page template name that we need to render

	delete props.pageTemplates;
	return (
		<PageTemplateComponentToRender {...props} />
	);
}

export default AgilityPageTemplate;
