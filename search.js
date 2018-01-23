let pokemons = document.querySelectorAll("li");
const pokemonsNames = [];

function setupSearch() {
  let searchBtn = document.getElementById("buscarPokemon");
  searchBtn.addEventListener('input', atomicSearch);

  pokemons.forEach((pokemon) => {
    let pokeName = JSON.parse(pokemon.dataset.pokemon).nombre.toLowerCase();
    pokemonsNames.push(pokeName);
  });
}

var atomicSearch = (str) => {
  let pokemonStr = str.target.value.toLowerCase();

  if(pokemons.length <= 0) pokemons = document.querySelectorAll("li");

  pokemons.forEach((pokemon) => {
    let nombre = JSON.parse(pokemon.dataset.pokemon).nombre.toLowerCase();
    
    if(!nombre.includes(pokemonStr)) {
      pokemon.classList.add('hidden');
    } else if(JSON.stringify(pokemon.classList).includes('hidden')){
      pokemon.classList.remove('hidden');
    }
  });

};

// Init Search
setupSearch();
