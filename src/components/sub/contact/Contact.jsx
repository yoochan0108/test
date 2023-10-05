import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { useRef, useEffect } from 'react';

export default function Contact() {
	const map = useRef(null);
	//현재 kakao객체를 cdn으로 가져오고 있기 때문에
	//리엑트 컴포넌트안쪽에서 window객체를 비구조화할당을 이용해서 수동으로 꺼내옴.
	const { kakao } = window;
	const mapOption = {
		center: new kakao.maps.LatLng(37.58474, 126.8855),
		level: 1,
	};
	const markerPosition = new kakao.maps.LatLng(37.58474, 126.8855);
	const marker = new kakao.maps.Marker({
		position: markerPosition,
	});

	useEffect(() => {
		const instance = new kakao.maps.Map(map.current, mapOption);
		marker.setMap(instance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<div className='map' ref={map}></div>
		</Layout>
	);
}
