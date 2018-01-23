function setupSorting() {
  let p = document.querySelector("div[class='btn-group']");
  let buttons = ["Atrapado","No Atrapado"];

  buttons.forEach((button) => {
    createFilterBtn(p, button);
  });
};

createFilterBtn = (p, button) => {
  let btn = createNode('button');

  btn.classList.add(
    'sort',
    'btn',
    'btn-default',
    'btn-sm'
  );

  btn.setAttribute('data-sortBy', button.toLowerCase());
  btn.innerHTML = button;
  btn.addEventListener('click', filterBy);
  append(p, btn);
}

let activeFilter = false;

// Sort by criteria
function filterBy(e) {
  let filterBtn = document.querySelector(".btn-primary");

  if (filterBtn) {
    activeFilter = filterBtn.dataset.sortby;
    filterBtn.classList.remove('btn-primary');
  }

  const pokemons = document.querySelectorAll('li');
  let sortType = e.target.dataset.sortby;

  if ((filterBtn) && filterBtn.dataset.sortby === sortType) {
    filterBtn.classList.remove('btn-primary');
  } else {
    e.target.classList.toggle('btn-primary');
  }

  pokemons.forEach((pokemon) => {
    let pokeData = JSON.parse(pokemon.dataset.pokemon);

    if((activeFilter) && activeFilter === sortType) {
      pokemon.classList.remove('hidden', 'filtered');
      if(activeFilter) activeFilter = false;
      return;
    } else if((activeFilter) && activeFilter !== sortType) {
      pokemon.classList.toggle('hidden');
      if(JSON.stringify(pokemon.classList).includes('hidden')) pokemon.classList.remove('filtered');
    } else if((activeFilter) && !pokeData[sortType]) {
      pokemon.classList.toggle('hidden');
      if(JSON.stringify(pokemon.classList).includes('hidden')) pokemon.classList.remove('filtered');
    } else if(!pokeData[sortType]) {
      pokemon.classList.toggle('hidden');
      pokemon.classList.remove('filtered');
    }

    if(pokeData[sortType]) {
      console.log("Should've added");
      pokemon.classList.toggle('filtered');
    }

  });

}
// Init sorting
setupSorting();
