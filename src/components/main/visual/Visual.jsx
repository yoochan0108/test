import './Visual.scss';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Visual() {
	const { data } = useSelector((store) => store.youtube);

	return (
		<section className='visual'>
			<Swiper>
				{data.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={idx}>
							<div className='visual'>
								<h2>{vid.snippet.title}</h2>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
}

export default Visual;
