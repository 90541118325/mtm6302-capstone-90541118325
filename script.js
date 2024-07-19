document.addEventListener('DOMContentLoaded', () => {
    const pokemonGallery = document.getElementById('pokemon-gallery');
    const loadMoreButton = document.getElementById('load-more');
    let offset = 0;
    const limit = 20;

    const loadPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
            const data = await response.json();
            data.results.forEach(async (pokemon) => {
                const pokemonDetails = await fetch(pokemon.url);
                const pokemonData = await pokemonDetails.json();
                const pokemonCard = createPokemonCard(pokemonData);
                pokemonGallery.appendChild(pokemonCard);
            });
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    };

    const createPokemonCard = (pokemon) => {
        const card = document.createElement('div');
        card.classList.add('col-md-3', 'col-sm-6');

        card.innerHTML = `
            <div class="card">
                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title text-center">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                </div>
            </div>
        `;

        return card;
    };

    loadMoreButton.addEventListener('click', () => {
        offset += limit;
        loadPokemon();
    });

    // Initial load
    loadPokemon();
});
