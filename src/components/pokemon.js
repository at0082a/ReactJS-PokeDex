import React from 'react';
import axios from 'axios';

export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        name: '',
        pokemonIndex: '',
        imageUrl: ''
  };
}

async componentDidMount () {
  const { pokemonIndex } = this.props.match.params;
  
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
  console.log(url);
  const species = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

  const pokemon = await axios.get(url);
  const name = pokemon.data.name;

  this.setState({pokemonIndex: pokemonIndex, imageUrl: url, name: name});
}
  
  render () {
    return (
      <div>
        <h1 style={{ margin: "200px" }}> {this.state.name} </h1>
      </div>
    );
  }
}
