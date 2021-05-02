const secretNumber = 4;

const guess = Number(prompt('Please enter a number: '));

if (secretNumber === guess) {
	alert('You figured out the secret number');
} else if (secretNumber > guess) {
	alert('Your guess was too low');
} else {
	alert('Your guess was too high');
}
