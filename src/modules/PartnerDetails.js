import React, { useEffect, useRef, useState } from 'react';
import { graphql, StaticQuery } from "gatsby"
import { renderHTML } from '../agility/utils'
import IntegrationDetailContent from './IntegrationDetailContent'
import IntegrationDetailGuideLink from './IntegrationDetailGuideLink'
import IntegrationDetailSimilar from './IntegrationDetailSimilar'
import * as StringUtils from "../utils/string-utils"
import Slider from 'react-slick'
import * as ArrayUtils from '../utils/array-utils.js';

import "./CaseStudyDetails.scss"
import "./PartnerDetail.scss"
import "./RichTextArea.scss"
const CaseStudyGallery = ({ dataList, galleryId, title, settingsOveride }) => {
  const mediaLists = dataList // query?.allAgilityCaseStudy?.edges
  const founded = mediaLists?.filter(i => {
    if (i.node?.customFields?.gallery?.galleryid === galleryId) {
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
        <img src={i.url} alt={title} />
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
				isIntegrationReference
			}
			return (
				<section className="mod-integration-partner">
					{ isIntegration && <>
						<IntegrationDetailContent viewModel={viewModel}/>
						<CaseStudyGallery dataList={mediaLists} galleryId={customFields?.gallery?.galleryid || customFields?.screenshots?.galleryId} title={customFields.title} />
						{steps && steps.length > 0 && <IntegrationDetailGuideLink viewModel={viewModel}/>}
						<IntegrationDetailSimilar viewModel={viewModel} />
						</>
					}
					{ !isIntegration && <PartnerDetails {...viewModel} /> }
				</section>
			);
		}}
	/>
)

const PartnerDetails = ({ item, dynamicPageItem }) => {
	item = dynamicPageItem.customFields;
	return (
		<section className="p-w case-study-details">
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
		</section>


	);
}
