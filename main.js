//Aquí va el código uwu
const pokemonAPI = 'https://pokeapi.co/api/v2/pokemon';

async function bringPokemons(pokemonAPI){
    const pokeLista = await fetch(pokemonAPI);
    const pokeJSON = await pokeLista.json();
    const pokeArray = pokeJSON.results

    pokeArray.forEach((pokemon, index)=>{
        const {name, url} = pokemon
        getPokemon(url);
    });
};

// Bring one pokemon
async function getPokemon(pokemonURL){
    const pokemonObj = await fetch(pokemonURL);
    const pokeJSON = await pokemonObj.json();
    const {name, sprites, stats} = pokeJSON
    const { front_default } = sprites //img
    const statsObject = stats.reduce( (accum, item) => {
        return {...accum, [item.stat.name]: item.base_stat}
    },{})
    statsObject.name = name
    statsObject.image = front_default
    return statsObject
};

bringPokemons(pokemonAPI);
getPokemon("https://pokeapi.co/api/v2/pokemon/1");