import React, { useEffect, useState } from 'react';
import { renderHTML } from '../agility/utils'
import './SearchResults.scss'

const SearchResults = ({ item }) => {
	const fields = item.customFields
	const noResult = fields.noResultsMessage
	const numTake = fields.resultCount
	const defaultTitle = fields.defaultContent
	const pagingDisplay = 4
	const [results, setResults] = useState([])
	const [query, setQuery] = useState('')
	const [noRes, setNoRes] = useState(false)
	const [paging, setPaging] = useState(0)
	const [totalItem, setTotalItem] = useState(0)
	const [loading, setLoading] = useState(0)
	const [clearInput, setClear] = useState(0)
	const classinput = `icomoon icon-uncheck clear-input ${ clearInput === 1 ? 'show' : ''}`
	const classR = `SearchResults ${ loading === 1 ? 'done-search' : ''}`
	// console.log('SearchResults', item)
	const loadResults = (queryData, pagingNum) => {
		const skipSearch = pagingNum ? (pagingNum - 1) * Number(numTake) : 0;
		const formData = new FormData()
		formData.append('query', queryData)
		formData.append('top', numTake)
		formData.append('skip', skipSearch)
		const abort = new AbortController()
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
			setLoading(1)
			if (data.IsError) {
				//something went wrong
				setNoRes(true)
				setResults([])
				setTotalItem(0)
				setLoading(0)
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
				setResults(listRes)
				setQuery(queryData)
				setPaging(pagingNum || 1)
				setTotalItem(data.ResponseData.Count)
				window[`scrollTo`]({ top: 0, behavior: `smooth` })
				if(queryData !== '') {
					setClear(1)
				} else {
					setClear(0)
				}
			} else {
				setNoRes(true)
				setResults([])
				setTotalItem(0)
			}
			abort.abort()
		})
	}

  const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(0)
		loadResults(query)
	}

  const handlePaging = (idx, specialNum = null) => {
		let pagingShow = null
		if (idx !== 0)
		{
			pagingShow = Number(idx)
		}
		if(!!specialNum) {
			pagingShow = paging + Number(specialNum)
		}
		loadResults(query, pagingShow)
	}


	const listResult = results.map((s, idx) => {
		return (
			<div className='item-result small-paragraph last-mb-none' key={idx}>
				<h3>{s.title}</h3>
				<h4><a href={s.href}>{s.href}</a></h4>
				<div dangerouslySetInnerHTML={renderHTML(s.text)}></div>
			</div>
		)
	})

	const PagingList = () => {
		const pageItem = []
		const totalPage = Math.floor(totalItem / numTake) +  (totalItem % numTake > 0 ? 1 : 0)
		const classDisable = 'disable-paging'
		const classDoubleBack = `page-item ${paging <= 2 ? classDisable: ''}`
		const classSingleBack = `page-item ${paging === 1 ? classDisable : ''}`
		const classDoubleNext = `page-item ${paging + 2 > totalPage ? classDisable : ''}`
		const classSingleNext = `page-item ${paging + 1 > totalPage ? classDisable : ''}`
		/** calc first and last value paging */
		let maxLeft = (paging - Math.floor(pagingDisplay / 2))
		let maxRight = (paging + Math.floor(pagingDisplay / 2))
    if (maxLeft < 1) {
			maxLeft = 1
			maxRight = pagingDisplay
		}
		if (maxRight > totalPage) {
			maxLeft = totalPage - (pagingDisplay - 1)
			if (maxLeft < 1){
				maxLeft = 1
			}
			maxRight = totalPage
		}
		/** end */
		for( let i = maxLeft; i <= maxRight; i++) {
			const classPaging = `page-item ${paging === i ? 'acitve' : ''}`
			pageItem.push(
				<li className={classPaging} key={i} data-paging={i} onClick={(e) => { e.preventDefault(); handlePaging(i) }}>
					<span>{i}</span>
				</li>
			)
		}
		return (
			<nav>
				<ul className="pagination">
					<li className={classDoubleBack} onClick={(e) => { e.preventDefault(); handlePaging(1) }}>
						<a className="page-link page-double-prev style-double style-prev" href="#">
							<span className="icomoon icon-arrow"></span>
						</a>
					</li>
					<li className={classSingleBack} onClick={(e) => { e.preventDefault(); handlePaging(0, -1) }}><a className="page-link page-prev style-prev" href="#"><span className="icomoon icon-arrow"></span></a></li>
					{ pageItem && pageItem.length > 0 &&
						pageItem
					}
					<li className={classSingleNext} onClick={(e) => { e.preventDefault(); handlePaging(0, 1) }}><a className="page-link page-next" href="#"><span className="icomoon icon-arrow"></span></a></li>
					<li className={classDoubleNext} onClick={(e) => { e.preventDefault(); handlePaging(Number(totalPage)) }}><a className="page-link page-double-next style-double" href="#"><span className="icomoon icon-arrow"></span></a></li>
				</ul>
			</nav>
		)
	}

	const handleChange = ({ target }) => {
		setQuery(target.value)
	}
	const handleKeyUp = ({ target }) => {
		if(query !== '') {
			setClear(1)
		} else {
			setResults([])
			setTotalItem(0)
			setPaging(0)
			setClear(0)
		}
	}
	const clickClear = () => {
		setClear(0)
		setQuery('')
		setResults([])
		setTotalItem(0)
		setPaging(0)
	}
  useEffect(() => {
		const controller = new AbortController()
		if (typeof window !== 'undefined') {
			const urlSearch = new URLSearchParams(window.location.search)
			const paramsSearch = urlSearch.get('s')
			if (paramsSearch && paramsSearch.length > 0) {
				setQuery(paramsSearch)
				loadResults(paramsSearch)
			} else {
				setLoading(1)
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
						<input className="search-input" value={query} onKeyUp={(target) => {handleKeyUp(target)}} onInput={(target) => {handleChange(target)}} type="text" placeholder="Search"/>
						<button type="submit">
							<img src="/images/search-white.svg" alt="search"></img>
						<span className="sr-only">Search</span> <span className="badge badge-primary"></span>
						</button>
						<span className={classinput} onClick={() => clickClear()}></span>
					</form>
				</div>
				<div className='loading-search text-center'>
					<img src="../images/ajax-loader.svg" alt='loading'></img>
				</div>
				<div className='box-result-search'>
					<div className='small-paragraph last-mb-none number-result'>
						{ totalItem > 0 &&
							<p>{numTake > totalItem ? totalItem : numTake} of {totalItem} results</p>
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
					{ results && results.length > 0 && totalItem > numTake &&
						<PagingList/>
					}
					<div></div>
				</div>
			</div>
		</section>
	);
}

export default SearchResults;
