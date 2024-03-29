import { useState } from "react";
import styles from "../styles/product-card-styles.module.css";
import KeyboardReviewModal from "./keyboard-reviews-modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ name, imgUrl, largerImgUrl, price, reviews, starRating }) => {

	const [modalVisible, setModalVisible] = useState(false);

	const toggleReviewsModal = () => {
		setModalVisible(!modalVisible);
		if (modalVisible) {
			document.body.style.overflow = "auto";
		}
		else {
			document.body.style.overflow = "hidden";
		}
	}

	return (
		<div>
			<div className={styles.card}>
				<div className={styles.imgContainer} onClick={toggleReviewsModal} >
					<LazyLoadImage className={styles.img} src={imgUrl} alt={`${name} image`} effect="opacity"/>
				</div>
				<div className={styles.nameContainer}>
					<div className={styles.nameText}>
						{name}
					</div>
				</div>
				<div className={styles.starAndPrice}>
					<div className={styles.starRating}>
						<ReactStars count={5} size={18} value={starRating} a11y={false} edit={false}/>
					</div>
					<div className={styles.price}>${price}</div>
				</div>
			</div>
			{modalVisible ? 
				<KeyboardReviewModal toggleReviewsModal={toggleReviewsModal} largerImgUrl={largerImgUrl} reviews={reviews} starRating={starRating}/> 
				: null
			}
		</div>
	);
};

export default ProductCard;
