import './styles/Global.scss';

import { Route, Switch } from 'react-router-dom';
import Header from './components/common/header/Header';
import Department from './components/sub/department/Department';
import Youtube from './components/sub/youtube/Youtube';
import Members from './components/sub/members/Members';
import Gallery from './components/sub/gallery/Gallery';
import Contact from './components/sub/contact/Contact';
import Detail from './components/sub/youtube/Detail';
import Community from './components/sub/community/Community';
import Main from './components/main/mainWrap/Main';
import { useMedia } from './hooks/useMedia';
import { useEffect } from 'react';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchFlickr } from './redux/flickrSlice';
import { useDispatch } from 'react-redux';
import Menu from './components/common/menu/Menu';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		//컴포넌트 마운트시 fetchYoutube가 반환한 action객체를 dispatch함수를 통해서 리듀서에 전달
		dispatch(fetchYoutube());
		dispatch(fetchFlickr({ type: 'user', id: '199272370@N07' }));
	}, []);
	return (
		<main className={useMedia()}>
			<Switch>
				<Route exact path='/'>
					<Header isMain={true} />
					<Main />
				</Route>
				<Route path='/'>
					<Header isMain={false} />
				</Route>
			</Switch>
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/community' component={Community} />
			<Route path='/detail/:id' component={Detail} />
			<Menu />
		</main>
	);
}

export default App;
