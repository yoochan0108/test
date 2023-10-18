import './Info.scss';
import { useSelector } from 'react-redux';

function Info() {
	const { data } = useSelector((store) => store.flickr);
	return (
		<section className='info'>
			<div className='wrap'>
				{data.map((pic, idx) => {
					return (
						<article key={idx}>
							<img
								src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
								alt={pic.title}
							/>
						</article>
					);
				})}
			</div>
			{/* <div className='wrap'>
				<article>1</article>
				<article>2</article>
				<article>3</article>
				<article>4</article>
				<article>5</article>
				<article>6</article>
			</div> */}
		</section>
	);
}

export default Info;
