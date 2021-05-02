let answer = prompt('Are we there yet?');

while (answer.toLowerCase().indexOf('yes') === -1 && answer.toLowerCase != 'yeah') {
	answer = prompt('Are we there yet?');
}
alert('YAY, We made it!');
