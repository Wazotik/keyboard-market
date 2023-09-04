import styles from "./navbar-style.module.css";


const Navbar = () => {
	return (
		<div>
			<div className={styles.navbar}>
				<h3 className={styles.logo}>
					K Market
				</h3>
			</div>
		</div>
	);
};

export default Navbar;
