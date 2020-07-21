export function getRandomPokemon(pokemonArray) {
    const randomPokemonIndex = Math.floor(Math.random() * pokemonArray.length);
    return pokemonArray[randomPokemonIndex];
}
