import React from 'react';
import { Link } from "gatsby"
import './filtered-listing.scss'
import ResponsiveImage from './responsive-image.jsx'
import StringUtils from "../utils/string-utils"


class FilteredListing extends React.Component {

	constructor(props) {
		super(props)

		this.filter = props.filter;

		this.labelClick = this.labelClick.bind(this);

		//init state from props
		this.state = {
			items: this.props.items,
			skip: 0,
			take: 0,
			ids: "",
			loadingMore: false,
			noMoreData: false
		};

	}

	componentDidMount() {

	}


	labelClick(elem) {

		var target = elem.target;

		target.classList.toggle('active');

		var parent = target.parentNode;

		var selectedNodes = parent.getElementsByClassName("active");
		var selectedIDs = [];

		for (var i = 0; i < selectedNodes.length; i++) {
			let filterID = parseInt(selectedNodes[i].getAttribute('data-key'));
			selectedIDs.push(filterID);
		}

		const newItems = this.filter(selectedIDs);


		 this.setState(prevState => ({
		  			items: newItems
		 }));

	}


	render() {

		let moduleItem = this.props.item;
		let item = moduleItem.customFields;

		let resources = this.state.items.map(function (r) {
			return <FilteredListingItem item={r} key={r.contentID + "-res"} />
		});


		var self = this;

		let labels = this.props.types.map(function (t) {
			let key = t.contentID + "-" + moduleItem.contentID;

			return (<button key={key} data-key={t.contentID} className="latest-filter" onClick={self.labelClick}>{t.customFields.title}</button>);
		});

		return (

			<section className="features p-w filtered-listing">

				<h2 className="title-component">{item.title}</h2>
				<p className="intro">{item.subTitle}</p>
				<div className="container-my">
					<div className="listing-wrapper">

						<div className="listing-left">
							<div className="item-type-picker">
								<h3 className="h3">{item.leftTopTitle}</h3>
								<div className="assets">{labels}</div>
								<h3 className="h3">{item.leftTypeTitle}</h3>
								<Link className="btn" to={item.leftButton.href} target={item.leftButton.target}>{item.leftButton.text}</Link>
							</div>
						</div>

						<div className="listing-right">
						<div className="listing-items">
							{this.state.loadingMore &&
								<div>Loading... </div>
							}
							{!this.state.loadingMore &&
								resources
							}
						</div>
						</div>
					</div>
				</div>

			</section>
		);
	}
}
export default FilteredListing;


const FilteredListingItem = ({ item }) => {

	item = item.customFields;

	let excerpt = item.excerpt;
	if (excerpt) {
		excerpt = StringUtils.stripHtml(excerpt, 160);
	}

	return (

		<div className="filtered-listing-item">
			<Link to={item.url}>
				<div className="image">
					<ResponsiveImage img={item.image}
						breaks={[{ w: 768, h: 433, max: 800 }, { w: 768, h: 433, min: 800 }, { w: 480, h: 277, min: 1190 }]} />
					{item.label &&
						<span>{item.label}</span>
					}

				</div>
			</Link>
			<div className="content">
			<Link to={item.url}><h4 className="h4">{item.title}</h4></Link>
				<p>{excerpt}</p>
			</div>
			<div className="read-more">
				<Link to={item.url}>Read More</Link>
			</div>
		</div>

	);

}