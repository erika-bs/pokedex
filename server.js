const button = document.getElementById("button");
button.addEventListener("click", getPokemon);

let currentPokemonIndex = null;
let pokemonList = [];

async function getPokemon() {
    const nameOrId = document.getElementById("pokemonName").value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Pokemon não encontrado!");
        }

        const data = await response.json();
        currentPokemonIndex = data.id;
        pokemonList[currentPokemonIndex] = data;
        displayPokemonInfo(data);
        updateButtonStates();
    } catch (error) {
        document.getElementById("pokemonInfo").innerHTML = `<p>${error.message}</p>`;
    }
}

const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#F0B6B6',
    normal: '#A8A878',
};

function displayPokemonInfo(pokemon) {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name);
    const primaryType = types[0];
    const backgroundColor = typeColors[primaryType] || '#FFFFFF';

    const imgElement = document.createElement('img');
    imgElement.src = pokemon.sprites.other['dream_world'].front_default;
    imgElement.alt = pokemon.name;
    imgElement.style.backgroundColor = backgroundColor;

    const pokemonInfo = `
        <h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>
        ${imgElement.outerHTML}
        <p>altura: ${pokemon.height} cm</p>
        <p>peso: ${pokemon.weight} kg</p>
        <p>tipo: ${types.join(', ')}</p>
    `;

    document.getElementById("pokemonInfo").innerHTML = pokemonInfo; 
}

document.getElementById("former").addEventListener("click", () => changePokemon(-1));
document.getElementById("forward").addEventListener("click", () => changePokemon(1));

function changePokemon(direction) {
    if (currentPokemonIndex !== null) {
        const newIndex = currentPokemonIndex + direction; 
        if (newIndex > 0 && newIndex <= 898) { 
            fetchPokemonById(newIndex);
        }
    }
}

async function fetchPokemonById(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Pokemon não encontrado");
        }

        const data = await response.json();
        currentPokemonIndex = data.id;
        pokemonList[currentPokemonIndex] = data; 
        displayPokemonInfo(data);
        updateButtonStates();
    } catch (error) {
        document.getElementById("pokemonInfo").innerHTML = `<p>${error.message}</p>`;
    }
}

function updateButtonStates() {
    const backButton = document.querySelector('.button2:nth-child(1)');
    const forwardButton = document.querySelector('.button2:nth-child(2)');

    backButton.disabled = (currentPokemonIndex <= 1);
    forwardButton.disabled = (currentPokemonIndex >= 898);
}
