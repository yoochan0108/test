import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const api_key = 'b6c85d56ee255dee970b2241f275f09d';
	const method_interest = 'flickr.interestingness.getList';
	const num = 50;
	const url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;

	useEffect(() => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.photos.photo);
				setPics(json.photos.photo);
			});
	}, []);
	return (
		<Layout title={'Gallery'}>
			<div className='picFrame'>
				<Masonry
					elementType={'div'}
					options={{ masonryOptions: '0,5s' }}
					disableImagesLoaded={false}
					updateOnEachImageLoad={false}
				>
					{Pics.map((data, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<img
										src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
									/>
									<h2>{data.title}</h2>

									<div className='inner'>
										<img
											className='pic'
											src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.secret}.jpg`}
											alt={data.onner}
										/>
										<span>{data.onner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
