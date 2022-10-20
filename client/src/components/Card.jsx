import React from "react";
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import "./Card.css"
import { Link } from "react-router-dom";
import axios from "axios";


export default function Card({id, name, image, type}){
const handleDelete = async(id)=>{
    
    await axios.delete(`http://localhost:3001/pokemons/${id}`);
    window.location.reload();
    console.log("elemento eliminado");
    
}
    return(       
        <div className="Card" key ={id}>      
            <h3 className="cardText">{name}</h3>
            <Link to = {`/pokemons/${id}`}>
            <img  className="cardImg" src={!image?"../siluetaPokemon1.png":image} alt="image not found" width="200px" height="230px"/>
            </Link>
            <h3 className="cardText">type: {type}</h3>    
            {id.length>10?
            <div>
            <button className="btn" onClick={()=>handleDelete(id)}><BsFillTrashFill/></button>  
            <Link to = '/editpokemons'><button className="btn"><BsPencilFill/></button></Link>
            </div>
            :null
            }
        </div>    
    )
}
