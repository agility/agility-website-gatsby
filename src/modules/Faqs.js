import React ,{ useRef,useEffect }  from 'react';
import { graphql, StaticQuery } from 'gatsby'
import Triangles from "../components/triangles.jsx";
import { renderHTML } from '../agility/utils'
import './Faqs.scss'
import { animationElementInnerComponent } from '../global/javascript/animation'


export default props => (
	<StaticQuery
		query={graphql`
		query FaqQuery {
			allAgilityFaqItem {
				nodes {
				  customFields {
					question
					answer
				  }
				  contentID
				  languageCode
				  properties {
					referenceName
					itemOrder
				  }
				}
			}
		}

        `}
		render={queryData => {


			//filter out only those logos that we want...
			let faqs = queryData.allAgilityFaqItem.nodes.filter(faq => {
				return faq.properties.referenceName.toLowerCase() === props.item.customFields.faqs.referencename.toLowerCase()
			}).sort((a, b) => {
				return a.properties.itemOrder - b.properties.itemOrder
			});

			const viewModel = {
				item: props.item,
				faqs: faqs
			}
			return (
				<Faqs {...viewModel} />
			);
		}}
	/>
)

const Faqs = ({ item, faqs }) => {

	let moduleItem = item;
	item = item.customFields;

	faqs = faqs.map(function (faq) {
		return <FaqsContent key={faq.contentID + "-" + moduleItem.contentID} item={faq.customFields}/>
	});

	const thisModuleRef = useRef(null)
	/* animation module */
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

		<section className="features p-w faqs animation" ref={ thisModuleRef }>
			<div className="container">
				<div className="headline-faq last-mb-none text-center anima-bottom">
					<h2>{item.title}</h2>
				</div>
				<div className="faqs-wrapper last-mb-none anima-bottom delay-3">
					{faqs}
				</div>
			</div>
		</section>


	);
}


const FaqsContent = ({ item }) => {
	const lazyRef = useRef(null)
	const checkFQA = (ref) => {
		if(window.innerWidth < 992) {
			let current = ref.current
			let content = current.querySelectorAll('.content')[0]
			if(current.classList.contains('open')) {
				current.classList.remove('open')
				content.style.height = '0'
			} else {
				current.classList.add('open')
				content.style.height = content.scrollHeight + 'px'
			}
		}
	}
	const resizeHeight = () => {
		if(window.innerWidth >= 992) {
			let open = document.querySelectorAll('.faq-item')
			if(open.length) {
				Array.from(open).forEach((ele) => {
					let content = ele.querySelectorAll('.content')[0]
					let height = 0
					Array.from(content.children).forEach((elem) => {
						height += (elem.scrollHeight + 30)
					})
					if (content !=  height - 15) {
						content.style.height = (height - 15 ) + 'px'
					}
				})
			}
		} else {
			let open = document.querySelectorAll('.faq-item:not(.open)')
			if(open.length) {
				Array.from(open).forEach((ele) => {
					let content = ele.querySelectorAll('.content')[0]
					content.style.height = '0px'
				})
			}
		}
	}
	useEffect(() => {
		resizeHeight()
		window.addEventListener('resize', resizeHeight)
		return () => {
			window.removeEventListener('resize', resizeHeight)
		}
  });
	return (
		<div ref={ lazyRef } className="faq-item" onClick={() => { checkFQA(lazyRef)}}>
			<h4>{item.question}</h4>
			<div className="content last-mb-none" dangerouslySetInnerHTML={renderHTML(item.answer)}></div>
		</div>
	);
}
