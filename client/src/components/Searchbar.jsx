import React, { useState } from "react";
import { getPokemonByName } from "../redux/actions";
import {useDispatch} from "react-redux"
import "./Searchbar.css"



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
          <div >
            <input
              className="Searchbar"
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearch(e)}
            />
            <button className="Searchbutton" type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
            </div>
        );
      }
      




    export default SearchBar


    