import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
	header: {
		display: "flex",
	},

	navbar: {
		marginTop: "2%"
	},

	styleLi: {
		listStyle: "none",
		display: "inline",
		marginRight: "40%",
	},

	styleLink: {
		textDecoration: "none",
		color: "black",
		fontSize: "35px",
		fontWeight: "bold",
	},

	styleLogo: {
		marginLeft: "45%",
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
				</ul>
			</nav>
			<img className={css(styles.styleLogo)} src="/images/Logo1.png" alt="Logotipo" />
		</header>
	);
};

export default Navbar;