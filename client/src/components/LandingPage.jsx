import React from "react"
import {Link} from "react-router-dom"
import "./LandingPage.css"

export default function LandingPage(){
    return (
        <div className="landing">
            {/* <h1>Pokemon</h1> */}
            <Link to = '/pokemons'>
            <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" width="500px" alt="pokemon logo"></img>
            </div>
                {/* <button className="logo">Home</button>  */}
            </Link>
        </div>
    )
}