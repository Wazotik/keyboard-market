import React, { useState } from 'react'
import styles from "../styles/keyboard-reviews-modal-styles.module.css";
import ReactStars from "react-rating-stars-component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const KeyboardReviewModal = ({ toggleReviewsModal, largerImgUrl, reviews, starRating }) => {

	return (
		<div>
			<div className={styles.overlay}>
				<div className={styles.modal} >
					<div className={styles.content}>
						<button type="button" className={styles.backToCatalogButton} onClick={toggleReviewsModal}>back to catalog</button>
						<div className={styles.ratingAndImg}>
							<div className={styles.largeImgContainer}>
								<LazyLoadImage src={largerImgUrl} alt="big board" effect="opacity" style={{zIndex: 0}}/>
							</div>
							<div className={styles.averageRating}>
								<ReactStars count={5} value={starRating} a11y={false} edit={false} size={54}/>
							</div>
						</div>

						<div className={styles.reviewsContainer}>
							{reviews.map((review) => {
								return (
									<div className={styles.review}>
										<div className={styles.starRating}>
											<ReactStars count={5} size={24} value={review[2]} a11y={false} edit={false}/>
										</div>
										<div className={styles.date}>
											{review[1]}
										</div>
										<div className={styles.reviewText}>
											{review[0]}
										</div>
									</div>
								)
							})
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default KeyboardReviewModal;