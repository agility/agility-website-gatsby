export default class {

	static getRandomElements(array, n = {}) {

		// Default options are marked with *
		const shuffled = array.sort(() => 0.5 - Math.random());

		// Get sub-array of first n elements after shuffled
		return shuffled.slice(0, n);

	}



}
