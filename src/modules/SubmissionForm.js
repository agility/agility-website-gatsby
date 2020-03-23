import React from 'react';


const SubmissionForm = ({ item }) => {

	const componentName = item.customFields.componentName;

	console.log("submission form", item.customFields)

	const FormToRender = require(`../components/forms/${componentName}.jsx`).default;
	const moduleProps = {
		item: item
	}

	return (
		<FormToRender {...moduleProps} />
	);
}

export default SubmissionForm;
