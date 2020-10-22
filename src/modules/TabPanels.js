import React from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./TabPanels.scss"
import { renderHTML } from '../agility/utils'


const TabPanels = ({ item }) => {

	const moduleItem = item;
	item = item.customFields;


	const tabNav = item.tabPanels.map(function (tab) {

		let key = `${moduleItem.contentID}-${tab.contentID}`;
		tab = tab.customFields;

		return <Tab key={key}>
			{tab.tabIcon &&
				<div className="tab-icon"><img src={tab.tabIcon.href} alt="" /></div>
			}
			<div className="tab-title">{tab.title}</div>
		</Tab>
	})

	//loop all the tabs and render them
	const tabs = item.tabPanels.map(function (tab, index) {

		let key = `${moduleItem.contentID}-${tab.contentID}-panel`;
		tab = tab.customFields;

		return <TabPanel key={key}>
			{tab.image && <div className="img"><img src={tab.image.url} alt={tab.image.label} /></div>}
			<div className="content">
				<h3 className="feature-title">{tab.description}</h3>

				<div dangerouslySetInnerHTML={renderHTML(tab.textblob)}></div>

				{tab.primaryButton && tab.primaryButton.href &&
				<a href={tab.primaryButton.href} target={tab.primaryButton.target} className="btn">{tab.primaryButton.text}</a>
				}
			</div>
		</TabPanel>
	})

	return (

		<section id="sec-3" className="features p-w">

			<h2 className="title-component" dangerouslySetInnerHTML={renderHTML(item.title)}></h2>

			<span dangerouslySetInnerHTML={renderHTML(item.subTitle)}></span>

			<Tabs forceRenderTabPanel={true}>
				<TabList>
					{tabNav}
				</TabList>
				<div className="container-my">
					<div className="features-toggle-tab-items">
						{tabs}
					</div>
				</div>
			</Tabs>
		</section>


	);
}

export default TabPanels;
