import React, { useEffect, useState } from 'react';
import { renderHTML } from '../agility/utils'
import './SearchResults.scss'
import Helper from '../global/javascript/Helpers'
const SearchResults = ({ item }) => {
	const fields = item.customFields
	const noResult = fields.noResultsMessage
	const numTake = fields.resultCount
	const defaultTitle = fields.defaultContent
	const [results, setResults] = useState([])
	const [query, setQuery] = useState('')
	const [noRes, setNoRes] = useState(false)
	const [totalItem, setTotalItem] = useState(0)
	const [loading, setLoading] = useState(true)
	const [clearInput, setClear] = useState(0)
	const [skip, setSkip] = useState(0)
	const [showLoading, setShowLoading] = useState(false)
	const [showLoadMore, setShowLoadMore] = useState(false)
	const classinput = `icomoon icon-uncheck clear-input ${ clearInput === 1 ? 'show' : ''}`
	const classR = `SearchResults ${ loading === false ? 'done-search' : ''}`
	const loadResults = (queryData, more = false) => {
		const skipSearch = more ? Number(skip) + Number(numTake) : 0;
		const formData = new FormData()
		formData.append('query', queryData)
		formData.append('top', numTake)
		formData.append('skip', skipSearch)
		const abort = new AbortController()
		setSkip(skipSearch)
		fetch('https://search.agilitycms.com/search', {
			method: 'post',
			body: formData,
			credentials: 'include',
			signal: abort.signal,
			headers: {
				'as-WebsiteName': 'Agility CMS 2019',
				'as-AuthKey': 'W7aFIFyAAA48YxGLp-8b4pamVLGC7Lxqlrw2zR3RSI4'
			}
		}).then(response => response.json())
		.then(data => {
			setLoading(false)
			if (data.IsError) {
				//something went wrong
				setNoRes(true)
				setResults([])
				setTotalItem(0)
				setLoading(false)
				setShowLoadMore(false)
				setShowLoading(false)
			} else if (data.ResponseData && data.ResponseData.Results) {
				setNoRes(false)
				const listRes = data.ResponseData.Results.map(function (result) {
					return {
						title: result.Title,
						text: result.Description || result.Highlight,
						category: result.Category,
						href: result.Url
					}
				})
				if (more) {
					setResults(results.concat(listRes))
				} else {
					setResults(listRes)
				}
				if (Number(data.ResponseData.ToNumber) < Number(data.ResponseData.Count)) {
					setShowLoadMore(true)
				} else {
					setShowLoadMore(false)
				}
				const posScroll = data.ResponseData.ToNumber - Number(numTake) > 0 ? data.ResponseData.ToNumber - Number(numTake) : 0
				if (posScroll > 0) {
					const el = document.querySelectorAll('.item-result')[posScroll]
					const offsetTop = el.offsetTop - el.clientHeight - document.querySelectorAll('#header')[0].offsetHeight + 90
					// window.scrollTo({top: offsetTop, behavior: 'smooth'})
					Helper.animateScrollTop(offsetTop, 350)
				}
				setShowLoading(false)
				setTotalItem(data.ResponseData.Count)
				if(queryData !== '') {
					setClear(1)
				} else {
					setClear(0)
				}
			} else {
				setNoRes(true)
				setResults([])
				setTotalItem(0)
				setShowLoadMore(false)
				setShowLoading(false)
			}
			abort.abort()
		})
	}

  const handleSubmit = (e) => {
		e.preventDefault()
		if (query && query.trim().length > 0) {
			setLoading(true)
			loadResults(query, false)
		} else {
			setQuery('')
			setClear(0)
		}
	}

	const listResult = results.map((s, idx) => {
		const className = `item-result small-paragraph last-mb-none ${skip - numTake > 0 && skip - numTake === idx ? 'active-scroll' : '' }`
		return (
			<div className={className} key={idx}>
				<h3><a href={s.href}>{s.title}</a></h3>
				<h4><a href={s.href}>{s.href}</a></h4>
				<div dangerouslySetInnerHTML={renderHTML(s.text)}></div>
			</div>
		)
	})

	const handleChange = ({ target }) => {
		setQuery(target.value)
	}

	const loadMore = (e) => {
		e.preventDefault()
		setShowLoading(true)
		loadResults(query, true)
	}

	const handleKeyUp = ({ target }) => {
		if(query !== '') {
			setClear(1)
		} else {
			setResults([])
			setTotalItem(0)
			setClear(0)
			setShowLoadMore(false)
		}
	}
	const clickClear = () => {
		setClear(0)
		setQuery('')
		setResults([])
		setTotalItem(0)
		setShowLoadMore(false)
	}
  useEffect(() => {
		const controller = new AbortController()
		if (typeof window !== 'undefined') {
			const urlSearch = new URLSearchParams(window.location.search)
			const paramsSearch = urlSearch.get('s')
			if (paramsSearch && paramsSearch.length > 0) {
				setQuery(paramsSearch)
				loadResults(paramsSearch, false)
			} else {
				setLoading(false)
			}
		}
		return () => {
			controller.abort()
		}
  }, [])
	return (
		<section className={classR}>
			<div className='container'>
				<div className='text-center box-search'>
					<h1>Search results for</h1>
					<form onSubmit={(e) => {handleSubmit(e)}}>
						<input className="search-input" value={query} onKeyUp={(target) => {handleKeyUp(target)}} onChange={(target) => {handleChange(target)}} type="text" placeholder="Search"/>
						<button type="submit">
							<img src="/images/search-white.svg" alt="search"></img>
						<span className="sr-only">Search</span>
						</button>
						<span className={classinput} onClick={() => clickClear()}></span>
					</form>
				</div>
				<div className='loading-search text-center'>
					<img src="/images/ajax-loader.svg" alt='loading'></img>
				</div>
				<div className='box-result-search'>
					<div className='small-paragraph last-mb-none number-result'>
						{ totalItem > 0 &&
							<p>{results.length > totalItem ? totalItem : results.length} of {totalItem} results</p>
						}
					</div>
					<div>
						{ query.length > 0 && noRes && noResult &&
							<h3 className='text-center'>{noResult}</h3>
						}
						{ query === '' &&
						  <div dangerouslySetInnerHTML={renderHTML(defaultTitle)}></div>
						}
						{ listResult && listResult.length > 0 &&
							listResult
						}
					</div>
					{ showLoadMore &&
						<div className="search-btn text-center ps-rv">
							<button type="button" className={`btn text-decoration-none btn btn-outline-primary ${showLoading ? 'loading-btn' : ''}`} onClick={(e) => {
								loadMore(e)
							}} >
								Load More
							</button>
							<img src="/images/ajax-loader.svg" className='load-more-search' alt="loading"></img>
						</div>
					}
					<div></div>
				</div>
			</div>
			<div className='space-60 space-dt-100'></div>
		</section>
	);
}

export default SearchResults;
