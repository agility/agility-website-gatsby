import React from 'react';
import './header-search.scss'
import { renderHTML } from '../agility/utils'

class HeaderSearch extends React.Component {



	constructor(props) {
		super(props);

		if (typeof window === 'undefined') {
			return;
		}

		this.handleOnChange = this.handleOnChange.bind(this);
		this.loadResults = this.loadResults.bind(this);
		this.loadMore = this.loadMore.bind(this);


		this.state = {
			results: [],
			fromNumber: 0,
			toNumber: 0,
			query: '',
			loading: false,
			count: 0,
			take: 1,
			skip: 0
		}
		this.abortController = null;

	}


	componentDidMount() {

		if (typeof window === 'undefined') {
			return;
		}

		this.timer = null;
		// console.log('load search')
		//dropdown Menu
		if (document) {
			this.abortController = new AbortController();

			//search
			// document.addEventListener('keydown', function (event) {
			// 	var key = event.key;
			// 	if ("Escape" === key) {
			// 		hideSearch();
			// 	}
			// });

		}
	}

	// componentWillMount() {

	// }

	loadMore() {
		this.loadResults(this.state.query, true);
	}

	loadResults(query, loadingMore) {
		let skip = loadingMore ? this.state.skip + this.state.take : 0;
		let formData = new FormData();
		formData.append('query', query);
		formData.append('top', this.state.take);
		formData.append('skip', skip);

		if (loadingMore) {
			this.setState({
				loading: true,
				query: query,
				skip: skip
			})
		} else {
			this.setState({
				loading: true,
				query: query,
				skip: skip,
				results: []
			})
		}


		this.abortController.abort();
		this.abortController = new AbortController();

		fetch('https://search.agilitycms.com/search', {
			method: 'post',
			body: formData,
			credentials: 'include',
			signal: this.abortController.signal,
			headers: {
				'as-WebsiteName': 'Agility CMS 2019',
				'as-AuthKey': 'W7aFIFyAAA48YxGLp-8b4pamVLGC7Lxqlrw2zR3RSI4'
			}
		}).then(response => response.json())
			.then(data => {
				if (data.IsError) {
					//something went wrong
					this.setState({
						loading: false,
						count: 0
					})
				} else if (data.ResponseData && data.ResponseData.Results) {
					//render results
					this.setState(prevState => ({
						loading: false,
						count: data.ResponseData.Count,
						results: loadingMore ? prevState.results.concat(
							data.ResponseData.Results.map(function (result) {
								return {
									title: result.Title,
									text: result.Description || result.Highlight,
									category: result.Category,
									href: result.Url
								}
							})
						) :
							data.ResponseData.Results.map(function (result) {
								return {
									title: result.Title,
									text: result.Description || result.Highlight,
									category: result.Category,
									href: result.Url
								}
							})
					}));
				} else {
					//no results
					this.setState({
						count: 0,
						loading: false
					})
				}
			}).catch(err => {
				if (err.name === "AbortError") {
					console.warn('aborted');
					return;
				}

				this.setState({
					loading: false,
					count: 0
				})

				console.warn("An error occurred while loading data...", err);
			});
	}

	handleOnChange(event) {
		var self = this;

		var query = event.target.value;

		self.setState(prevState => ({
			results: [],
			loading: false
		}));


		if (query.length >= 3) {

			clearTimeout(self.timer);

			self.timer = setTimeout(function () {
				self.loadResults(query);
			}, 300);

		} else {
			self.setState({
				query: null,
				results: [],
				loading: false
			})
		}
	}

	hideSearch() {
		if (document) {
			var searchFrame = document.querySelector('.search-frame');
			// console.log('searchFrame', searchFrame)
			searchFrame.classList.toggle('open');
			document.querySelector('html').classList.toggle('search-open');
			document.querySelector('button.open-search').classList.toggle('close');
		}
	}

	handleKeyUp(event) {

		var key = event.key;
		if ("Escape" === key) {
			this.hideSearch();
		}

	}



	render() {

		if (typeof window === 'undefined') {
			return <div className="search-frame"></div>;
		}

		var results = this.state.results.map(function (res, index) {
			return <HeaderSearchResult result={res} key={"res-" + index} />
		});



		return (
			<div className="search-frame">
				<div className="search-inner" onClick={this.hideSearch} onKeyUp={this.handleKeyUp.bind(this)} ></div>
				<div className="search-form">
					<form onSubmit={e => { e.preventDefault(); }}>
						<input className="search-input" type="text" placeholder="Search" onChange={this.handleOnChange} onKeyUp={this.handleKeyUp.bind(this)} />
						<span className="search-ico"></span>
						<span className="search-ico-mobile" onClick={this.hideSearch}></span>
					</form>
				</div>
				<div className="search-result">
					<div className="result-inner">
						<div className="results-quant">
							{this.state.loading && this.state.query &&
								<p>Searching for {this.state.query}...</p>
							}

							{
								!this.state.loading && this.state.query &&
								<p>Results for {this.state.query} (<span>{this.state.count}</span>) - Showing {this.state.results.length}</p>
							}
						</div>
						<div className="search-items">
							{results}

							{/* {
                                this.state.results && this.state.results.length > 0 && this.state.results.length < this.state.count && !this.state.loading &&
                                <div className="load-more-container">
                                    <a href="#" onClick={this.loadMore} className="btn">
                                        Load More
                                    </a>
                                </div>
                            }

                            {
                                this.state.results && this.state.results.length > 0 && this.state.loading &&
                                <div className="load-more-container">
                                    <a href="#" className="btn" disabled>
                                        Loading...
                                    </a>
                                </div>
                            } */}
						</div>
						<div className="result-footer">
							{this.props.siteSearchSettings && this.props.siteSearchSettings.searchProductPage &&
								<div dangerouslySetInnerHTML={renderHTML(this.props.siteSearchSettings.searchProductPage)}></div>
							}
						</div>
					</div>
				</div>
			</div>
		);

	}
}

class HeaderSearchResult extends React.Component {
	render() {

		//var category = this.props.result.category;
		//TODO: implement categories for real
		var category = this.props.result.category;
		if (category === null || category.length === 0) {

			if (this.props.result.href.indexOf("help.agilitycms.com") !== -1) {
				category = "Docs";
			} else {
				category = "Page";
			}
		}
		var categoryClass = 'label ' + category.toLowerCase();



		return (
			<a href={this.props.result.href} className="search-item d-flex ai-center jc-sb">

				<div className="si-left">
					<h3 className="h3">{this.props.result.title}</h3>
					<div className="url">{this.props.result.href}</div>
					<div className="text" dangerouslySetInnerHTML={{ __html: this.props.result.text }}></div>
				</div>
				<div className="si-right">
					<div className={categoryClass}>{category}</div>
				</div>
			</a>
		);
	}
}

export default HeaderSearch;