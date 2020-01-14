import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		justifyContent: 'space-between'
	},

	navbar: {
		marginTop: '2%'
	},

	styleLi: {
		listStyle: 'none',
		display: 'inline',
		marginRight: '60px'
	},

	styleLink: {
		textDecoration: 'none',
		color: 'black',
		fontSize: '35px',
		fontWeight: 'bold',

		':hover': {
			backgroundColor: '#FFDE59'
		},
	}
})

function Navbar() {
	return (
		<header className={css(styles.header)}>
			<nav className={css(styles.navbar)}>
				<ul>
					<li className={css(styles.styleLi)}>
						<Link to="/" className={css(styles.styleLink)}>Salão</Link>
					</li>
					<li className={css(styles.styleLi)}>
						<Link to="/kitchen" className={css(styles.styleLink)}>Cozinha</Link>
					</li>
					<li className={css(styles.styleLi)}>
						<Link to="/waiter" className={css(styles.styleLink)}>Pedidos</Link>
					</li>
				</ul>
			</nav>
			<img src="/images/Logo1.png" alt="Logotipo" />
		</header>
	);
};

export default Navbar;