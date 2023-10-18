import './News.scss';
import { useState, useEffect } from 'react';

function News() {
	const dummyData = [
		{ title: 'title', content: 'Here comes content description in detaill.', data: new Date() },
		{ title: 'title', content: 'Here comes content description in detaill.', data: new Date() },
		{ title: 'title', content: 'Here comes content description in detaill.', data: new Date() },
		{ title: 'title', content: 'Here comes content description in detaill.', data: new Date() },
	];
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummyData;
	};
	const [Post, setPost] = useState(getLocalData());

	useEffect(() => {
		console.log(getLocalData());
		setPost(getLocalData());
	}, []);

	return (
		<section className='news'>
			<h2>News</h2>
			<div className='postWrap'>
				{Post.map((el, idx) => {
					if (idx >= 4) return null;
					else
						return (
							<article key={idx}>
								<h2>{el.title}</h2>
								<p>{el.content}</p>
							</article>
						);
				})}
			</div>
		</section>
	);
}

export default News;
