const movie_db = [
	{
		name: 'In Bruges',
		rating: 5,
		hasWatched: true
	},
	{
		name: 'Frozen',
		rating: 4.5,
		hasWatched: false
	},
	{
		name: 'Mad Max Fury Road',
		rating: 5,
		hasWatched: true
	},
	{
		name: 'Les Miserables',
		rating: 3.5,
		hasWatched: false
	}
];

movie_db.forEach(function(movie) {
	let str = 'You have ';
	if (movie.hasWatched) {
		str += 'watched "';
	} else {
		str += 'not seen "';
	}
	str += movie.name + '" - ' + movie.rating + ' stars';
	console.log(str);
});
