const getRandomElements = (array, n = {}) => {

	// Default options are marked with *
	const shuffled = array.sort(() => 0.5 - Math.random());

	// Get sub-array of first n elements after shuffled
	return shuffled.slice(0, n);

}

const shuffleArray = (array) => {
    const tmp = [...array];
    let j, x, i;
    for (i = tmp.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        // x = tmp[i];
        // tmp[i] = tmp[j];
        // tmp[j] = x;
        [tmp[i], tmp[j]] = [tmp[j], tmp[i]]
    }
    return tmp;
}

export {
	getRandomElements,
	shuffleArray
}

