function getShortMessage (_array) {
	var result;
	if (Array.isArray(_array)) {
		result = _array.filter(word => word.length < 50);
		return result
	}
}

console.log(getShortMessage(words));