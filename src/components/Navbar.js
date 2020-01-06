import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from "react-router-dom";

const styles = StyleSheet.create({
	navbar: {
		listStyle: 'none',
		display: 'inline',
		marginRight: '15px',
	},
	styleLogo: {
    marginLeft: '30%',
  }
})

function Navbar() {
	return (
		<nav>
		
			<ul>
			<header>
        <img className={css(styles.styleLogo)} src="/images/Logo.png" alt="Logotipo" />
      </header>
				<li className={css(styles.navbar)}>
					<Link to="/">Salão</Link>
				</li>
				<li className={css(styles.navbar)}>
					<Link to="/kitchen">Cozinha</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;