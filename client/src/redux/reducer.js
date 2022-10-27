const initialState = {
    pokemons:[],
    types:[],
    pokemonId:{},
    allPokemons:[],
    editPokemon:{},
    newPokemon:[]
}

function reducer(state=initialState, {type,payload}){
switch (type){
    
    case "GET_POKEMONS":
        return{
            ...state,
            pokemons: payload,
            allPokemons:payload
        }
    case "GET_TYPE":
        return{
            ...state,
            types:payload
        }
        case "ORDER_BY_NAME":
        let arr = payload === "asc"? state.pokemons.sort(function(a,b){
            if (a.name > b.name){
                return 1
            }
            if(b.name > a.name){
                return -1
            }
            return 0  
    }): 
        state.pokemons.sort(function(a,b){
            if (a.name > b.name){
                return -1
            }
            if(b.name > a.name){
                return 1
            }
            return 0
    } )
        return{
            ...state,
            pokemons:arr
        }
        case "ORDER_BY_STRENGTH":
        let array = payload === "asc"? state.pokemons.sort(function(a,b){
            if (a.strength > b.strength){
                return 1
            }
            if(b.strength > a.strength){
                return -1
            }
            return 0  
    }):  payload === "des"?
        state.pokemons.sort(function(a,b){
            if (a.strength > b.strength){
                console.log(a.strength)
                return -1
            }
            if(b.strength > a.strength){
                return 1
            }
            return 0
    } ):state.pokemons.sort(function(a,b){
        if (a.id > b.id){
            return 1
        }
        if(b.strength > a.strength){
            return -1
        }
        return 0 })
        return{
            ...state,
            pokemons:array
        }
        case "GET_POKEMON_BY_NAME":
            const pokemon = state.allPokemons
            const pokemonByName = pokemon.filter(e=>e.name === payload.name)
        return{
            ...state,
            pokemons: pokemonByName
           
        }
        case "GET_POKEMONS_BY_ID":
        return{
            ...state,
            pokemonId: payload
           
        }
        case "GET_EDIT_POKEMON":
            return{
                ...state,
                editPokemon: payload
               
            }
    
        case "FILTER_BY_TYPE":
        const types = state.allPokemons
        const filterByType = payload === "All" ? types
        : types.filter(e=>e.types.includes(payload))
       
                return{
                ...state,
                pokemons: filterByType
            }
            case "FILTER":
                const poke = state.allPokemons
                const existing = poke.filter(e=>e.id<1000)
                const created= poke.filter(e=>e.id.length>30)
                
                const filter = payload === "created" ? created : payload === "existing" ? existing : poke
                        return{
                        ...state,
                        pokemons: filter
                    }

    
    
    default: return state
    }
}

export default reducer;