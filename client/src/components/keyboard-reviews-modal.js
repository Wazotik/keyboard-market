import React, { useState } from 'react'
import styles from "../styles/keyboard-reviews-modal-styles.module.css";

const KeyboardReviewModal = ({ toggleReviewsModal }) => {

	return (
		<div>
			<div className={styles.overlay}>
				<div className={styles.content} onClick={toggleReviewsModal}>
					<p>INCOMING REVIEWS FEATURE</p>
					<p>CLICK TO GO BACK</p>
				</div>
			</div>
		</div>
	)
}

export default KeyboardReviewModal;