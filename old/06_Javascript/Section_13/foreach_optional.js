function myForEach(arr, func) {
	for (let i = 0; i < arr.length; ++i) {
		func(arr[i]);
	}
}

const colors = [ 'red', 'green', 'blue' ];
myForEach(colors, alert);
myForEach(colors, function(color) {
	console.log(color);
});

Array.prototype.myForEach = function(func) {
	for (let i = 0; i < this.length; ++i) {
		func(this[i]);
	}
};
colors.myForEach(function(color) {
	console.log('******');
	console.log(color);
	console.log('******');
});
