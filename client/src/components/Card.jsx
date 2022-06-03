import React from "react";
import { Link } from "react-router-dom";

export default function Card({id, name, image, type}){
    return(
        <div key ={id}>
        
        <h3>{name}</h3>
        <img  src={image} alt={name} width="200px" height="250px"/>
        <h5>type: {type}</h5>
        
    </div>
    )
}