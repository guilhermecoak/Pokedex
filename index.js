async function getPokemons() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20", {
    method: "GET",
  });

  let data = await response.json();

  let pokemonResults = data.results;

  let pokemonList = document.getElementById('pokemon-list');


  pokemonResults.forEach(async pokemon => {
    let listItem = document.createElement('li');

    let pokemonImage = document.createElement('img');
    let pokemonDetails = await getPokemonDetails(pokemon.url);
    pokemonImage.src = pokemonDetails.sprites.front_default;
    console.log(pokemonImage)
    listItem.appendChild(pokemonImage);

    let pokemonName = document.createElement('p');
    pokemonName.innerHTML = capitalizeFirstLetter(pokemon.name);
    listItem.appendChild(pokemonName);

    pokemonList.appendChild(listItem);
  });
}


async function getPokemonDetails(url) {
  let response = await fetch(url, {
    method: "GET",
  });

  let data = await response.json();

  return data;
}

function capitalizeFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

getPokemons();