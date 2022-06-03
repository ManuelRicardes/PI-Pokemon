import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postNewPokemon } from "../redux/actions";
import "./CreatePokemon.css";



export default function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [errores, setErrores] = useState({});
  const [input, setInput] = useState({
    name: "",
    life: "",
    strength: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, []);
  function validation(input) {
    let errores = {};
    if (!input.name) errores.name = "el nombre debe ser completado";
    if (isNaN(input.life)) errores.life = "el valor debe ser un numero";
    if (isNaN(input.strength)) errores.strength = "el valor debe ser un numero";
    if (isNaN(input.defense)) errores.defense = "el valor debe ser un numero";
    if (isNaN(input.speed)) errores.speed = "el valor debe ser un numero";
    if (isNaN(input.height)) errores.height = "el valor debe ser un numero";
    if (isNaN(input.weight)) errores.weight = "el valor debe ser un numero";
    return errores;
  }
  function handleSubmit(e) {
    //e.preventDefault();
    if (
      errores.name ||
      errores.life ||
      errores.strength ||
      errores.defense ||
      errores.speed ||
      errores.height ||
      errores.weight ||
      errores.type ||
      !input.name
      ) {
        alert("Pokemon not Created - please complete the inputs");
      
    } else {
        
        dispatch(postNewPokemon(input));
      alert("Pokemon Created - go back to see it");
      setInput({
        name: "",
        life: "",
        strength: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
      });
      
      
    }}

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrores(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleselect(e) {
    e.preventDefault();
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }
  return (
    <div>
      <h1>Create your Pokemon</h1>
      <Link to = '/pokemons'>
        <button>Back</button>
        </Link>
    
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          ></input>
          {errores.name && <p>{errores.name}</p>}
          </div>
          <div>
          <label>Life: </label>
          <input
            type="number"
            value={input.life}
            name="life"
            onChange={handleChange}
          ></input>
          {errores.life && <p>{errores.life}</p>}
            </div>
            <div>
          <label>Strength: </label>
          <input
            type="number"
            value={input.strength}
            name="strength"
            onChange={handleChange}
          ></input>
           {errores.strength && <p>{errores.strength}</p>}
          </div>
          <div>
          <label>Defense: </label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={handleChange}
          ></input>
           {errores.defense && <p>{errores.defense}</p>}
           </div>
           <div>
          <label>Speed: </label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={handleChange}
          ></input>
           {errores.speed && <p>{errores.speed}</p>}
          </div>
          <div>
          <label>Height: </label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={handleChange}
          ></input>
           {errores.height && <p>{errores.height}</p>}
          </div>
          <div>
          <label>Weight: </label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={handleChange}
          ></input>
           {errores.weight && <p>{errores.weight}</p>}
           </div>
           <div>
          <label>Type: </label>

          <select onChange={(e) => handleselect(e)}>
            {types.map((t) => (
              <option value={t.name}>{t.name}</option>
            ))}
          </select>
          </div>
          <div>
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Create
          </button>
          </div>
        </div>
      
    
  );
}
