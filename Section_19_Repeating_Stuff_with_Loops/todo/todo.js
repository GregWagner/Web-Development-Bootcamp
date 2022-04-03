const todos = [];

let command = prompt("Enter a command;");

while (command !== "quit" && command !== "q") {
  if (command === "new") {
    const todo = prompt("Enter the todo");
    todos.push(todo);
    console.log(`${todo} added to list`);
  } else if (command === "list") {
    console.log("Current Todos:");
    for (let todo of todos) {
      console.log(todo);
    }
    console.log();
  } else if (command === "delete") {
    const todo = prompt("Enter the todo");
    let index = todos.indexOf(todo);
    if (index === -1) {
      console.log("Item not found");
    } else {
      todos.splice(index, 1);
    }
  } else {
    console.log("Invalid command");
  }
  command = prompt("Enter a command;");
}

console.log("OK, You quit the application");
