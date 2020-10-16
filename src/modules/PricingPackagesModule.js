import React, { useEffect, useState } from 'react';

import './PricingPackagesModule.scss'


const HeaderColumn = ({priceType, title, value, hasPopular}) => {

	const popular = hasPopular ? <span className={"most-popular"}><span className="icomoon icon-Star"></span>Most Popular</span>: '';

	return (
		<div className={'price-head ps-rv type-' + priceType }>
			<div className="price-type ps-rv">
				<span>{ title }</span>
				{ popular }
			</div>
			<div>
				<div className="price-value">
					<span>${ value }</span><span className="pr-month"> /month</span>
				</div>
				<div>
					<a href="#" className="btn btn-arrow">Sign up now</a>
				</div>
			</div>
		</div>
	);
}

const RowItem = ({title, freeValue, standardValue, proValue, enterpriseValue}) => {

	const checkIsBoolean = (value) => {
		if (typeof(value) === 'boolean') {
			return  (value ? <span className="icomoon icon-check"></span> : '-');
		}
		return value;
	}

	freeValue = checkIsBoolean(freeValue);
	standardValue = checkIsBoolean(standardValue);
	proValue = checkIsBoolean(proValue);
	enterpriseValue = checkIsBoolean(enterpriseValue);

	return (
		<tr>
			<td>{ title }</td>
			<td>
				<div className="type-free"><span>{ freeValue }</span></div>
			</td>
			<td>
				<div className="type-standard"><span>{ standardValue }</span></div>
			</td>
			<td>
				<div className="type-pro"><span>{ proValue }</span></div>
			</td>
			<td>
				<div className="type-enterprise"><span>{ enterpriseValue }</span></div>
			</td>
		</tr>
	);
}


const RowItemMobile = ({title, value, typeValue}) => {
	let valueResult = value;
	if (typeValue === 'boolean') {
		valueResult = value ? <span className="icomoon icon-check"></span> : '-';
	}

	return (
		<tr>
			<td>{ title }</td>
			<td>
				<div><span>{ valueResult }</span></div>
			</td>
		</tr>
	);
}

/* Price Item Mobile */
const PriceItemMobile = ({priceType}) => {
	
	const [showMore, setShowMore] = useState(false);

	const showMoreAction = () => {
		setShowMore(!showMore);
	}

	return (
		<div className={`price-item-mb item-${priceType} ` + (!showMore ? '' : 'is-show-more') }>
			<HeaderColumn priceType={priceType} title={"Free"} value={"0"} hasPopular={false} />
			<table className={!showMore ? 'd-none' : ''}>

				<tr className="pr-tr-title">
					<td colSpan="2" className="pr-sub-title">Core Agility Features</td>
				</tr>
				<RowItemMobile title="User" value="5" />
				<RowItemMobile title="User" value="Unlimited" />
				<RowItemMobile title="User" value="Unlimited" />
				<RowItemMobile title="User" value="Unlimited" />
				<tr className="pr-tr-title">
					<td colSpan="2" className="pr-sub-title">Core Agility Features</td>
				</tr>
				<RowItemMobile title="User" value={true} typeValue="boolean" />
				<RowItemMobile title="User" value={false} typeValue="boolean" />
				<RowItemMobile title="User" value={false} typeValue="boolean" />
				<RowItemMobile title="User" value={false} typeValue="boolean" />

			</table>
			<div className="show-more-mb text-center" onClick={ () => { showMoreAction() } }>
				<span className="icomoon icon-arrow"></span>
			</div>
		</div>
	)
}


const PricingPackagesModule = ({ item }) => {

	//item = item.customFields;
	console.log("PricingPackagesModule", item)

	const [showMore, setShowMore] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const showMoreAction = () => {
		setShowMore(!showMore);
	}
	const checkIsMobile = () => {
		if (window.innerWidth <  1025) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}

	useEffect(() => {
		checkIsMobile();
		window.addEventListener('resize', () => {
			checkIsMobile();
		})
	})

	const BlockPriceMobile = () => {
		return (
			<div className="price-mobile">
				<PriceItemMobile priceType={'free'} />
				<PriceItemMobile priceType={'standard'} />
				<PriceItemMobile priceType={'pro'} />
				<PriceItemMobile priceType={'enterprise'} />
			</div>
		)
	}

	const BlockPriceDesktop = () => {
		return (
			<div className="price-desktop">
				<table className="table-1">
					<tr>
						<th></th>
						<th><HeaderColumn priceType="free" title={"Free"} value={"10"} hasPopular={false} /></th>
						<th><HeaderColumn priceType="standard" title={"Standard"} value={"20"} hasPopular={false} /></th>
						<th><HeaderColumn priceType="pro" title={"Pro"} value={"0"} hasPopular={true} /></th>
						<th><HeaderColumn priceType="enterprise" title={"Enterprise"} value={"100"} hasPopular={false} /></th>
					</tr>
					<tr className="pr-tr-title">
						<td className="pr-sub-title">Core Agility Features</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<RowItem title="User" freeValue={"5"} standardValue={"5"} proValue={"Unlimited"} enterpriseValue={"Unlimited"} />
					<RowItem title="Content Items" freeValue={"5"} standardValue={"5"} proValue={"Unlimited"} enterpriseValue={"Unlimited"} />
					<RowItem title="Languages (locales)" freeValue={"5"} standardValue={"5"} proValue={"Unlimited"} enterpriseValue={"Unlimited"} />
					<RowItem title="Storage" freeValue={"1GB"} standardValue={"5GB"} proValue={"Unlimited"} enterpriseValue={"Unlimited"} />
				</table>


				{/* Table show/hide */}
				<table className={"table-2 " + (!showMore ? 'd-none' : '')}>
					<tr className="pr-tr-title">
						<td className="pr-sub-title">Core Agility Features</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<RowItem title="User" freeValue={true} standardValue={true} proValue={"Unlimited"} enterpriseValue={"Unlimited"} />
					<RowItem title="Content Items" freeValue={false} standardValue={"5"} proValue={"Unlimited"} enterpriseValue={"Unlimited"} />
					<RowItem title="Languages (locales)" freeValue={false} standardValue={"5"} proValue={"Unlimited"} enterpriseValue={"Unlimited"} />
					<RowItem title="Storage" freeValue={false} standardValue={"5GB"} proValue={"Unlimited"} enterpriseValue={"Unlimited"} />
				</table>
				{/* End Table show/hide */}


				<table className="table-3">
					<tr className="pr-tr-title">
						<td></td>
						<td>
								<a href="#" className="btn btn-arrow btn-free">Sign up now</a>
						</td>
						<td>
								<a href="#" className="btn btn-arrow btn-standard">Sign up now</a>
						</td>
						<td>
								<a href="#" className="btn btn-arrow btn-pro">Sign up now</a>
						</td>
						<td>
								<a href="#" className="btn btn-arrow btn-enterprise">Sign up now</a>
						</td>
						
					</tr>
				</table>
				<div className="show-more text-center">
					<a href="javascript:;" onClick={() => { showMoreAction() }} ><span>Show more plan offerings</span> <span className="icomoon icon-chevron-down"></span></a>
				</div>
			</div>
		)
	}

	return (
		<section className="PricingPackagesModule pricing-package">
			<div className="container">

				{isMobile &&
					<BlockPriceMobile />
				}
				{!isMobile &&
					<BlockPriceDesktop />
				}

			</div>
		</section>
	);
}


export default PricingPackagesModule;
