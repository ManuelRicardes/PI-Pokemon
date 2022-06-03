import React, { useState } from "react";
import { getPokemonByName } from "../redux/actions";
import {useDispatch} from "react-redux"



    export function SearchBar() {
      const dispatch = useDispatch()
      const [name, setPokemons] = useState("");
      function handleSearch(e){
        e.preventDefault()
        setPokemons(e.target.value)
        
      } 
function handleSubmit(e){
        e.preventDefault()
        dispatch(getPokemonByName(name))
        }   
        return (
          <div>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearch(e)}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
            </div>
        );
      }
      




    export default SearchBar


    