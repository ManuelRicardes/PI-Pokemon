const axios = require("axios");

const { Pokemon } = require("../db");
const { Type } = require("../db");

const pokeByName = async (name) => {
  //if(id<41){

  //if(allPoke.include(name)){
  // console.log("averga",allPoke.include(name) )
  try {
    let apiName = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
    // console.log("apiId=", apiId)
    let data = await apiName.data;
    // console.log("data=", data)

    let pokeName = {
      id: data.id,
      name: data.name,
      type: data.types.map((t) => t.type.name),
      image: data.sprites.other.home?.front_default
        ? data.sprites.other.home.front_default
        : data.sprites.other.home?.front_shiny,
      life: data.stats[0].base_stat,
      strength: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
    };
    console.log(pokeName);
    return pokeName;
    //}
  } catch {
    try {
      const pokemonNameDb = await Pokemon.findOne({
        where: { name: `${name}` },
      });

      return pokemonNameDb;
    } catch (err) {
      console.log("Pokemon no encontrado");
      throw "Pokemon no encontrado";
    }
  }
};

async function apiPokemons(req, res, next) {
  // if(req.query.name) next()
  try {
    let allPokemons = (
      await axios("https://pokeapi.co/api/v2/pokemon?limit=40")
    ).data.results;
    const dataApi = await Promise.all(
      allPokemons.map(async (e) => {
        const pokemon = (await axios(e.url)).data;
        return pokemon;
      })
      );
      
    const pokemonFinal = dataApi.map((e) => ({
      id: e.id,
      name: e.name,
      image: e.sprites.other.home?.front_default
        ? e.sprites.other.home.front_default
        : e.sprites.other.home?.front_shiny,
      type: e.types.map((e) => e.type.name).join("-"),
      strength: e.stats[1].base_stat}));
    
    return pokemonFinal;
  } catch (error) {
    console.log(error);
  }
}

const dataBPoke = async () => {
  console.log(Pokemon);
  return await Pokemon.findAll({
    include: {
      model: Type,
    },
  });
};
const allPokemons = async () => {
  const pokeApi = await apiPokemons();
  const pokeBd = await dataBPoke();
  const allPoke = pokeApi.concat(pokeBd);
  return allPoke;
};

const getPokemonDbById = async (pokemon) => {
  try {
    const detailPokemon = await Pokemon.findByPk(pokemon, {
      include: {
        model: Type,
        attributes: ["id", "name"],
      },
    });
    return detailPokemon;
  } catch (err) {
    console.log(err);
  }
};

const pokeByID = async (id) => {
  if (id.length < 30) {
    //try{
    if (id < 41) {
      let newType = (await axios(`https://pokeapi.co/api/v2/type`)).data
        .results;
      console.log("hola", newType);
      let apiId = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
      //console.log("apiId=", apiId)
      let data = await apiId.data;
      //console.log("data=", data)

      let pokeId = {
        id: data.id,
        name: data.name,
        type: data.types.map((t) => t.type.name).join("-"),
        image: data.sprites.other.home?.front_default
          ? data.sprites.other.home.front_default
          : data.sprites.other.home?.front_shiny,
        life: data.stats[0].base_stat,
        strength: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
      };
      console.log(pokeId);
      return pokeId;
    }
    //}catch{
    try {
      const pokemonIdDb = await Pokemon.findByPk(id);
      return pokemonIdDb;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
const newPokemon = async (req, res) => {
  // try{
  const { name, life, strength, defense, speed,height,weight } = req.body;

  let newPoke = await Pokemon.create({
    name,
    life,
    strength,
    defense,
    speed,
    height,
    weight
  });

  console.log("se cargo");
  return newPoke;
  
};

module.exports = {
  allPokemons,
  getPokemonDbById,
  pokeByID,
  pokeByName,
  newPokemon,
};
