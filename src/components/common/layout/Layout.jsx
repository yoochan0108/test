/*
	1.layout.jsx를 왜 만들었는지 설명
*/

import './Layout.scss';

export default function Layout({ title, children }) {
	return (
		<section className={`layout ${title} `}>
			<div className='content'>
				<h1>{title}</h1>
				{children}
			</div>
		</section>
	);
}

/*
	1.리액트로 개발하는 프로젝트가 대단위 페이지이기 때문에 틀안에서 특정 변화점이
	생겼을때 유지보수 편하게 하려고 작성했다.
*/
