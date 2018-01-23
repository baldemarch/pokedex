//
// RESPONSIVO
// BUSCAR
// FILTRAR
// MARCAR CAPTURADO
//
const ul = document.getElementById('pokemons');

// Get JSON to work with
getPokeJSON()
  .then((data) => {

    let pokemons = data.pokemon;
    // Data sample
    // console.log(pokemons[0]);

    pokeStorage.setup(pokemons);

    return pokemons.forEach((pokemon) => {

      setupLi(pokemon);

    });

});


// Create the node
function createNode(element) {
  return document.createElement(element);
}

// Append the node to respective parent
function append(parent, el) {
  return parent.appendChild(el);
}

function getNextEvolution(evo) {

  if (!evo) return '🚫';

  let nextEvolution = [];

  evo.forEach((evolution) => {

    nextEvolution.push(evolution.name);

  });

  return nextEvolution.join(', ').toString();
}

function getWeaknesses(wknss) {
  if (!wknss) return '🚫';

  let weaknesses = [];

  wknss.forEach((weakness) => {

    weaknesses.push(weakness);

  });

  return weaknesses.join(', ').toString();
}

// Setup LI element
function setupLi(pokemon) {
  let li = createNode('li');
  let collected = false;

  li.classList.add(
  'pokeBox',
  'list-group-item'
  );

  // Retrieve collected Pokemons
  let localCollected = JSON.parse(localStorage.getItem('collectedPokemons'));

  if (localCollected.localPokemons.includes(pokemon.id.toString())) {
    li.classList.add('text-muted');
    collected = true;
  }

  // Set LI attributes for the pokemon
  setPokemonAttributes(li, pokemon, collected);

  // Setup all the info for each LI
  setupBody(li, pokemon, collected)
  // Append LI done to UL
  append(ul, li);
}

function setPokemonAttributes(e, p, c) {
  let pokemonData = {
    'nombre': p.name
  }
  if(c) {
    pokemonData['atrapado'] = true;
  } else {
    pokemonData['no atrapado'] = true;
  }
  e.setAttribute('id', p.id);
  e.setAttribute('data-pokemon', JSON.stringify(pokemonData));
}

// Setup Pokemon Body
function setupBody(li, pokemon, collected) {
  let h3 = createNode('h3');
  let div = createNode('div');
  let span = createNode('span');

  h3.innerHTML = pokemon.name;
  div.classList.add('pokemon-body');
  span.innerHTML = `<strong>Type:</strong> ${pokemon.type}`;
  span.innerHTML += '<br><strong>Weaknesses: </strong>' + getWeaknesses(pokemon.weaknesses);
  span.innerHTML += '<br><strong>Next Evolution: </strong>' + getNextEvolution(pokemon.next_evolution);
  // span.innerHTML += `<br><strong>Spawn Chance:</strong> ${pokemon.spawn_chance}`;

  // Append H3 and body to LI
  append(li, h3);
  append(div, span);
  // Setup and append Image box
  setupImageBox(li, pokemon, collected);
  // Append P to LI
  append(li, div);
}

// Setup Head of each LI
function setupImageBox(li, pokemon, collected) {
  let div = createNode('div');
  let img = createNode('img');
  let span = createNode('span');
  let br = createNode('br');
  let button = createNode('button');

  div.classList.add('image-box');

  img.src = pokemon.img;
  img.alt = `${pokemon.name}`;

  span.classList.add('pokemon-generals');
  span.innerHTML = `<strong>Heigth:</strong> ${pokemon.height}`;
  span.innerHTML += `<br><strong>Weight:</strong> ${pokemon.weight}`;

  button.classList.add(
    'btn',
    'btn-default',
    'btn-collect'
  );

  button.setAttribute('data-pokeId', pokemon.id);
  button.innerHTML = 'Todavía no lo has atrapado?';
  button.addEventListener('click', togglePokemonStatus);
  if(collected) {
    button.classList.add('btn-danger');
    button.innerHTML = 'Atrapado!';
  }

  append(div, img);
  append(div, span);
  append(div, br);
  append(div, button);
  append(li, div);

}

// Marcar como atrapado
function togglePokemonStatus(e) {
  let pokemonId = e.target.dataset.pokeid;
  let pokemonLI = document.querySelector(`li[id="${pokemonId}"]`);
  let pokemonData = JSON.parse(pokemonLI.dataset.pokemon);

  pokeStorage.addCollected(pokemonId);
  // Change style for LI
  if(JSON.stringify(pokemonLI.classList).includes('text-muted')) {
    e.target.innerHTML = "Todavía no lo has atrapado?";

    if(pokemonData.atrapado) {
      delete pokemonData.atrapado;
      pokemonData["no atrapado"] = true;
      pokemonLI.setAttribute('data-pokemon', JSON.stringify(pokemonData));
    }

  } else {
    e.target.innerHTML = "Atrapado!";

    if(pokemonData["no atrapado"]) {
      delete pokemonData["no atrapado"];
      pokemonData.atrapado = true;
      pokemonLI.setAttribute('data-pokemon', JSON.stringify(pokemonData));
    }

  }


  if(JSON.stringify(pokemonLI.classList).includes("filtered")) {
    pokemonLI.classList.add('hidden');
    pokemonLI.classList.remove('filtered');
  }

  pokemonLI.classList.toggle('text-muted');
  e.target.classList.toggle('btn-danger');

}
