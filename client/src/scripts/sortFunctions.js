
export const sortPriceHigh = (data) => {
	const sortedData = Array.from(data).sort((a, b) => {
		if (parseFloat(a.price) > parseFloat(b.price)) {
			return -1;
		} else if (
			parseFloat(a.price) < parseFloat(b.price) 
		) {
			return 1;
		} else {
			return 0;
		}
	});
	return sortedData;
};

export const sortPriceLow = (data) => {
	const sortedData = Array.from(data).sort((a, b) => {
		if (parseFloat(a.price) < parseFloat(b.price)) {
			return -1;
		} else if (
			parseFloat(a.price) > parseFloat(b.price) 
		) {
			return 1;
		} else {
			return 0;
		}
	});
	return sortedData;
};

