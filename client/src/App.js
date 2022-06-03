import './App.css';
import {Route,Switch} from "react-router-dom"
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Detail from './components/Details';
import CreatePokemon from './components/CreatePokemon';

function App() {
  return (
    <div className="App">
       {/* <Switch> */}
      <Route exact path= '/' component={LandingPage}/>
      <Route exact path= '/pokemons' component={Home}/>
      <Route path= '/pokemons/:id' component={Detail}/>
      <Route path= '/createpokemons' component={CreatePokemon}/>
       {/* <Switch/> */}
    </div>
  );
}

export default App;
