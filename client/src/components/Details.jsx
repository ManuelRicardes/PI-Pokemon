import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonsById } from "../redux/actions";
import { Link } from "react-router-dom";

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

  return (
    <div>
        <Link to="/pokemons">
          <button>Back</button>
        </Link>
      <div key={pokeId.id}>
        <h3>ID: {pokeId.id}</h3>
        <h4>Name: {pokeId.name}</h4>
        <img
          src={pokeId.image}
          alt={pokeId.name}
          width="200px"
          height="250px"
        />
        <h4>Type : {pokeId.type}</h4>
        <h4>Life: {pokeId.life}</h4>
        <h4>Strength: {pokeId.strength}</h4>
        <h4>Defense: {pokeId.defense}</h4>
        <h4>Speed: {pokeId.speed}</h4>
        <h4>Height: {pokeId.height}</h4>
        <h4>Weight: {pokeId.weight}</h4>
      </div>
    </div>
  );
}
