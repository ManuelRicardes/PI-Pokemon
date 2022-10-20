const axios = require("axios");
const db = require("../db");

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
      types: e.types.map((e) => e.type.name).join("-"),
      strength: e.stats[1].base_stat}));

    return pokemonFinal;
  } catch (error) {
    console.log(error);
  }
}

const dataBPoke = async () => {
 
  return (await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
    },
  }
  }
)).map(e=>e.toJSON());

// const pokemonDB = {
//   id: db.id,
//       name: db.name,
//       // type: db.types.name,//.map((e) => e.type.name).join("-"),
//       //img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
//       life: db.life,
//       strength: db.strength,
//       defense: db.defense,
//       speed: db.speed,
//       height: db.height,
//       weight: db.weight,
// }
// return pokemonDB
};
const allPokemons = async () => {
  const pokeApi = await apiPokemons();
  const pokeBd = await dataBPoke();

  const pokeBdOk= pokeBd?.map(e=>({
    ...e,
    types: e.types?.map(e=>e.name).join("-")

  }))
  console.log("base dato",pokeBdOk)
  const allPoke = pokeApi.concat(pokeBdOk);
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
 // if (id < 41) {
    try{


      let apiId = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
      //console.log("apiId=", apiId)
      let data = await apiId.data;
      //console.log("data=", data)

      let pokeId = {
        id: data.id,
        name: data.name,
        types: data.types.map((t) => t.type.name).join("-"),
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
      // console.log(pokeId);
      return pokeId;
   // }
    }catch{
    try {
      const pokemonIdDb = await Pokemon.findByPk(id,{
        include:{
        model:Type
         }});
      return pokemonIdDb;
    } catch (err) {
      console.log(err);
      throw err;
    }
 }
}
//Crear Pokemon
const newPokemon = async (req, res) => {
  // try{
  const { name, life, strength, defense, speed,height,weight, image, types } = req.body;

  let newPoke = await Pokemon.create({
    name,
    image: image?image:"https://images.wikidexcdn.net/mwuploads/esssbwiki/2/25/latest/20220119214726/Togepi_Ilustraci%C3%B3n.png",
    life,
    strength,
    defense,
    speed,
    height,
    weight,
  });
  await Promise.all(types.map(async e =>{
    await newPoke.addType([  // es tabla de relaciones belongsToMany
          (await Type.findOrCreate({
            where : {
              name : e
            }
          })) [0].dataValues.id
        ])
      }))
      const relacionTablas = await Pokemon.findOne({
          where: {
            name : name
            
          }
          ,
          include: {
            model : Type,
            attributes : ["name"],
            through : {
              attributes : [],
            },
          }
        })
        res.json({info:"Pokemon Creado"})
      return relacionTablas
};

  //Eliminar Pokemon
const deletePokemon = async(req, res) => {
const {id} = req.body
try{
  await Pokemon.destroy({
    where:{
      id:id,
    },
  })
  res.status(200).send("successfully removed");
}catch(error){
console.log(error)
}

}

//Editar Pokemon
const putPokemon = async(req, res) => {
const  {id,name,image,strength,speed,defense,height,life,weight,types} =req.body
  try{
    let pokemon = await Pokemon.findOne({
      where: {
        id: id,
      },
    });

    if(pokemon){
      await Pokemon.update({name,image,strength,speed,defense,height,life,weight,types},
        {where: {
          id: id,
        },
      });
      
      await Promise.all(types.map(async e =>{
        await pokemon.addType([  // es tabla de relaciones belongsToMany
              (await Type.findOrCreate({
                where : {
                  name : e
                }
              })) [0].dataValues.id
            ])
          }))
          const relacionTablas = await Pokemon.findOne({
              where: {
                name : name
                
              }
              ,
              include: {
                model : Type,
                attributes : ["name"],
                through : {
                  attributes : [],
                },
              }
            })


      res.status(200).send("successfully edited");
    }else{
      res.status(404).send("Pokemon not found");
    }
}catch{

}
}
module.exports = {
  allPokemons,
  getPokemonDbById,
  pokeByID,
  pokeByName,
  newPokemon,
  deletePokemon,
  putPokemon
};
