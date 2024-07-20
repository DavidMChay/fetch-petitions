document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('pokemonInput');
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            searchPokemon();
        }
    });
});

async function searchPokemon() {
    const input = document.getElementById('pokemonInput').value.trim().toLowerCase();
    const detailsDiv = document.getElementById('pokemonDetails');
    detailsDiv.innerHTML = '';

    if (input === '') {
        alert('Please enter a Pokémon name or number');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }

        const pokemon = await response.json();
        displayPokemonDetails(pokemon);
    } catch (error) {
        detailsDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayPokemonDetails(pokemon) {
    const detailsDiv = document.getElementById('pokemonDetails');

    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'pokemon-card';

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;

    const pokemonName = document.createElement('h2');
    pokemonName.textContent = capitalizeFirstLetter(pokemon.name);

    const pokemonDetails = document.createElement('p');
    pokemonDetails.innerHTML = `
        <strong>ID:</strong> ${pokemon.id}<br>
        <strong>Height:</strong> ${pokemon.height}<br>
        <strong>Weight:</strong> ${pokemon.weight}<br>
        <strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}
    `;

    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonDetails);

    detailsDiv.appendChild(pokemonCard);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
