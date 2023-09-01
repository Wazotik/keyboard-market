import React, {useState} from "react";
import styles from "./navbar-style.module.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

const Navbar = () => {

	const [showSidebar, setShowSidebar] = useState(false);



	return (
		<div>
			<div className={styles.navbar}>
				<FaBars className={styles.sidebarMenuIcon} size={28} onClick={() => {
					setShowSidebar(!showSidebar);
				}}/>
			</div>
			
			<nav className={showSidebar ? styles.navMenuActive : styles.navMenuHidden}>
				<ul className={styles.items}>
					<li>
						<IoMdArrowBack className={styles.sidebarBackIcon} size={36} onClick={() => {
							setShowSidebar(!showSidebar);
						}}/>
					</li>
					<div className={styles.pageLinks}>
						<Link to="/">Catalog</Link>
						<Link to="/my-keyboards">Favourites</Link>
					</div>
				</ul>
			</nav>

		</div>
	);
};

export default Navbar;
