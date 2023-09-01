import React from 'react';
import styles from './data-control-center-style.module.css';


const DataControlCenter = ({keyboardData, setProductElemList, sortHighFunction, sortLowFunction}) => {

	return (
		<div>
			<div className={styles.buttonsContainer}>
				<div>
					<button onClick={sortHighFunction}>
						Sort by highest price
					</button>
				</div>
				<div>
					<button onClick={sortLowFunction}>Sort by lowest price</button>
				</div>
			</div>
		</div>
	)
}
;
export default DataControlCenter;