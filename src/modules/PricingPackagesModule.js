import React, { useEffect, useRef, useState } from 'react';
import { graphql, StaticQuery } from 'gatsby'
import Spacing from './Spacing'
import HelperFunc from '../global/javascript/Helpers.js'
import './PricingPackagesModule.scss'
const ModuleWithQuery = props => (
	<StaticQuery
		query={graphql`
		query getPricingItems {
			allAgilityPackageFeatureValues(sort: {fields: properties___itemOrder}) {
			  nodes {
				customFields {
				  packageFeature {
					contentid
				  }
				  pricingPackage {
					contentid
				  }
				  textValue
				  trueFalseValue
				}
				properties {
				  itemOrder
				  referenceName
				}
				itemID
			  }
			}
			allAgilityPackageFeatures(sort: {fields: properties___itemOrder}) {
			  nodes {
				customFields {
				  isPrimary
				  title
				}
				properties {
				  referenceName
				  itemOrder
				}
				itemID
			  }
			}
			allAgilityPricingPackages(sort: {fields: properties___itemOrder}, filter: {customFields: {displayOnWebsite: {eq: "true"}}}) {
			  nodes {
				customFields {
				  cTAButtonLabel
				  cost
				  saleCost
				  costLabel
				  isMostPopular
				  isSaleOn
				  title
				  cTAButton {
					target
					href
					text
				  }
				}
				properties {
				  referenceName
				  itemOrder
				}
				itemID
			  }
			}
		  }


		`}
		render={queryData => {
			/**pricing header */
			const pricingPackages = props.item.customFields.pricingPackages.referencename
			const listPricingPackages = queryData.allAgilityPricingPackages.nodes
				.filter(obj => { return obj.properties.referenceName === pricingPackages})
				.sort((a, b) => a.properties.itemOrder - b.properties.itemOrder)

			// // order
			// for(let i = 0; i < listPricingPackages.length - 1; i++) {
			// 	if (listPricingPackages[i].properties.itemOrder > listPricingPackages[i + 1].properties.itemOrder) {
			// 		const tam = listPricingPackages[i]
			// 		listPricingPackages[i] = listPricingPackages[i + 1]
			// 		listPricingPackages[i + 1] = tam
			// 	}
			// }
			/**end */
			/**row value */
			const packageFeatureValues = props.item.customFields.packageFeatureValues.referencename
			const listPackageFeatureValues = queryData.allAgilityPackageFeatureValues.nodes.filter(obj => {
				return obj.properties.referenceName === packageFeatureValues
			})

			const packageFeatureLabels = props.item.customFields.packageFeatureLabels.referencename

			const listPackageFeaturePrimary = queryData.allAgilityPackageFeatures.nodes.filter(obj => {
				return obj.properties.referenceName === packageFeatureLabels
						&& obj.customFields.isPrimary !== undefined
						&& obj.customFields.isPrimary !== null
						&& obj.customFields.isPrimary=== 'true'
			}).sort((a, b) => a.properties.itemOrder - b.properties.itemOrder)

			const listPackageFeatureMore = queryData.allAgilityPackageFeatures.nodes.filter(obj => {
				return obj.properties.referenceName === packageFeatureLabels
				&& ( obj.customFields.isPrimary === undefined
					|| obj.customFields.isPrimary === null
					|| obj.customFields.isPrimary === 'false')
			}).sort((a, b) => a.properties.itemOrder - b.properties.itemOrder)

			/**end */
			const viewModel = {
				item: props.item,
				dataQuery: {
					listPackageFeaturePrimary,
					listPackageFeatureMore,
					listPackageFeatureValues,
					listPricingPackages
				}
			}
			return (
				<PricingPackagesModule2 {...viewModel} />
			);
		}}
	/>
)

const HeaderColumn = ({ priceType, title, label, btnCta, btnCtaLabel, value, saleCost, hasPopular }) => {
	const classColor = ['free', 'standard', 'pro', 'enterprise']
	const popular = hasPopular && hasPopular === 'true' ? <span className={'most-popular'}><span className="icomoon icon-Star"></span>Most Popular</span>: ''
	const btnTitle = btnCta && btnCta.text && btnCta.text.length > 0 ? btnCta.text : btnCtaLabel

	return (
		<div className={'price-head ps-rv type-' + classColor[Number(priceType) % 4] }>
			<div className="price-type ps-rv">
				<span>{ title }</span>
				{ popular }
			</div>
			<div>
				<div className="price-value">
					{ !saleCost  &&
						<>
						<span>${ value }</span>
						{/* <span className={`pr-month ${label ? '' : 'pr-hidden'}`}> {label}</span> */}
						</>
					}
					{ saleCost  &&
					<>
						<span className="sale-override">${ value }</span>&nbsp;
						{/* <span className={`pr-month strike-through ${label ? '' : 'pr-hidden'}`}> {label}</span><br/> */}
						<span className="sale-price">${ saleCost }</span>
						{/* <span className={`pr-month ${label ? '' : 'pr-hidden'}`}> {label}</span> */}
					</>
					}
					<span className={`pr-month ${label ? '' : 'pr-hidden'}`}> {label}</span>
				</div>
				{ btnCta && btnCta.href && btnCta.href.length > 0 &&
					(
						<div>
							<a href={btnCta.href} target={btnCta.target} className="btn btn-arrow">{btnTitle} <span className="icomoon icon-arrow"></span></a>
						</div>
					)
				}
			</div>
		</div>
	);
}


const RowItem = ({props, maxCol}) => {
	const classColor = ['free', 'standard', 'pro', 'enterprise']
	const rowFields = props.customFields
	const title = rowFields.title
	const CheckIsBoolean = ({textVal, checkedVal}) => {

		if ((textVal && checkedVal) || (textVal && !checkedVal) ) {
			return <span dangerouslySetInnerHTML={{__html:textVal}}></span>
		}
		if (!textVal && checkedVal) {
			return  (checkedVal === 'true' ? <span className="icomoon icon-check"></span> : <span className="icomoon icon-uncheck"></span>);
		}
	}
	const rowFeatures = props.features.map((el, idx) => {
		if (el !== 'none') {
			const featuresFields = props.features[idx].customFields
			return (
				<td key={idx} className={`type-${classColor[Number(idx) % 4]}`}>
					<div>{<CheckIsBoolean textVal={featuresFields.textValue} checkedVal={featuresFields.trueFalseValue} />}</div>
				</td>
			)
		}
		return (
			<td key={idx} className={`type-${classColor[Number(idx) % 4]}`}>
				<div><span className="icomoon icon-uncheck"></span></div>
			</td>
		)
	})
	return (
		<tr>
			{ title &&
				<td dangerouslySetInnerHTML={{__html: title}}></td>
			}
			{ rowFeatures && rowFeatures.length > 0 &&
				rowFeatures
			}
		</tr>
	);
}


const RowItemMobile = ({title, value}) => {
	const CheckVal = ({val}) => {
		if (val && val.customFields) {
			const filedsVal = val.customFields
			const textVal = filedsVal.textValue
			const checkedVal = filedsVal.trueFalseValue
			if ((textVal && checkedVal) || (textVal && !checkedVal) ) {
				return (
					<td>
						<div><span>{textVal}</span></div>
					</td>
				)
			}
			if (!textVal && checkedVal) {
				return (
					<td>
						<div>{checkedVal === 'true' ? <span className="icomoon icon-check"></span> : <span>-</span>}</div>
					</td>
				)
			}
		}
		return (
			<td>
				<div><span>-</span></div>
			</td>
		)
	}
	return (
		<tr>
			<td>{ title }</td>
			{
				<CheckVal val={value}/>
			}
		</tr>
	);
}

/* Price Item Mobile */
const PriceItemMobile = ({priceType, primaryFeaturesTitle, secondaryFeaturesTitle, data}) => {
	const classColor = ['free', 'standard', 'pro', 'enterprise']
	const [showMore, setShowMore] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const showHideEle = useRef();
	const checkIsMobile = () => {
		if (window.innerWidth <  1025) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}
	const checkShowHideElement = () => {
		if (isMobile) {
			if (showMore) {
				showHideEle.current.style.height = showHideEle.current.scrollHeight + 'px';
			} else {
				showHideEle.current.style.height = '0px';
			}
		}
	}
	const showMoreAction = () => {
		if (showMore) {
			HelperFunc.animateScrollTop(showHideEle.current.parentNode.offsetTop - document.querySelector('header').clientHeight, 300)
		}
		setShowMore(!showMore);
	}
	useEffect(() => {
		let oldWidth = window.innerWidth;
		checkShowHideElement();
		checkIsMobile();
	})

	const fieldLabel = data.customFields
	const btnCtaMB = fieldLabel.cTAButton
	const btnCtaMBLabel = fieldLabel.cTAButtonLabel
	const costMB = fieldLabel.cost
	const costLabelMB = fieldLabel.costLabel
	const isSaleOn = fieldLabel.isSaleOn
	let saleCost = fieldLabel.saleCost

	if (isSaleOn != "true") saleCost = null

	const isMostPopularMB = fieldLabel.isMostPopular
	const titleMB = fieldLabel.title
	const primaryShow = data.listPrimary.map((el, idx) => {
		const colFileds = el.customFields
		const title = colFileds.title
		const colVal = el.featureVal ? el.featureVal : null
		return (
			<RowItemMobile title={title} value={colVal} key={idx} />
		)
	})
	const primaryMore = data.listMore.map((el, idx) => {
		const colFileds = el.customFields
		const title = colFileds.title
		const colVal = el.featureVal ? el.featureVal : null
		return (
			<RowItemMobile title={title} value={colVal} key={idx} />
		)
	})
	return (
		<div className={`price-item-mb item-${classColor[priceType % 4]} ` + (!showMore ? '' : 'is-show-more') }>
			<HeaderColumn priceType={priceType} title={titleMB} label={costLabelMB} btnCta={btnCtaMB} btnCtaLabel={btnCtaMBLabel} value={costMB} saleCost={saleCost} hasPopular={isMostPopularMB} />
			<div>
				<table>
					<tbody>
						{/* <tr className="pr-tr-title">
							<td colSpan="2" className="pr-sub-title">{primaryFeaturesTitle}</td>
						</tr> */}
						{ primaryShow && primaryShow.length > 0 &&
							primaryShow
						}
					</tbody>
				</table>
			</div>
			<div className="show-hide-table-mb" ref={showHideEle}>
				<table>
					<tbody>
						<tr className="pr-tr-title">
						<td colSpan="2" className="pr-sub-title">{secondaryFeaturesTitle}</td>
						</tr>
						{ primaryMore && primaryMore.length > 0  &&
							primaryMore
						}
					</tbody>
				</table>
			</div>
			<div className="show-more-mb text-center" onClick={ () => { showMoreAction() } }>
				<span className="icomoon icon-chevron-down"></span>
			</div>
		</div>
	)
}

const filterAllowRow = (listFilter, listPackageFeatureValues, listPricingPackages) => {
	return listFilter.map(feature => {
		const featureObj = Object.assign({}, feature)
		const listValPricing = []
		if(featureObj.itemID) {
			const listVal = listPackageFeatureValues.filter(val => {
				return val.customFields.packageFeature?.contentid === featureObj?.itemID
			})
			for(let i = 0; i < listPricingPackages.length; i++) {
				const orderByPricing = listVal.find(el => el.customFields.pricingPackage.contentid === listPricingPackages[i].itemID) || 'none'
				if (orderByPricing) {
					listValPricing.push(orderByPricing)
				}
			}
			featureObj.features = listValPricing
		}
		return featureObj
	})
}

const filterAllowColumn = (listFilterPrimary, listFilterMore, listPackageFeatureValues, listPricingPackages) => {
	return listPricingPackages.map(pricing => {
		const pricingObj = Object.assign({}, pricing)
		const itemID = pricingObj.itemID
		const listPrimary = listFilterPrimary.map(fil => {
			const filObj = Object.assign({}, fil)
			filObj.featureVal = listPackageFeatureValues.find(fe => {
				return fe.customFields.packageFeature?.contentid === filObj.itemID && fe.customFields.pricingPackage.contentid === itemID
			})
			return filObj
		})
		const listMore = listFilterMore.map(fil => {
			const filObj = Object.assign({}, fil)
			filObj.featureVal = listPackageFeatureValues.find(fe => {
				return fe.customFields.packageFeature?.contentid === filObj.itemID && fe.customFields.pricingPackage.contentid === itemID
			})
			return filObj
		})
		pricingObj.listPrimary = listPrimary
		pricingObj.listMore = listMore
		return pricingObj
	})
}

class PricingPackagesModule2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			showMore: false,
			isMobile: false,
			isPin: false
		}
		this.pinHeaderTable = this.pinHeaderTable.bind(this)
	}

	showMoreAction() {
		this.setState({showMore: !this.state.showMore});
	}
	checkIsMobile() {
		if (window.innerWidth <  1025) {
			if(!this.state.isMobile) {
				this.setState({isMobile: true})
			}
		} else {
			if(this.state.isMobile) {
				this.setState({isMobile: false})
			}
		}
	}
	checkShowHideSection() {
		const section2 = document.querySelector('.show-hide-act');
		const windowY = window.pageYOffset;
		if (!this.state.isMobile) {
			if (this.state.showMore) {
				if (document.querySelector('html').classList.contains('chrome')) {
					HelperFunc.animateScrollTop(windowY, 450);
				}
				setTimeout(() => {
					section2.style.height = section2.scrollHeight + 'px';
				}, 20)
			} else {
				setTimeout(() => {
					section2.style.height = 0 + 'px'
				}, 20)
			}
		}
	}

	equalHeightHeader() {
		const headerPrice = document.querySelectorAll('.price-head');
		let height = 0;
		let count = 0;
		headerPrice.forEach((e) => {
			e.style.height = ''
		})
		if (!this.state.isMobile) {
			headerPrice.forEach((e) => {
				if (height < e.clientHeight) {
					height = e.clientHeight;
					count++;
				}
			})
			if (count) {
				headerPrice.forEach((e) => {
					e.style.height = height + 'px'
				})
			}
		}
	}

	caculatePin(pinEle, $header, virtual, scrollArea) {
		let offsetPin
		let rootOffset
		let header
		let trigger
		let listOffset
		let scrollTop
		if (!this.state.isMobile) {

			rootOffset = virtual.offsetTop;
			scrollTop = window.pageYOffset;
			header = $header.clientHeight;
			offsetPin = virtual.offsetTop;
			listOffset = scrollArea.offsetTop + scrollArea.clientHeight - document.querySelector('.table-3').clientHeight - pinEle.clientHeight - 90
			trigger = scrollTop + header

			if (trigger > rootOffset && this.state.showMore) {
				pinEle.classList.add('table-pin');
				pinEle.childNodes[0].classList.add('container');
				virtual.style.height = pinEle.clientHeight + 'px'
				if (trigger + pinEle.clientHeight < listOffset) {
					pinEle.style.top = $header.clientHeight + 'px';
				} else {
					pinEle.style.top = listOffset - pinEle.clientHeight - scrollTop + 'px';
				}
			} else {
				pinEle.classList.remove('table-pin')
				virtual.style.height = '';
				pinEle.childNodes[0].classList.remove('container');
			}
		}

	}

	pinHeaderTable(event) {
		const pinEle = document.querySelector('.table-header')
		const $header = document.querySelector('#header')
		const virtual = document.querySelector('.virtual-pin-bar')
		const scrollArea = document.querySelector('.price-desktop')

		this.caculatePin(pinEle, $header, virtual, scrollArea);
	}

	componentDidMount() {
		let oldWidth = window.innerWidth
		this.checkIsMobile();
		this.pinHeaderTable();
		this.setState({loaded: true});
		const interCount = 0;
		const inter = setInterval(() => {
			this.equalHeightHeader();
			if (interCount > 9) {
				clearInterval(inter);
			}
		}, 200)

		this.checkShowHideSection();
		window.addEventListener('scroll', this.pinHeaderTable)
		window.addEventListener('resize', () => {
			if (oldWidth !== window.innerWidth) {
				this.checkIsMobile();
				this.equalHeightHeader();
				oldWidth = window.innerWidth;
			}
		});
	}
	componentDidUpdate() {
		this.checkShowHideSection();
		this.pinHeaderTable();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.pinHeaderTable)
	}

	render () {
		const dataQuery = this.props.dataQuery
		const fields = this.props.item.customFields
		const btnShowMore = fields.showmoretext
		const btnShowLess = fields.showlesstext
		const primaryFeaturesTitle = fields.primaryFeaturesTitle
		const secondaryFeaturesTitle = fields.secondaryFeaturesTitle
		const headerList = dataQuery.listPricingPackages
		const rowListShow = filterAllowRow(dataQuery.listPackageFeaturePrimary, dataQuery.listPackageFeatureValues, headerList).map((row, idx) => {
			return (
				<RowItem props={row} maxCol={headerList.length} key={idx}/>
			)
		})
		const rowListHidden = filterAllowRow(dataQuery.listPackageFeatureMore, dataQuery.listPackageFeatureValues, headerList).map((row, idx) => {
			return (
				<RowItem props={row} maxCol={headerList.length} key={idx}/>
			)
		})
		const mobileData = filterAllowColumn(dataQuery.listPackageFeaturePrimary, dataQuery.listPackageFeatureMore, dataQuery.listPackageFeatureValues, headerList)

		const BlockPriceMobile = () => {
			const itemMobile = mobileData.length ? mobileData.map((mb, idx) => {
				return <PriceItemMobile key={idx} priceType={idx} primaryFeaturesTitle={primaryFeaturesTitle} secondaryFeaturesTitle={secondaryFeaturesTitle} data={mb}/>
			}): []
			return (
				<div className="price-mobile">
					{ itemMobile && itemMobile.length > 0 &&
						itemMobile
					}
				</div>
			)
		}

		const listHeaderColumn = headerList.length ? headerList.map((label, idx) => {
			const fieldLabel = label.customFields
			const btnCtaLabel = fieldLabel.cTAButtonLabel
			const btnCta = fieldLabel.cTAButton
			const cost = fieldLabel.cost
			const costLabel = fieldLabel.costLabel
			const isMostPopular = fieldLabel.isMostPopular
			const title = fieldLabel.title
			let saleCost = fieldLabel.saleCost
			let isSaleOn = fieldLabel.isSaleOn
			if (isSaleOn != "true") saleCost = null

			return (
				<th key={idx}>
					<HeaderColumn priceType={idx} title={title} label={costLabel} btnCta={btnCta} btnCtaLabel={btnCtaLabel} value={cost} saleCost={saleCost} hasPopular={isMostPopular} />
				</th>
			)
		}) : []

		const listBtnColumn = headerList.length ? headerList.map((label, idx) => {
			const classColor = ['free', 'standard', 'pro', 'enterprise']
			const fieldLabel = label.customFields
			const btnCta = fieldLabel.cTAButton
			const btnCtaLabel = fieldLabel.cTAButtonLabel
			const btnTitle = btnCta && btnCta.text && btnCta.text.length > 0 ? btnCta.text : btnCtaLabel
			return (
				<td key={idx}>
					{ btnCta && btnCta.href && btnCta.href.length > 0 &&
						(
							<a href={btnCta.href} target={btnCta.target} className={`btn btn-arrow btn-${classColor[idx % 4]}`}>{btnTitle} <span className="icomoon icon-arrow"></span></a>
						)
					}
				</td>
			)
		}) : []
		const BlockPriceDesktop = (<div className="price-desktop">
			<div className="virtual-pin-bar" style={{height: `${this.state.isPin ? document.querySelector('.table-header').clientHeight + 'px' : ''}`}}></div>
			<div className={`table-header ${this.state.isPin ? 'table-pin' : ''}`}>
				<div className={ this.state.isPin ? 'container' : ''}>
					<table>
						<tbody>
							<tr>
								<th></th>
								{ listHeaderColumn && listHeaderColumn.length > 0 &&
									listHeaderColumn
								}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<table className="table-1">
				<tbody>
					<tr className="pr-tr-title">
						<td className="pr-sub-title" colSpan="5">
							{ primaryFeaturesTitle && primaryFeaturesTitle}
							{ !primaryFeaturesTitle && <span className="hidden-text" tabIndex='-1'>hidden</span>}
						</td>

					</tr>
					{ rowListShow && rowListShow.length > 0 &&
							rowListShow
					}
				</tbody>
			</table>
				{/* Table show/hide */}
				<div className="show-hide-act">
					<table className={"table-2 "}>
						<tbody>
							<tr className="pr-tr-title">
								<td className="pr-sub-title">
									{ secondaryFeaturesTitle && secondaryFeaturesTitle}
									{ !secondaryFeaturesTitle && <span className="hidden-text" tabIndex='-1'>hidden</span>}
								</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							{ rowListHidden && rowListHidden.length > 0 &&
								rowListHidden
							}
						</tbody>
					</table>
				</div>
				{/* End Table show/hide */}
				{ listBtnColumn && listBtnColumn.length > 0 &&
					<table className="table-3">
						<tbody>
							<tr className="pr-tr-title">
								<td></td>
								{
									listBtnColumn
								}
							</tr>
						</tbody>
					</table>
				}
				<div className={`show-more text-center ${this.state.showMore ? 'show' : ''}`}>
					<a href="#" onClick={(e) => { e.preventDefault(); this.showMoreAction() }} >
						{ this.state.showMore ?
							(
								<span>{btnShowLess}</span>
							) :
							(
								<span>{btnShowMore}</span>
							)
						}
						<span className="icomoon icon-down-menu"></span>
					</a>
				</div>
			</div>);
		return (
			<React.Fragment>
			<section className={`PricingPackagesModule pricing-package animation anima-fixed ${!this.state.loaded ? 'opacity-0' : ''}`}>
				<div className="container anima-bottom">
					{this.state.isMobile &&
						<BlockPriceMobile />
					}
					{!this.state.isMobile &&
						BlockPriceDesktop
					}
				</div>
			</section>
				<Spacing item={this.props.item}/>
				</React.Fragment>
		);
	}
}

export default ModuleWithQuery