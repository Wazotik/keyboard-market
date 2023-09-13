
export const sortAsc = (data, dataToSort) => {
	const sortedData = Array.from(data).sort((a, b) => {
		if (dataToSort === "price") {
			a = parseFloat(a.price);
			b = parseFloat(b.price);
		}
		else if (dataToSort === "star") {
			a = a.star_rating;
			b = b.star_rating;
		}

		if (a < b) {
			return -1;
		} 
		else if (a > b) {
			return 1;
		} 
		else {
			return 0;
		}
	});
	return sortedData;
};

export const sortDesc = (data, dataToSort) => {
	const sortedData = Array.from(data).sort((a, b) => {
		if (dataToSort === "price") {
			a = parseFloat(a.price);
			b = parseFloat(b.price);
		}
		else if (dataToSort === "star") {
			a = a.star_rating;
			b = b.star_rating;
		}

		if (a > b) {
			return -1;
		} else if (
			a < b
		) {
			return 1;
		} else {
			return 0;
		}
	});
	return sortedData;
};

