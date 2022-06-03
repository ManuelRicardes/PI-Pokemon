//--------------------------------------------------------------------------------------------------------
//paginado segun selene

import React from "react";
export function Paginado({pokemonsPerPage, pokemons, paginado}){
const pageNumber =[]

for(let i=0; i<Math.ceil(pokemons/pokemonsPerPage);i++){
    pageNumber.push(i+1)
}

return(
    <nav>
        <ul className="paginado">
            {pageNumber && pageNumber.map(number =>(
                <ul className="number" key={number}>
                <a onClick={() => paginado(number)}>{number}</a>
               </ul>
            ))}
        </ul>
    </nav>
)


}









//--------------------------------------------------------------------------------------------------------