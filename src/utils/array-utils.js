export default class {

	static getRandomElements(array, n = {}) {

		// Default options are marked with *
		const shuffled = array.sort(() => 0.5 - Math.random());

		// Get sub-array of first n elements after shuffled
		return shuffled.slice(0, n);

	}

	static shuffleArray(array) {
    let j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
	}
}
