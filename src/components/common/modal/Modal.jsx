import './Modal.scss';
function Modal({ children, setIsModal }) {
	return (
		<aside className='Modal'>
			<div className='con'>{children}</div>
			<span onClick={() => setIsModal(false)}>close</span>
		</aside>
	);
}

export default Modal;
