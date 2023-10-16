import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useState } from 'react';

export default function Members() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
	};

	const [Val, setVal] = useState(initVal);

	const handleChange = (e) => {
		const { name, value } = e.target;
		//현재 onChange이벤트가 발생하고 있는 form요소의 name값을 객체안에서 변수로 가져오고 value값도 가져온뒤 기존의 state값을 deep copy한뒤 내가 입력하고 있는 input의 property값만 덮어쓰기
		setVal({ ...Val, [name]: value });
	};

	return (
		<Layout title={'Members'}>
			<form>
				<legend className='h'>회원가입 폼 양식</legend>
				<table border='1'>
					<body>
						{/* userid */}
						<tr>
							<th scope='row'>
								<label htmlFor='userId'>userid</label>
							</th>
							<td>
								<input type='text' id='userId' name='userid' value={Val.userid} />
							</td>
						</tr>
						{/* password */}
						<tr>
							<th scope='row'>
								<label htmlFor='pwd1'>password</label>
							</th>
							<td>
								<input
									type='password'
									id='pwd1'
									name='pwd1'
									value={Val.pwd1}
									onChange={handleChange}
								/>
							</td>
						</tr>
						{/* re-password */}
						<tr>
							<th scope='row'>
								<label htmlFor='pwd2'>re-password</label>
							</th>
							<td>
								<input
									type='password'
									id='pwd2'
									name='pwd2 '
									value={Val.pwd2}
									onChange={handleChange}
								/>
							</td>
						</tr>
						{/* email */}
						<tr>
							<th scope='row'>
								<label htmlFor='email'>e-mail</label>
							</th>
							<td>
								<input
									type='text'
									id='email'
									name='email'
									value={Val.email}
									onChange={handleChange}
								/>
							</td>
						</tr>
						{/* btnSet */}
						<tr>
							<th colSpan='2'>
								<input type='reset' Value='cancel' />
								<input type='submit' value='send' />
							</th>
						</tr>
					</body>
				</table>
			</form>
		</Layout>
	);
}
