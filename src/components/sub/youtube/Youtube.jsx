import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useEffect, useState } from 'react';

export default function Youtube() {
	const [Youtube, setYoutube] = useState([]);

	const fatchYoutube = () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
		const pid = 'PLuPg_rytnr6k-sPrYGREjbXLMZzwE7-N-&si=c72x_0iZr-7tHUMA';
		const num = 5;
		const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		fetch(resultURL)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				setYoutube(json.items);
			});
	};
	useEffect(() => {
		fatchYoutube();
	}, []);

	return (
		<Layout title={'Youtube'}>
			{Youtube.map((data, idx) => {
				return (
					<article key={idx}>
						<p>test</p>
						<h2>{data.snippet.title}</h2>
						<p>{data.snippet.description}</p>
						<div className='pic'>
							<img src={data.snippet.thumbnails.standard.url} alt={data.title} />
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
