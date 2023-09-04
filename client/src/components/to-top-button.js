import React, { useEffect, useState } from 'react'
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import styles from "../styles/to-top-button-styles.module.css";

const ToTopButton = () => {
	const [showButton, setShowButton] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);

	const scrollBackToTop = () => {
		if (!isScrolling) {
			setIsScrolling(true);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});

			setTimeout(() => {
				setIsScrolling(false);
			}, 3000)
		}
	};

	useEffect(() => {
		const toggleVisible = () => {
			const userScroll = window.scrollY;
			if (userScroll > 500) {
				setShowButton(true);
			}
			else {
				setShowButton(false);
			}
		}

		window.addEventListener("scroll", toggleVisible);

		return () => {
			window.addEventListener("scroll", toggleVisible);
		}
	}, []);

	return (
		<div>
			<div className={styles.upButtonContainer}>
				<BsFillArrowUpCircleFill className={styles.upButton} style={{ opacity: showButton ? 1 : 0}} size={65} onClick={scrollBackToTop}/>
			</div>
		</div>
	);
}

export default ToTopButton;
