import React, { useEffect, useRef, useState } from 'react';
import { Link, graphql, StaticQuery } from "gatsby"
import Spacing from './Spacing'
import './PricingPackagesModule.scss'

export default props => (
	<StaticQuery
		query={graphql`
			query getPricingItems {
				allAgilityPackageFeatureValues {
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
				allAgilityPackageFeatures {
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
				allAgilityPricingPackages {
					nodes {
						customFields {
							cTAButtonLabel
							cost
							costLabel
							isMostPopular
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
			// order
			for(let i = 0; i < listPricingPackages.length - 1; i++) {
				if (listPricingPackages[i].properties.itemOrder > listPricingPackages[i + 1].properties.itemOrder) {
					const tam = listPricingPackages[i]
					listPricingPackages[i] = listPricingPackages[i + 1]
					listPricingPackages[i + 1] = tam
				}
			}
			/**end */
			/**row value */
			const packageFeatureValues = props.item.customFields.packageFeatureValues.referencename
			const listPackageFeatureValues = queryData.allAgilityPackageFeatureValues.nodes
			.filter(obj => { return obj.properties.referenceName === packageFeatureValues})
			const packageFeatureLabels = props.item.customFields.packageFeatureLabels.referencename
			const listPackageFeaturePrimary = queryData.allAgilityPackageFeatures.nodes
			.filter(obj => { return obj.properties.referenceName === packageFeatureLabels && obj.customFields.isPrimary && obj.customFields.isPrimary=== 'true'})
			const listPackageFeatureMore = queryData.allAgilityPackageFeatures.nodes
			.filter(obj => { return obj.properties.referenceName === packageFeatureLabels && !obj.customFields.isPrimary})
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

const HeaderColumn = ({priceType, title, label, btnCta, btnCtaLabel, value, hasPopular}) => {
	const classColor = ['free', 'standard', 'pro', 'enterprise']
	const popular = hasPopular && hasPopular === 'true' ? <span className={"most-popular"}><span className="icomoon icon-Star"></span>Most Popular</span>: ''
	const btnTitle = btnCta && btnCta.text && btnCta.text.length > 0 ? btnCta.text : btnCtaLabel
	/* insert ',' to number */
	const filterValue = (value) => {
		let newVal = [];
		for (let i = 0; i < value.length; i++) {
			newVal.push(value[value.length - 1 - i]);
			if (i % 3 === 2 && (i < value.length - 1)) {
				newVal.push(',');
			}
		}
		return newVal.reverse().join('');
	}
	return (
		<div className={'price-head ps-rv type-' + classColor[Number(priceType) % 4] }>
			<div className="price-type ps-rv">
				<span>{ title }</span>
				{ popular }
			</div>
			<div>
				<div className="price-value">
					<span>${ filterValue(value) }</span>
					<span className={`pr-month ${label ? '' : 'pr-hidden'}`}> {label}</span>
				</div>
				{ btnCta && btnCta.href && btnCta.href.length > 0 ?
					(
						<div>
							<a href={btnCta.href} target={btnCta.target} className="btn btn-arrow">{btnTitle} <span className="icomoon icon-arrow"></span></a>
						</div>
					): (
						<div>
							<a href="#" onClick={e => e.preventDefault()} className="btn btn-arrow">{btnTitle} <span className="icomoon icon-arrow"></span></a>
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
			return <span>{textVal}</span>
		}
		if (!textVal && checkedVal) {
			return  (checkedVal === 'true' ? <span className="icomoon icon-check"></span> : <span>-</span>);
		}
	}
	const rowFeatures = new Array(maxCol).fill(0).map((el, idx) => {
		if (props.features && props.features.length > 0 && props.features[idx]) {
			const featuresFields = props.features[idx].customFields
			return (
				<td key={idx} className={`type-${classColor[Number(idx) % 4]}`}>
					<div>{<CheckIsBoolean textVal={featuresFields.textValue} checkedVal={featuresFields.trueFalseValue} />}</div>
				</td>
			)
		}
		return (
			<td key={idx} className={`type-${classColor[Number(idx) % 4]}`}>
				<div><span>-</span></div>
			</td>
		)
	})
	return (
		<tr>
			{ title &&
				<td>{ title }</td>
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
		// console.log({showHideEle});
		// showHideEle.current.parentNode.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
		// });
		if (isMobile) {
			if (showMore) {
				showHideEle.current.style.height = showHideEle.current.scrollHeight + 'px';
			} else {
				showHideEle.current.style.height = '0px';
			}
		}
	}
	const showMoreAction = () => {
		setShowMore(!showMore);
	}
	useEffect(() => {
		checkShowHideElement();
		checkIsMobile();
		window.addEventListener('resize', () => {
			checkIsMobile();
		})
	})
	const fieldLabel = data.customFields
	const btnCtaMB = fieldLabel.cTAButton
	const btnCtaMBLabel = fieldLabel.cTAButtonLabel
	const costMB = fieldLabel.cost
	const costLabelMB = fieldLabel.costLabel
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
			<HeaderColumn priceType={priceType} title={titleMB} label={costLabelMB} btnCta={btnCtaMB} btnCtaLabel={btnCtaMBLabel} value={costMB} hasPopular={isMostPopularMB} />
			<div className="show-hide-table-mb" ref={showHideEle}>
				<table>
					<tbody>
						<tr className="pr-tr-title">
							<td colSpan="2" className="pr-sub-title">{primaryFeaturesTitle}</td>
						</tr>

						{ primaryShow && primaryShow.length > 0 &&
							primaryShow
						}
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
				return val.customFields.packageFeature.contentid === featureObj.itemID
			})
			for(let i = 0; i < listPricingPackages.length; i++) {
				const orderByPricing = listVal.find(el => el.customFields.pricingPackage.contentid === listPricingPackages[i].itemID)
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
				return fe.customFields.packageFeature.contentid === filObj.itemID && fe.customFields.pricingPackage.contentid === itemID
			})
			return filObj
		})
		const listMore = listFilterMore.map(fil => {
			const filObj = Object.assign({}, fil)
			filObj.featureVal = listPackageFeatureValues.find(fe => {
				return fe.customFields.packageFeature.contentid === filObj.itemID && fe.customFields.pricingPackage.contentid === itemID
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
			showMore: false,
			isMobile: false
		}
	}

	showMoreAction() {
		this.setState({showMore: !this.state.showMore});
	}
	checkIsMobile() {
		if (window.innerWidth <  1025) {
			this.setState({isMobile: true});
		} else {
			this.setState({isMobile: false});
		}
	}
	checkShowHideSection() {
		const section2 = document.querySelector('.show-hide-act');
		if (!this.state.isMobile) {
			if (this.state.showMore) {
				setTimeout(() => {
					section2.style.height = section2.scrollHeight + 'px'
				}, 100)

			} else {
				setTimeout(() => {
					section2.style.height = 0 + 'px'

				}, 100)
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

	componentDidMount() {
		console.log('value', this.props)
		this.checkIsMobile();
		const interCount = 0;
		let inter = setInterval(() => {
			this.equalHeightHeader();
			if (interCount > 9) {
				clearInterval(inter);
			}
		}, 200)

		this.checkShowHideSection();
		window.addEventListener('resize', () => {
			this.checkIsMobile();
			this.equalHeightHeader();
		})
	}
	componentDidUpdate() {
		this.checkShowHideSection();
	}
	render() {

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
			return (
				<th key={idx}>
					<HeaderColumn priceType={idx} title={title} label={costLabel} btnCta={btnCta} btnCtaLabel={btnCtaLabel} value={cost} hasPopular={isMostPopular} />
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
					{ btnCta && btnCta.href && btnCta.href.length > 0 ?
						(
							<a href={btnCta.href} target={btnCta.target} className={`btn btn-arrow btn-${classColor[idx % 4]}`}>{btnTitle} <span className="icomoon icon-arrow"></span></a>
						): (
							<a href="#" onClick={e => e.preventDefault()} className={`btn btn-arrow btn-${classColor[idx % 4]}`}>{btnTitle} <span className="icomoon icon-arrow"></span></a>
						)
					}
				</td>
			)
		}) : []


		const BlockPriceDesktop = (<div className="price-desktop">
					<table className="table-1">
						<tbody>
							<tr>
								<th></th>
								{ listHeaderColumn && listHeaderColumn.length > 0 &&
									listHeaderColumn
								}
							</tr>
							<tr className="pr-tr-title">
								{ primaryFeaturesTitle &&
									<td className="pr-sub-title">{primaryFeaturesTitle}</td>
								}
								<td></td>
								<td></td>
								<td></td>
								<td></td>
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
									{ secondaryFeaturesTitle &&
										<td className="pr-sub-title">{secondaryFeaturesTitle}</td>
									}
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
			<section className="PricingPackagesModule pricing-package animation">
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
