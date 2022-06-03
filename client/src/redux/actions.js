import axios from "axios"

export function getAllPokemons(){
    return async function(dispatch){
        return await axios("http://localhost:3001/pokemons/")
        .then(res=>dispatch({type: "GET_POKEMONS", payload:res.data}))
    }
}
export function getTypes(){
    return async function(dispatch){
        return await axios("http://localhost:3001/type")
        .then(res=>dispatch({type: "GET_TYPE", payload:res.data}))
    }
}

export function getPokemonByName(name){
    return async function(dispatch){
       // try{
        let back= await axios(`http://localhost:3001/pokemons/name?name=${name}`)
        return dispatch({
            type: "GET_POKEMON_BY_NAME",
            payload: back.data
        })
    // }catch{
    // console.log("Rompimo todo")
    // }
}
}
export function orderByName(payload){
    return {
        type:"ORDER_BY_NAME",
        payload
    }
}
export function orderByStrength(payload){
    
    return {
        type:"ORDER_BY_STRENGTH",
        payload
    }
}

export function getPokemonsById(id){

    return async function(dispatch){
        const json =(await axios.get(`http://localhost:3001/pokemons/${id}`)).data           
        return dispatch({
          type : "GET_POKEMONS_BY_ID",
          payload : json
        })
      }

    }
    export function filterByType(payload){
        console.log(payload)
        return {
        type : "FILTER_BY_TYPE",
        payload
        }
    }
    export function filter(payload){
        return {
        type : "FILTER",
        payload
        }
    }
    export function postNewPokemon(payload){

       return async function(dispatch){
        const json =(await axios.post(`http://localhost:3001/pokemons`,payload))
        return json
      }
    }