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
    console.log(pokemon.types[0].type.name);
    let pokemonType = $('<p>').text(this.capitalizeFirstLetter("Tipo: " + pokemon.types[0].type.name));
    let pokemonName = $('<h2>').text(this.capitalizeFirstLetter(pokemon.name));
    let pokemonImg = $('<img>').attr('src', pokemon.sprites.front_default);   
    
    let heightConvert = pokemon.height * 10; 
    let heightFormat = heightConvert >= 100 ? `${heightConvert / 100} mts` : `${heightConvert} cm`;
    let weightConvert = pokemon.weight * 10; 
    let weightFormat = weightConvert >= 100 ? `${weightConvert / 100} kg` : `${weightConvert} g`; 
    let pokemonHeight = $('<p>').text(`Autura: ${heightFormat}`);
    let pokemonWeight = $('<p>').text(`Peso: ${weightFormat}`);
    
    

    let abilitiesList = $('<div>').text(`Habilidades:`); // Criando uma div de habilidades
    
    pokemon.abilities.forEach(ability => {
        let abilityItem = $('<p>').text(this.capitalizeFirstLetter(ability.ability.name));
        abilitiesList.append(abilityItem);


    });

    let container = $('.pokemon-container');
    container.append(pokemonName);
    container.append(pokemonImg);
    container.append(abilitiesList); // Adicionando a lista de habilidades à container
    container.append(pokemon-container);
    container.append(pokemonType);
    container.append(pokemonHeight);
    container.append(pokemonWeight);
    
    const pokemonTypes = pokemon.types[0].type.name;
    switch (pokemonTypes) {
      case 'fire':
        console.log('FOGO!');
         $('.pokemon-container').css('background-color','#fc0303')
        break;
      case 'grass':
        $('.pokemon-container').css('background-color','#008000')
         console.log('grass grass');
        break;
        case 'grass':
        $('.pokemon-container').css('background-color','#008000')
         console.log('grass grass');
        break;
        case 'water':
          $('.pokemon-container').css('background-color','#0394fc')
          break;

          case 'flying':
          $('.pokemon-container').css('background-color','#95c9ed')
          break;

          case 'fighting':
          $('.pokemon-container').css('background-color','#f77e2d')
          break;

          case 'poison':
          $('.pokemon-container').css('background-color','#a436e3')
          break;

          case 'electric':
          $('.pokemon-container').css('background-color','#feff00')
          break;

          case 'ground':
          $('.pokemon-container').css('background-color','#8a6206')
          break;

          case 'rock':
          $('.pokemon-container').css('background-color','#5e4302')
          break;

          case 'psychic':
          $('.pokemon-container').css('background-color','#a10565')
          break;

          case 'ice':
          $('.pokemon-container').css('background-color','#78a4c4')
          break;

          case 'bug':
          $('.pokemon-container').css('background-color','#168238')
          break;

          case 'ghost':
          $('.pokemon-container').css('background-color','#330d75')
          break;

          case 'steel':
          $('.pokemon-container').css('background-color','#6b807a')
          break;

          case 'dragon':
          $('.pokemon-container').css('background-color','#308691')
          break;

          case 'dark':
          $('.pokemon-container').css('background-color','#140330')
          $('.pokemon-container').css("color", "white")
          break;

          case 'fairy':
          $('.pokemon-container').css('background-color','#a34059')
          break;
        default: 
          $('.pokemon-container').css('background-color','#c7b673')
          console.log("Normy");
    }

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
