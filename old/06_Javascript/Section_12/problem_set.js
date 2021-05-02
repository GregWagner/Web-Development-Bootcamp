function isEven(number) {
	return number % 2 === 0;
}

console.log(isEven(4) === true);
console.log(isEven(21) === false);
console.log(isEven(68) === true);
console.log(isEven(333) === false);

function factorial(number) {
	let answer = 1;
	for (let i = 2; i <= number; ++i) {
		answer *= i;
	}
	return answer;
}

console.log(factorial(5) === 120);
console.log(factorial(2) === 2);
console.log(factorial(10) === 3628800);
console.log(factorial(0) === 1);

function kebabToSnake(sentance) {
	return sentance.replace(/-/g, '_');
}

console.log(kebabToSnake('hello-world') === 'hello_world');
console.log(kebabToSnake('dogs-are-awesome') === 'dogs_are_awesome');
console.log(kebabToSnake('blah') === 'blah');
