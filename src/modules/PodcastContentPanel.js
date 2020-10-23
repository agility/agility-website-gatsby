import React from 'react';
import { renderHTML } from '../agility/utils'



import './PodcastContentPanel.scss'


const PodcastContentPanel = ({ item }) => {

	item = item.customFields;

	return (
		<section className="front-start p-w">
			<div className="canvas" id="canvas-1">
				<div className="img">

				</div>
			</div>

			<div className={item.enableBackgroundImage ? 'rotated-bg' : ''}></div>

			<div className="container-my">
			{item.imagePosition === 'left' && item.image &&
				<div className="start-image left">
					<img src={item.image.url + '?w=500&h=500'} alt={item.image.label} />
				</div>
			}

			<div className="start-content">
				<h1>{item.title}</h1>
				<div dangerouslySetInnerHTML={renderHTML(item.textblob)}></div>

				<div className="start-buttons">
					{item.primaryButton && item.primaryButton.href &&
					<a href={item.primaryButton.href} target={item.primaryButton.target} className="btn">{item.primaryButton.text}</a>
					}
					{item.secondaryButton && item.secondaryButton.href &&
					<a href={item.secondaryButton.href} target={item.secondaryButton.target} className="btn-link">{item.secondaryButton.text} <span><img src="https://static.agilitycms.com/layout/img/ico/gray.svg" alt={item.secondaryButton.text} /></span></a>
					}
				</div>
			</div>

			{item.imagePosition === 'right' &&
				<div className="start-image right">
					{item.image &&
						<img src={item.image.url + '?w=500&h=500'} alt={item.image.label} />
					}

					{item.podcastEmbedCode &&
						<div dangerouslySetInnerHTML={{ __html: item.podcastEmbedCode }}></div>
					}
				</div>
			}
			</div>


		</section>
	);
}

export default PodcastContentPanel;
