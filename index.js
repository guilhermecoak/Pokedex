class PokemonFetcher {

  constructor() {
    this.urlBase = "https://pokeapi.co/api/v2/";
  }

  async displayPokemonByNameOrId(name) {
    $('.pokemon-container').children().length > 0 ? $('.pokemon-container').empty() : null;

    let response = await fetch(`${this.urlBase}pokemon/${name}`, {
      method: "GET",
    });

    let pokemon = await response.json();
    let pokemonName = $('<h2>').text(this.capitalizeFirstLetter(pokemon.name));
    let pokemonImg = $('<img>').attr('src', pokemon.sprites.front_default);
    
    let abilitiesList = $('<ul>'); // Criando a lista de habilidades

    pokemon.abilities.forEach(ability => {
        let abilityItem = $('<li>').text(ability.ability.name);
        abilitiesList.append(abilityItem);
    });

    let container = $('.pokemon-container');
    container.append(pokemonName);
    container.append(pokemonImg);
    container.append(abilitiesList); // Adicionando a lista de habilidades à container
}


  async getPokemons() {
    let response = await fetch(`${this.urlBase}pokemon?offset=0&limit=20`, {
      method: "GET",
    });

    let data = await response.json();

    let pokemonResults = data.results;

    let pokemonGrid = $('#pokemon-grid');

    for (let pokemon of pokemonResults) {
      let card = $('<div class="pokemon-card">'); // Cria um card

      let pokemonName = $('<h2>').text(this.capitalizeFirstLetter(pokemon.name)); // Cria o título com o nome do Pokémon
      card.append(pokemonName);

      let pokemonDetails = await this.getPokemonDetails(pokemon.url);
      let pokemonImage = $('<img>').attr('src', pokemonDetails.sprites.front_default); // Cria a imagem
      card.append(pokemonImage);

      pokemonGrid.append(card); // Adiciona o card ao grid
    }
  }

  async getPokemonDetails(url) {
    let response = await fetch(url, {
      method: "GET",
    });

    let data = await response.json();

    return data;
  }

  capitalizeFirstLetter(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}

$(document).ready(function () { // Quando o documento estiver pronto, executar o código abaixo
  $('#search-button').click(async function() { 
    let pokemonFetcher = new PokemonFetcher();
    let pokemonName = $('#search-input').val();
    console.log(pokemonName);
    await pokemonFetcher.displayPokemonByNameOrId(pokemonName);
});
});
