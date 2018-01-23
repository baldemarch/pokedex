// Fetch JSON from localStorage or https
const getPokeJSON = (getJson) => {
  let localJson = localStorage.getItem('pokemons');

  if (localJson) return Promise.resolve({'pokemon': JSON.parse(localJson) });

  let jsonURI = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

  return fetch(jsonURI)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log('Error fetching json :( ', error);
    });

}
