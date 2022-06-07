const axios = require("axios");
const { Type } = require("../db");

const apiType = async (req,res) => {
  try {
    let newType = (await axios(`https://pokeapi.co/api/v2/type`)).data.results;
    let typeName = await newType.map((e) => e.name);
    typeName.forEach(e=>{
      Type.findOrCreate({
        where:{name:e}
      })
    })
    let tipos = await Type.findAll();
  res.status(200).send(tipos);
  } catch (error) {
    res.status(404).json({error})
  }
};


module.exports = {  apiType };
