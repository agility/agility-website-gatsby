import React from 'react';
import { getModule} from "../../modules"

const ContentZone = ({ name, page, dynamicPageItem }) => {

	const Modules = () => {
		let modules = []
		if (! page || page === undefined) {
			console.log("Page was not defined ", name)
		}

		const modulesForThisContentZone = page.zones[name];

		if (modulesForThisContentZone === undefined) {
			console.error(`Cannot render modules for zone "${name}". This does not appear to be a valid content zone for this page template.`)
			return;
		}

		modulesForThisContentZone.forEach(moduleItem => {
			if (moduleItem.item) {

				const moduleDefName = moduleItem.item.properties.definitionName;
				// console.log(moduleDefName, moduleItem.item)
				let ModuleComponentToRender = null

				try {
					// ModuleComponentToRender = require(`../../modules/${moduleDefName}`).default // getModule(moduleDefName)
					ModuleComponentToRender = getModule(moduleDefName)
				} catch (er) {
					console.error(`Could not load module ${moduleDefName}`, er)
				}

				const moduleProps = {
					key: moduleItem.item.contentID,
					dynamicPageItem: dynamicPageItem,
					item: moduleItem.item,
					page: page
				}

				if (ModuleComponentToRender) {
					modules.push(<ModuleComponentToRender {...moduleProps} />)
				} else {
					console.error(`No react component found for the module "${moduleDefName}". Cannot render module.`);
				}
			}
		})


		return modules;
	}


	return (<Modules />)
}
export default ContentZone;