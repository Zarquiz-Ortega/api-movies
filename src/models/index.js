const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


//Todos Relaciones de uno a muchos (N-M)


//Todos Relaciones de muchos a muchos (M-M)
Movie.belongsToMany(Actor, {through: 'movieActor'})
Actor.belongsToMany(Movie, {through: 'actorMovie'})

Movie.belongsToMany(Director,{through: 'movieDirector'})
Director.belongsToMany(Movie,{through: 'directorMovie'})

Movie.belongsToMany(Genre,{through: 'movieGenre'})
Genre.belongsToMany(Movie,{through: 'genreMovie'})