import React from 'react'
import { graphql } from "gatsby"
import agilityUtils from './agility/utils'
import AgilityPageTemplate from './agility/components/AgilityPageTemplate'
//Some things we need for our layout
import LayoutTemplate from "./components/NewLayoutTemplate"
import PreviewBar from "./components/PreviewBar"
import NewGlobalHeader from './components/NewGlobalHeader'
import NewGlobalFooter from './components/NewGlobalFooter'
import SEO from './components/SEO'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

//Our query to get the our page data and check for a dynamic page item (agilityItem)
export const query = graphql`
  query($pageID: Int!, $contentID: Int!, $languageCode: String!) {

    agilitypage(languageCode: { eq: $languageCode }, itemID: { eq: $pageID }) {
		pageJson
	}
    agilityitem(languageCode: {eq: $languageCode}, itemID: {eq: $contentID}) {
		itemJson
    }
}
`
const AgilityPage = ({ pageContext, data, location }) => {

	const viewModel = agilityUtils.buildPageViewModel({ pageContext, data, location });
	if (viewModel === null) {
		return "Page data could not be accessed."
	}

	var classes = 'main-content main page-'+viewModel.page.name

	viewModel.isLandingPage = viewModel.page.templateName === "Landing Page Template";

	return (
		<LayoutTemplate page={ viewModel.page }>
			<SEO page={ viewModel.page }  />
			<PreviewBar isPreview={viewModel.isPreview} />
			{ viewModel.isLandingPage === false &&
				<NewGlobalHeader {... viewModel} />
			}
			<main className={classes}>
				<AgilityPageTemplate {...viewModel} />
			</main>
			<NewGlobalFooter isLandingPage={viewModel.isLandingPage}/>
		</LayoutTemplate>
	);
}

export default AgilityPage;


