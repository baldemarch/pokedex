var pokeStorage = {

   setup: function(pokemons) {
    let localPokemons = localStorage.getItem('pokemons');
    if (!localPokemons) localStorage.setItem('pokemons', JSON.stringify(pokemons));

    let localCollectedPokemons = localStorage.getItem('collectedPokemons');
    if (!localCollectedPokemons) {
      let collectedPokemons = {localPokemons: ''};
      localStorage.setItem('collectedPokemons', JSON.stringify(collectedPokemons));
    }
  },

  getCollected: function() {
    let collected = localStorage.getItem('collectedPokemons');
    return collected;
  },

  setCollected: function(str) {

    if(typeof str != 'string') {
      throw('Collected Pokemons need to be a String');
      return;
    }

    localStorage.setItem('collectedPokemons', str);
  },

  addCollected: function(pid) {
    // Modify ID in Array
    let localCollected = JSON.parse(localStorage.getItem('collectedPokemons'));

    if (localCollected.localPokemons.length == 0) {
      localCollected.localPokemons = [pid];
    } else if(localCollected.localPokemons.includes(pid)){
      let indexOfPokemon = localCollected.localPokemons.indexOf(pid);
      localCollected.localPokemons.splice(indexOfPokemon, 1);
    } else {
      localCollected.localPokemons.push(pid);
    }

    this.setCollected(JSON.stringify(localCollected));
  }

};
