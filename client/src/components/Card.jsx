import React from "react";
// import { Link } from "react-router-dom";
import "./Card.css"

export default function Card({id, name, image, type}){
    return(
        <div className="Card" key ={id}>
        
        <h3 className="cardText">{name}</h3>
        <img  className="cardImg" src={!image?"../siluetaPokemon1.png":image} alt="image not found" width="200px" height="230px"/>
        <h3 className="cardText">type: {type}</h3>
        
    </div>
    )
}