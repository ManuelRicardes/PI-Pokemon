const { Router } = require("express");
const { axios } = require("axios");
//const fetch = require("node-fetch");
const {
  allPokemons,
  pokeByID,
  pokeByName,
  newPokemon,
} = require("../controllers.js/pokemon");
const { dbType, apiType } = require("../controllers.js/type");
const { Pokemon } = require("../db");
const { Type } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();




router.get("/pokemons/name", async (req, res) => {
  try {
    const namePokemon = req.query.name;

    res.status(200).json(await pokeByName(namePokemon));
  } catch (error) {
    res.status(404).send("Pokemon no encontrado");
  }
});


router.get("/pokemons", async (req, res) => {
  const prueba = await allPokemons();
  res.json(prueba);
});

router.get("/pokemons/:id", async (req, res) => {
  try {
    const idPokemon = req.params.id;

    res.status(200).json(await pokeByID(idPokemon));
  } catch (error) {
    res.status(404).send("Pokemon no encontrado");
  }
});

router.get("/type", async (req, res) => {
  let tipo = await dbType();
  res.json(tipo);
  return tipo
});

router.post("/pokemons", async (req, res) => {
  let { name, life, strength, defense, speed, height, weight, type } =
    req.body;

  // if (
  //   isNaN(life) ||
  //   isNaN(strength) ||
  //   isNaN(defense) ||
  //   isNaN(speed) ||
  //   isNaN(height) ||
  //   isNaN(weight)
  // )
  //   return res.json({ info: "Alguno de los argumentos no es un numero" });
  
  try {
    let newPoke = await Pokemon.create({
      name,
      life,
      strength,
      defense,
      speed,
      height,
      weight,
    });
    //console.log("poke:",newPoke)


    let  typeDB = await Type.findAll({
      where: { name: type },
    });

   newPoke.addType(typeDB);
    console.log("typo:",typeDB[0].dataValues.name)
    res.send("Succesfull");
    //return newPoke;
  } catch (error) {
    res.status(400).send(error);
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
