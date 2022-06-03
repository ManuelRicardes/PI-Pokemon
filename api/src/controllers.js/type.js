const axios = require("axios");
const { Type } = require("../db");

const apiType = async () => {
  try {
    let newType = (await axios(`https://pokeapi.co/api/v2/type`)).data.results;
    let typeName = await newType.map((e) => ({
      name: e.name
    }));
    await Type.bulkCreate(typeName);
    return "se cargo todo";
  } catch (error) {
    console.log("el error es: ", error);
  }
};

const dbType = async () => {
  let tipos = await Type.findAll();
  return tipos;
};
module.exports = { dbType, apiType };
