import './Menu.scss';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function Menu() {
	const { isOpen } = useSelector((store) => store.menu);
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.aside
					className='menu'
					initial={{ x: '-100%' }}
					animate={{ x: '0%' }}
					exit={{ x: '-100%' }}
					transition={{ duration: 0.5 }}
				>
					<h1>
						<Link to='/'>LOGO</Link>
					</h1>

					<ul>
						<li>
							<NavLink to='/department' activeClassName='active'>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeClassName='active'>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeClassName='active'>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeClassName='active'>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/members' activeClassName='active'>
								Members
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeClassName='active'>
								Contact
							</NavLink>
						</li>
					</ul>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}

export default Menu;
