import './Modal.scss';
import { forwardRef, useImperativeHandle, useState } from 'react';
//forwardRef : forwardRef((props, ref)=>)
//forwardRef안쪽에서 ref로 연결한 요소를 역으로 부모컴포넌트에 전달 가능 (자식컴포넌트의 JSX요소를 부모로 전달)
//useImperativeHandle : 자식 요소의 특정 객체값을 역으로 부모컴포넌트에 전달

const Modal = forwardRef(({ children, setIsModal }, ref) => {
	const [Open, setOpen] = useState(false);
	useImperativeHandle(ref, () => {
		return { Open: () => setOpen(true) };
	});
	return (
		<>
			{Open && (
				<aside className='Modal' ref={ref}>
					<div className='con'>{children}</div>
					<span onClick={() => setIsModal(false)}>close</span>
				</aside>
			)}
		</>
	);
});

export default Modal;
