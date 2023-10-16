import Layout from '../../common/layout/Layout';
import './Members.scss';

export default function Members() {
	return (
		<Layout title={'Members'}>
			<form action=''>
				<legend>회원가입 폼 양식</legend>
				<table border='1'>
					<body>
						{/* userid */}
						<tr>
							<th scope='row'>
								<label htmlFor='userId'>userid</label>
							</th>
							<td>
								<input type='text' id='userId' name='userid' />
							</td>
						</tr>
						{/* userid */}
						<tr>
							<th scope='row'>
								<label htmlFor='pwd1'>password</label>
							</th>
							<td>
								<input type='password' id='pwd1' name='pwd1' />
							</td>
						</tr>
						{/* userid */}
						<tr>
							<th scope='row'>
								<label htmlFor='pwd2'>re-password</label>
							</th>
							<td>
								<input type='re-password' id='pwd2' name='pwd2' />
							</td>
						</tr>
					</body>
				</table>
			</form>
		</Layout>
	);
}
