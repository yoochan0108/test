//해당 페이지에서 설명해보라, 혹시 이슈사항은 없었는지?

import Layout from '../../common/layout/Layout';
import './Community.scss';
import { useRef, useState, useEffect } from 'react';

export default function Community() {
	const dummyData = [
		{ title: 'title', content: 'Here comes content description in detaill.', data: new Date() },
		{ title: 'title', content: 'Here comes content description in detaill.', data: new Date() },
		{ title: 'title', content: 'Here comes content description in detaill.', data: new Date() },
		{ title: 'title', content: 'Here comes content description in detaill.', data: new Date() },
	];
	//로컬데이터의 값을 parsing해서 반환하는 함수
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummyData;
	};
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const refEditInput = useRef(null);
	const refEditTextarea = useRef(null);
	//해당 컴포넌트가 처음 마운트시에는 로컬저장소에 값이 없기 때문에 빈배열 리턴
	//저장소에 값이 있으면 해당값을 parsing된 데이터가 있는 배열값을 리턴
	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);
	console.log(Posts);

	const resetForm = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};
	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		//기존 Posts 배열값을 Deep copy해서 가져온뒤, 그 뒤에 추가로 방금 입력한 객체를 배열에 추가
		setPosts([
			{
				title: refInput.current.value,
				content: refTextarea.current.value,
				data: new Date(),
			},
			...Posts,
		]);
		resetForm();
	};

	const deletePost = (delIndex) => {
		if (window.confirm('정말 해당 게시글을 삭제하겠습니까?')) {
			//기존 Posts배열을 반복 돌면서 인수로 전달된 삭제 순번값과 현재 반복되는 배열의 순번값이 같지 않은 것만 리턴
			setPosts(Posts.filter((_, idx) => delIndex !== idx));
		}
	};

	//해당 글을 수정모드로 변경시키는 함수
	const enableUpdate = (editIndex) => {
		//수정모드 함수 호출시 Allowed가 true가 아니면 return으로 함수 강제 종료
		if (!Allowed) return;
		//일단 수정모드에 진입하면 강제로 Allowed값을 false로 변경해서 다른 글 수정모드 진입금지 처리
		setAllowed(false);
		setPosts(
			//Posts 배열값을 반복돌면서 인수로 전달된 수정할 포스트의 순번값과 현재 반복도는 배열의 포스트 순번값이 일치하면
			//해당 글을 수정처리해야되므로 해당 객체에 enableUpdate=true값을 추가
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = true;
				return post;
			})
		);
	};

	//해당 글을 출력모드로 변경시키는 함수
	const disableUpdate = (editIndex) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = false;
				return post;
			})
		);
	};

	//실제 글 수정하는 함수
	const updatePost = (updateIndex) => {
		//setPosts로 기존 Post배열같은 덮어쓰기해서 변경
		//리액트에서는 참조형 자료는 무조건 배열값을 Deep copy한뒤 변경
		setPosts(
			Posts.map((post, idx) => {
				if (updateIndex === idx) {
					post.title = refEditInput.current.value;
					post.content = refEditTextarea.current.value;
				}
				return post;
			})
		);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout title={'Community'}>
			<div className='inputBox'>
				<input ref={refInput} type='text' placeholder='제목을 입력하세요.' />
				<br />
				<textarea ref={refTextarea} cols='30' rows='3' placeholder='본문을 입력하세요.'></textarea>

				<nav className='btnSet'>
					<button onClick={resetForm}>cancel</button>
					<button onClick={createPost}>write</button>
				</nav>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					const string = JSON.stringify(post.data);

					const [year, month, date] = string.split('T')[0].split('"')[1].split('-');

					let [hour, min, sec] = string.split('T')[1].split('.')[0].split(':');
					hour = parseInt(hour) + 9;
					hour >= 24 && (hour = hour - 24);

					if (post.enableUpdate) {
						//수정 모드 렌더링
						return (
							<article key={idx}>
								<div className='txt'>
									<input type='text' defaultValue={post.title} ref={refEditInput} />
									<br />
									<textarea
										//react에서 value속성을 적용하려면 무조건 onChange이벤트 연결 필수
										//onChange이벤트 연결하지 않을때에는 value가닌 defaultValue속성 적용
										defaultValue={post.content}
										ref={refEditTextarea}
									/>
								</div>
								<nav className='btnSet'>
									<button onClick={() => disableUpdate(idx)}>Cancel</button>
									<button
										onClick={() => {
											updatePost(idx);
											disableUpdate(idx);
										}}
									>
										Update
									</button>
								</nav>
							</article>
						);
					} else {
						//출력 모드 렌더링

						return (
							<article key={idx}>
								<div className='txt'>
									<h2>{post.title}</h2>
									<p>{post.content}</p>
									<p>{`글 작성일 : ${year}-${month}-${date}`}</p>
									<p>{`글 작성시간 : ${hour}:${min}:${sec}`}</p>
								</div>

								<nav className='btnSet'>
									<button onClick={() => enableUpdate(idx)}>Edit</button>
									<button onClick={() => deletePost(idx)}>Delete</button>
								</nav>
							</article>
						);
					}
				})}
			</div>
		</Layout>
	);
}

//아직 데이터베이스를 배우진 않았지만 CRUD기능을 구현하고싶어서 로컬저장소를 활용해서 만들어 봤다.
//이슈사항으로는 시간값을 가져왔는데 로컬 저장소에 글이 저장되는 시점의 시간을 표준시로 저장을 해서 현재시간보다 9시간이 늦은 시간으로 출력되는 문제가 있었다.
//시간값을 변경하려고 보니 JSON.parse로 객체형태로 시간을 불러와져서 split 매서드를 쓸수가 없는데 이유를 몰라서 삽질했다.
//객체형태로 변환된 값을 다시 stringify로 문자화시킨다음에 split으로 문자값 가공하고 다시 화면에 출력
//두번째 이슈사항으로 친구컴퓨터로 내 작업물을 확인해보니 해당 브라우저에는 저장된 데이터가 없어서 커뮤니티페이지가 빈화면으로 출력되는 이슈 --> 로컬저장소에 값이 없을때 더미 데이터가 출력되도록 했다.
