import React from "react"
import {Link} from "react-router-dom"
import "./LandingPage.css"

export default function LandingPage(){
    return (
        <div>
            <h1>Pokemon</h1>
            <Link to = '/pokemons'>
                <button>Home</button> 
            </Link>
        </div>
    )
}