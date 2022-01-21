import React, { useEffect, useRef, useState } from 'react';
import { graphql, Link, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'
import IntegrationDetailContent from './IntegrationDetailContent'
import IntegrationDetailGuideLink from './IntegrationDetailGuideLink'
import IntegrationDetailSimilar from './IntegrationDetailSimilar'
import * as StringUtils from "../utils/string-utils"
import Slider from 'react-slick'
import * as ArrayUtils from '../utils/array-utils.js';

import RelativePartners from '../components/relative-partner';
import { animationElementInnerComponent } from '../global/javascript/animation';

import "./CaseStudyDetails.scss"
import "./PartnerDetail.scss"
import "./RichTextArea.scss"


import RightCTA from '../components/RightCTA';

const CaseStudyGallery = ({ dataList, galleryId, title, settingsOveride }) => {
  const mediaLists = dataList // query?.allAgilityCaseStudy?.edges
  const founded = mediaLists?.filter(i => {
		const galleryidSelect = i.node?.customFields?.gallery?.galleryid || i.node?.customFields?.screenshots?.galleryid
    if (galleryidSelect === galleryId) {
      return i.node.customFields
    }
  })

  let listMedia = []
  if (founded && founded.length > 0) {
    listMedia = founded[0].node.customFields.media
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    arrows: true,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    ...settingsOveride
  }
  const galleries = listMedia?.map((i, index) => {
    return (
      <div key={index} className="gal-item">
        <img src={i.url + '?w=700'} alt={title} />
      </div>
    )
  });

  return (
    <>
      <section className={`case-d-gallery `} >
        {listMedia && listMedia.length > 0 &&
          <Slider {...settings} className={`gal-slider ${galleries?.length > 1 ? 'has-slide' : ''}`}>
            {galleries}
          </Slider>
        }

      </section>
    </>
  )
}

export default props => (
	<StaticQuery
		query={graphql`
		query KeyValuePairPartnerDetailsQuery {
			allAgilityKeyValuePair {
			  nodes {
				contentID
				languageCode
				properties {
				  referenceName
				  itemOrder
				}
				customFields {
				  key
				  value
				}
			  }
			}
			allAgilityIntegrations(sort: {order: ASC, fields: properties___itemOrder}) {
				nodes {
					contentID
					properties {
						referenceName
					}
					customFields {
						screenshots {
							galleryid
						}
						media {
							mediaID
							fileName
							url
							size
							modifiedOn
						}
						title
						excerpt:companyDescription
            integrationType_ValueField
            integrationType_TextField
						uRL
						logo {
              label
              url
            }
					}
				}
			}
			allAgilityPartner(sort: {order: ASC, fields: properties___itemOrder}) {
				nodes {
					contentID
					languageCode
					properties {
						referenceName
						itemOrder
					}
					customTags {
						contentID
					}
					customFields {
						excerpt
						postImage:partnerLogo {
							url
							label
						}
						customTags {
							referencename
						}
						gallery {
							galleryid
						}
						media {
							mediaID
							fileName
							url
							size
							modifiedOn
						}
						title
						uRL
					}
				}
			}
			allAgilityIntegrationType(sort: {order: ASC, fields: properties___itemOrder}) {
        nodes {
          id
          customFields {
            title
          }
          contentID
        }
      }
			allAgilityLinks {
				nodes {
					customFields {
						uRL {
							href
							target
							text
						}
					}
					contentID
					id
					itemID
					properties {
						definitionName
						referenceName
					}
				}
			}
			allAgilityLink {
				nodes {
					properties {
						definitionName
						referenceName
					}
					contentID
					id
					customFields {
						description
						title
						uRL {
							href
							target
							text
						}
					}
				}
			}
			allAgilityStepForImplementation {
				nodes {
					customFields {
						title
						excerpt
					}
					properties {
						referenceName
					}
				}
			}
			allAgilityIntegrationItem {
				nodes {
					customFields {
						description
						heading
						link {
							href
							target
							text
						}
					}
					contentID
					properties {
						referenceName
					}
				}
			}
		}
    `}
		render={queryData => {
			const customFields = props.dynamicPageItem.customFields
			const dynamicPageItem = props.dynamicPageItem
			const allAgilityIntegrationType = queryData.allAgilityIntegrationType
			const isIntegrationReference = dynamicPageItem.properties.referenceName === 'integrations'
			const documentReferenceName = customFields?.documentationIntegration?.referencename || customFields?.documentationLinks?.referencename
			const stepsReferenceName = customFields?.steps?.referencename || customFields?.stepsImplementation?.referencename
			let tags = isIntegrationReference ? dynamicPageItem?.customFields?.integrationType_ValueField.split(',').map(tag => Number(tag)) : dynamicPageItem?.customFields?.customTags?.map(tag => tag.contentID)
			const allIntegration = ArrayUtils.shuffleArray((isIntegrationReference ? queryData?.allAgilityIntegrations?.nodes : queryData?.allAgilityPartner?.nodes) || [])

			if (isIntegrationReference) {
				dynamicPageItem.customFields.customTags = dynamicPageItem?.customFields?.integrationType_ValueField.split(',').map(tag => {
					const findType = allAgilityIntegrationType.nodes.find(node => node.contentID === Number(tag)) || {}
					return findType
				})
			}
			const mediaLists = allIntegration.map(node => {
				return {
					node
				}
			})
			let similarPartner = []
			if (customFields.similarList && customFields.similarList.length) {
				similarPartner = customFields.similarList.map(item => {
					item.customFields.postImage = item.customFields.partnerLogo
					return item
				})
			} else {
				similarPartner = allIntegration.filter(node => {
					const tagsNode = isIntegrationReference ? node.customFields.integrationType_ValueField.split(',').map(tag => Number(tag)) : node.customTags.map(tag => tag.contentID)
					return node.properties.referenceName === dynamicPageItem.properties.referenceName
						&& tagsNode.some(tag => (tags || []).includes(tag))
						&& node.contentID !== dynamicPageItem.contentID
				})
				if (similarPartner.length === 0) {
					similarPartner = allIntegration.filter(node => {
						return node.properties.referenceName === dynamicPageItem.properties.referenceName
							&& node.contentID !== dynamicPageItem.contentID
					})
				}
			}
			similarPartner.length = 3
			similarPartner.forEach(partner => {
				let excerpt = partner.customFields.excerpt || partner.customFields.companyDescription;
				if (excerpt) {
					partner.customFields.excerpt = StringUtils.stripHtml(excerpt, 200);
				}
				partner.url = "/partners/integrations/" + partner.customFields.uRL;
				if (!partner.customFields.postImage && isIntegrationReference) {
					partner.customFields.postImage = partner.customFields.logo
				}
			})

			//filter out only those logos that we want...
			let documentation = queryData[isIntegrationReference ? 'allAgilityLink' :'allAgilityLinks'].nodes.filter(m => {
				return m.properties.referenceName === documentReferenceName;
			});
			let steps = queryData[isIntegrationReference ? 'allAgilityIntegrationItem' : 'allAgilityStepForImplementation'].nodes.filter(m => {
				return m.properties.referenceName === stepsReferenceName;
			});
			let overviewItems = []
			if (isIntegrationReference) {
				overviewItems = queryData[isIntegrationReference ? 'allAgilityIntegrationItem' : 'allAgilityStepForImplementation'].nodes.filter(m => {
					return m.properties.referenceName === customFields?.overviewItems?.referencename;
				})
			}
			if (stepsReferenceName) {
				steps = steps.map(step => {
					return step
				})
			}
			const [isIntegration, setIsIntegration] = useState(false);
			const detectIntegration = () => {
				const detectIntegration = window.location.pathname.includes('/integrations')
				setIsIntegration(detectIntegration)
			}

			useEffect(() => {
				detectIntegration()

				/* animation module */
				// const scrollEventFunc = () => {
				// 	animationElementInnerComponent(bannerRef.current)
				// }
				// animationElementInnerComponent(bannerRef.current)
				// window.addEventListener('scroll', scrollEventFunc)

				return () => {
					// window.removeEventListener('scroll', scrollEventFunc)
				}
			}, []);
			const viewModel = {
				dynamicPageItem,
				item: props.item,
				documentation: documentation || [],
				steps: steps || [],
				similarPartner,
				overviewItems,
				isIntegrationReference,
				allAgilityLinks: queryData.allAgilityLinks
			}
			return (
				<>
					{ isIntegration && <>
					<section className="mod-integration-partner">
						<IntegrationDetailContent viewModel={viewModel}/>
						<CaseStudyGallery dataList={mediaLists} galleryId={customFields?.gallery?.galleryid || customFields?.screenshots?.galleryid} title={customFields.title} />
						{steps && steps.length > 0 && <IntegrationDetailGuideLink viewModel={viewModel}/>}
						<IntegrationDetailSimilar viewModel={viewModel} />
					</section>
					</>
					}
					{ !isIntegration && <PartnerDetails {...viewModel} /> }
				</>
			);
		}}
	/>
)

const PartnerDetails = ({ item, dynamicPageItem, allAgilityLinks }) => {
	const customFields = dynamicPageItem.customFields;

	const allLinks = Array.isArray(allAgilityLinks.nodes) ? allAgilityLinks.nodes : []

	const regions = customFields.customTags ?? []
	// console.log('regions', regions);

	const caseStudies = allLinks.filter(caseStudy => {
		if (caseStudy?.properties?.referenceName === customFields?.caseStuides?.referencename) {
			return caseStudy
		}
	})

	// console.log('caseStudies', caseStudies,allLinks, customFields?.caseStuides.referencename);

	/* animation module */
	const thisModuleRef = useRef(null)
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
		<>
		{/* <section className="p-w case-study-details">
			<div className="container-my">
				<div className="case-study-details-container">

					<div className="case-study-left">
						<div className="rich-text" dangerouslySetInnerHTML={renderHTML(item.textblob)}></div>
					</div>
					{
						(item.rightContentCopy || item.quote) &&

						<div className="case-study-right">
							<div className="rich-text" dangerouslySetInnerHTML={renderHTML(item.rightContentCopy)}></div>
							{item.quote && <div className="color-text"><p>{item.quote}</p></div>}
						</div>
					}
				</div>
			</div>
		</section> */}

		<section ref={thisModuleRef} className="new-partner-detail animation">
			<div className="space-70 space-dt-90"></div>
			<div className="container ps-rv z-2 anima-bottom delay-1">
				<div className="d-lg-flex flex-wrap">
					<div className="cs-detail-cont-left detail-block-left content-ul beauty-ul">
						<div className="cs-detail-inner last-mb-none">
							<h2>Partner Overview</h2>
							<div dangerouslySetInnerHTML={renderHTML(customFields.textblob)}></div>

								{(customFields.quote && customFields.quote.length > 0 && customFields.quote.indexOf('<blockquote>') !== -1) &&
								<div className="cs-quote">
									<div className="last-mb-none" dangerouslySetInnerHTML={renderHTML(customFields.quote)}></div>
								</div>
								}
								{(customFields.quote && customFields.quote.length > 0 && customFields.quote.indexOf('<blockquote>') === -1) &&
									<div className="cs-quote">
										<blockquote dangerouslySetInnerHTML={renderHTML(customFields.quote)}></blockquote>
									</div>
								}
								
						</div>
					</div>
					<div className="cs-detail-cont-right detail-block-right content-ul beauty-ul">
						{customFields.website &&
						<div className="small-paragraph cs-website last-mb-none">
							<h4>Website</h4>
							<p>
								<Link to={customFields.website?.href} target="_blank"><span>{customFields.website?.text}</span></Link>
							</p>
						</div>}
						
						{regions && regions.length > 0 &&
						<div className="small-paragraph cs-tag-wrap last-mb-none">
							<h4>Region</h4>
							<p>
								{renderTags(regions)}
							</p>
						</div>}


						{customFields?.partnerTier_TextField &&
						<div className="small-paragraph cs-tag-wrap last-mb-none">
							<h4>Tier</h4>
							<p>
								<span className="d-inline-block cs-tag ps-rv">
									{customFields.partnerTier_TextField}
								</span>
							</p>
						</div>}

						{caseStudies && caseStudies.length > 0 &&
						<div className="last-mb-none relevant-case-studies">
								<h4>Case Studies</h4>
							{caseStudies.map((caseStudy, idx) => {
								return (
									<p key={idx}>
										<Link to={caseStudy.customFields?.uRL?.href} target={caseStudy.customFields?.uRL?.target}>{caseStudy.customFields?.uRL?.text}</Link>
									</p>
								)
							})}
						</div>}

						{(customFields.linkedInURL || customFields.twitterURL || customFields.facebookURL) &&
						<div className="cs-d-social">
							<h4>Follow Partner</h4>
							<div className="soc-box d-flex flex-wrap">
								{customFields.linkedInURL &&
								<a href={ customFields.linkedInURL } target="_blank" className="d-flex align-items-center justify-content-center">
									<span className="icomoon icon-linkedin2"></span>
								</a>}
								{customFields.twitterURL &&
								<a href={ customFields.twitterURL } target="_blank" className="d-flex align-items-center justify-content-center">
									<span className="icomoon icon-twitter"></span>
								</a>}
								{customFields.facebookURL &&
								<a href={ customFields.facebookURL } target="_blank" className="d-flex align-items-center justify-content-center">
									<span className="icomoon icon-facebook"></span>
								</a>}
							</div>
						</div>}		

						{customFields.servicesOffered &&
						<div className="servicesOffered content-ul beauty-ul">
							<h4>Services Offered</h4>
							<div dangerouslySetInnerHTML={renderHTML(customFields.servicesOffered)}></div>
						</div>
						}
						
						
						<div className="space-60"></div>
						<RightCTA rightCTAContent={item.customFields?.cTAContent} rightCTAButton={item.customFields?.cTAButton} />
					</div>
				</div>
			</div>
		</section>
		<div className="space-60 space-dt-80"></div>
		<RelativePartners regions={regions} currentPartnerId={dynamicPageItem.contentID} />
		<div className="space-70 space-dt-100"></div>
	</>
	);
}

/* 
	
*/

const renderTags = (tags, type) => {
	if (!Array.isArray(tags)) {
		tags = [tags]
	}
	return tags?.map((tag, index) => {
		let link = `/partners/implementation?region=${tag?.customFields?.title?.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/--+/g, '-')}`
		return (
			<span key={index} className="d-inline-block cs-tag ps-rv">
				{tag?.customFields?.title}
				<Link to={link} target="_self" className="ps-as"><span className="sr-only">{tag?.customFields?.title}</span></Link>
			</span>
		)
	})
}
