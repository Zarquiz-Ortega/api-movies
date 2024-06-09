

//Todos Relaciones de uno a muchos (N-M)

const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

//Todos Relaciones de muchos a muchos (M-M)
Movie.belongsToMany(Actor, {through: 'movieActor'})
Movie.belongsToMany(Director,{through: 'movieDirector'})
Movie.belongsToMany(Genre,{through: 'movieGenre'})