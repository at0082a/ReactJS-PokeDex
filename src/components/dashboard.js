import React from 'react';
import '../../src/App.css';
import PokeCard from './pokeCard';

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pokemon : [],
      value: 0
  };
  this.handleClick = this.handleClick.bind(this);
  this.getData = this.getData.bind(this);
}

  componentDidMount () {
    this.getData();
  }
  
  getData () {  
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0")
        .then(response => response.json())
        .then(pokemon => {
          this.setState({
            pokemon : [...pokemon.results]
        });
    });
  }

  handleClick (event) {
    let value = this.state.value;
    console.log(value);

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${value}`)
    .then(response => response.json())
    .then(pokemon => {
      this.setState ({pokemon: [] });
      this.setState({
        pokemon : [...pokemon.results]
      });
  });
    
    if (event.target.id === "increment" && value >= 0 ) {
      this.setState((state) => ({
        value: state.value + 20}));
    } else if (event.target.id === "decrement" && value >= 20) {
      this.setState((state) => ({
        value: state.value - 20}));
    }
  }

  render () {
    let pokemon = this.state.pokemon;
    return (
      <div className='col'>
        <div className="row">
            {pokemon.map(poke => <PokeCard key={poke.name} name={poke.name} url={poke.url}/>)};
        </div>
        <button id="decrement" onClick={this.handleClick}> Previous </button>
        <button id="increment" onClick={this.handleClick}> Next </button>
      </div>
    );
  }

}