function listToDos() {
	console.log('**********');
	todos.forEach(function(item, index) {
		console.log(index + ': ' + item);
	});
	console.log('**********');
}

function addToDo() {
	const newToDO = prompt('Enter new todo:');
	todos.push(newToDO);
	console.log('Added Todo');
}

function deleteToDo() {
	const index = Number(prompt('Enter an index:'));
	todos.splice(index, 1);
	console.log('Todo deleted');
}

const todos = [ 'Buy new turtle' ];

let input = prompt('What would you like to do?');

while (input !== 'quit') {
	if (input === 'list') {
		listToDos();
	} else if (input === 'new') {
		addToDo();
	} else if (input === 'delete') {
		deleteToDo();
	}
	input = prompt('What would you like to do?');
}
console.log('See you soon');
