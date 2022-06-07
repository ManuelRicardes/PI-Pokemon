import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonsById } from "../redux/actions";
import { Link } from "react-router-dom";
import "./Detail.css"

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokeId = useSelector((state) => state.pokemonId); // me traigo todo lo que esta en el estado de pokemonsId y lo guardo en la constante

  //me traigo del estado las recetas
  useEffect(() => {
    //dispatch(getPokemons())
    dispatch(getPokemonsById(id));
  }, [dispatch, id]); // para que no se genere un bucle infinito

  // function handleClick(e){
  //     e.preventDefault();
  //     dispatch(getAllPokemons()) // lo recetea

  // }

  return pokeId ? 
  (
    <div>
        <Link to="/pokemons">
          <button>Back</button>
        </Link>
      <div className="Detail" key={pokeId.id}>
        <h4 className="Name">{pokeId.name}</h4>
        <div className="Img-back">
        <img className="Img"
          src={pokeId.image?pokeId.image:"../imagenes/siluetaPokemon1.png"}
          alt={pokeId.name}
          width="200px"
          height="230px"
        ></img>
   </div>
        <h4 className="ID">ID: {pokeId.id}</h4>
        <h4 className="Strength">Strength: {pokeId.strength}</h4>
        <h4 className="Defense">Defense: {pokeId.defense}</h4>
        <div className="Life"><h4>Life: {pokeId.life}</h4></div>
        <h4 className="Speed">Speed: {pokeId.speed}</h4>
        <h4 className="Type">Type: {pokeId.types instanceof Array? pokeId.types.map(e=>e.name).join("-"):pokeId.types ? pokeId.types :  "Sin Tipo"}
          </h4>
        <h4 className="Height">Height: {pokeId.height}</h4>
        <h4 className="Weight">Weight: {pokeId.weight}</h4>
      </div>
    </div>
  ):<h1>Loading...</h1>;
}
