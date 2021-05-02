const obj = {
	name: 'Chuck',
	age: 45,
	isCool: false,
	friends: [ 'bob', 'tina' ],
	add: function(x, y) {
		return x + y;
	}
};

console.log(obj.add(3, 6));
