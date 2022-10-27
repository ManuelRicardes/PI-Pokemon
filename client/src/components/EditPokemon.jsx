import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEditPokemon, getTypes } from "../redux/actions";
import axios from "axios";
import "./EditPokemon.css";

function validation(input) {
  let errores = {};
  // if (!input.name) errores.name = "the name must be completed";
  if(input.name.includes(1)||input.name.includes(2)||input.name.includes(3)||input.name.includes(4)||input.name.includes(5)||input.name.includes(6)||input.name.includes(7)||input.name.includes(8)||input.name.includes(9)||input.name.includes(0))errores.name = "the name cannot contain numbers";
  if (isNaN(input.life)) errores.life = "the value must be a number";
  if(input.life<0)errores.life = "value cannot be negative"
  if(input.life>100)errores.life = "value cannot be greater than 100"
  if (isNaN(input.strength)) errores.strength = "the value must be a number";
  if(input.strength<0)errores.strength = "value cannot be negative"
  if(input.strength>105)errores.strength = "value cannot be greater than 105"
  if (isNaN(input.defense)) errores.defense = "the value must be a number";
  if(input.defense<0)errores.defense = "value cannot be negative"
  if(input.defense>120)errores.defense = "value cannot be greater than 120"
  if (isNaN(input.speed)) errores.speed = "the value must be a number";
  if(input.speed<0)errores.speed = "value cannot be negative"
  if(input.speed>105)errores.speed = "value cannot be greater than 105"
  if (isNaN(input.height)) errores.height = "the value must be a number";
  if(input.height<0)errores.height = "value cannot be negative"
  if(input.height>35)errores.height = "value cannot be greater than 35"
  if (isNaN(input.weight)) errores.weight = "the value must be a number";
  if(input.weight<0)errores.weight = "value cannot be negative"
  if(input.weight>1000)errores.weight = "value cannot be greater than 1000"
  if(input.types.length>2)errores.types= "Pokemon cannot have more than 2 types";
  if(input.image.length>200) errores.image="Image not found - plese select other"
  if(!input.image)errores.image="togepi will be your default image"
  return errores;
}


export default function EditPokemon() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const types = useSelector((state) => state.types);
  const editPokemon = useSelector((state) => state.editPokemon);
  const [errores, setErrores] = useState({});
  const [input, setInput] = useState({
    id:id,
    name: editPokemon.name?editPokemon.name:"",
    image:editPokemon.image?editPokemon.image:"",
    life:editPokemon.life?editPokemon.life:"",
    strength:editPokemon.strength?editPokemon.strength:"",
    defense:editPokemon.defense?editPokemon.defense:"",
    speed:editPokemon.speed?editPokemon.speed:"",
    height:editPokemon.height?editPokemon.height:"",
    weight:editPokemon.weight?editPokemon.weight:"",
    types:editPokemon.types?editPokemon.types:[],
  });

  useEffect(() =>  {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() =>  { 
  dispatch(getEditPokemon(id));
}, [dispatch, id]);


  async function handleSubmit(e) {
    // e.preventDefault();
    console.log(input)
    if (
      errores.name ||
      errores.life ||
      errores.strength ||
      errores.defense ||
      errores.speed ||
      errores.height ||
      errores.weight ||
      errores.types ||
      !input.name
      ) {
        console.log("error en el if")
        alert("Pokemon not Created - please complete the inputs");
      
    } else {
        
        await axios.put(`http://localhost:3001/pokemons`,input);
      
      alert("Pokemon Edited - go back to see it");
   
    }}

  function handleChange(e) {   
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
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
    setErrores(
      validation({
        ...input,
        types:[...input.types, e.target.value],
      })
    );
   
  }
function handleDeleteType(e){
  setInput({
    ...input,
    types:input.types.filter(t=>t !==e)
  })
  setErrores(
    validation({
      ...input,
      types:input.types.filter(t=>t !==e)
    })
  );
}

  return (
    <div  className="Formulario">
      <h1>Edit your Pokemon</h1>
      <Link to = '/pokemons'>
        <button>Back</button>
        </Link>
        <div className="nameimage">
    
        <div className="name">
          
          <input
          placeholder={editPokemon.name}
          className="Input-name"
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          ></input>
          <div className="error">{errores.name && <p>{errores.name}</p>}</div>
          </div>
          <div className="image">
           
            <input
            className="Input-image"
            placeholder={editPokemon.image}
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
            ></input>

            <div className="error">{errores.image && <p>{errores.image}</p>}</div>
          </div>
          </div>
          <div className="lifestrength">
          <div className="life">
          
          <input
          className="Input-life"
          placeholder={editPokemon.life}
            type="number"
            value={input.life}
            name="life"
            onChange={handleChange}
          ></input>
          {errores.life && <p>{errores.life}</p>}
            </div>
            <div className="strength">
         
          <input
          className="Input-strength"
          placeholder={editPokemon.strength}
            type="number"
            value={input.strength}
            name="strength"
            onChange={handleChange}
          ></input>
           {errores.strength && <p>{errores.strength}</p>}
          </div>
          </div>
          <div className="defensespeed">
          <div className="defense">
          
          <input
          className="Input-defense"
          placeholder={editPokemon.defense}
            type="number"
            value={input.defense}
            name="defense"
            onChange={handleChange}
          ></input>
           {errores.defense && <p>{errores.defense}</p>}
           </div>
           <div className="speed">
         
          <input
          className="Input-speed"
          placeholder={editPokemon.speed}
            type="number"
            value={input.speed}
            name="speed"
            onChange={handleChange}
          ></input>
           {errores.speed && <p>{errores.speed}</p>}
          </div>
          </div>
          <div className="heigthweight">
          <div className="height">
          
          <input
          className="Input-height"
          placeholder={editPokemon.height}
            type="number"
            value={input.height}
            name="height"
            onChange={handleChange}
          ></input>
           {errores.height && <p>{errores.height}</p>}
          </div>
          <div className="weight">
         
          <input
          className="Input-weight"
            type="number"
            placeholder={editPokemon.weight}
            value={input.weight}
            name="weight"
            onChange={handleChange}
          ></input>
           {errores.weight && <p>{errores.weight}</p>}
           </div>
           </div>
           <div className="type">
          <label>Type: </label>

          <select onChange={(e) => handleselect(e)}>
            {types.map((t) => (
              <option value={t.name}>{t.name}</option>
            ))}
          </select>
          <ul className="selected">
            {input.types.map(e => (
              <div>
                  <ul>
                        {e}<button
                            type="button"
                            onClick={()=>handleDeleteType(e)}
                            >X</button>
                  </ul>
                  </div>
                ) )}</ul>
          {errores.types && <p>{errores.types}</p>}
          </div>
          <div className="submit">
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Edit
          </button>
          </div>
        </div>
      
    
  );
}
