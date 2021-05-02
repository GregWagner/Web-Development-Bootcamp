function printReverse(array) {
	for (let i = array.length - 1; i >= 0; --i) {
		console.log(array[i]);
	}
}

function isUniform(array) {
	const value = array[0];
    let uniform = true;
    // probably better to use for loop and just return
	array.forEach(function(item) {
		if (item !== value) {
			uniform = false;
		}
	});
	return uniform;
}

function sumArray(array) {
	let results = 0;
	array.forEach(function(item) {
		results += item;
	});
	return results;
}

function max(array) {
	let maxValue = array[0];
	array.forEach(function(item) {
		if (item > maxValue) {
			maxValue = item;
		}
	});
	return maxValue;
}

const a = [1, 2, 3, 4, 6];
printReverse(a);

console.log(isUniform(a) === false);
const b = [99, 99, 99, 99];
console.log(isUniform(b) === true);

console.log(sumArray(a) === 16);

console.log(max(a) === 6);
