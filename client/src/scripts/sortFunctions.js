
export const sortPriceHigh = (data) => {
	const sortedData = Array.from(data).sort((a, b) => {
		if (Number(a.price.substring(1) > Number(b.price.substring(1)))) {
			return -1;
		} else if (
			Number(a.price.substring(1) < Number(b.price.substring(1)))
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
		if (Number(a.price.substring(1) < Number(b.price.substring(1)))) {
			return -1;
		} else if (
			Number(a.price.substring(1) > Number(b.price.substring(1)))
		) {
			return 1;
		} else {
			return 0;
		}
	});
	return sortedData;
};

