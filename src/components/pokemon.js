import React from 'react';
import axios from 'axios';
import '../../src/App.css';


export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        description: '',
        stats: {
          hp: '',
          attack: '',
          defense: '',
          speed: '',
          specialAttack: '',
          specialDefense:''
        },
        height: '',
        weight: '',
        abilities: '',
        evs: ''
  };
}

async componentDidMount () {
  const { pokemonIndex } = this.props.match.params;
  
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
  const species = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

  const pokemon = await axios.get(url);
  const name = pokemon.data.name;
  const imageUrl = pokemon.data.sprites.front_default;

  let {hp, attack, defense, speed, specialAttack, specialDefense, description} = ''; 

  pokemon.data.stats.map(stat => {
    // eslint-disable-next-line default-case
    switch(stat.stat.name) {
      case 'hp' :
        hp = stat['base_stat']
        break;
      case 'attack' :
        attack = stat['base_stat'];
        break;
      case 'defense' :
        defense = stat['base_stat'];
        break;
      case 'speed' : 
        speed = stat['base_stat'];
        break;
      case 'special_attack' :
        specialAttack = stat['base_stat'];
        break;
      case 'special_defense' :
        specialDefense = stat['base_stat'];
        break;
    }
  });

  const height = pokemon.data.height;
  const weight = pokemon.data.weight;
  const abilities = pokemon.data.abilities.forEach(element => {
      return element.ability.name;
  });
  
  await axios.get(species).then(results => {
    results.data.flavor_text_entries.some(flavor => {
      if (flavor.language === 'en') { 
        description = flavor.flavor_text;
        return;
      }
    });
  });

  this.setState({
    description,
    imageUrl,
    pokemonIndex,
    name,
    stats : {
      hp,
      attack,
      defense,
      speed,
      specialAttack,
      specialDefense
    },
    height,
    abilities,
    weight
  });
}
  
  render () {
    return (
      <div className='col'>
        <div className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-5'>
                <h5> {this.state.pokemonIndex} </h5>
                <img className="pokeIndividualPic" 
                src={this.state.imageUrl} 
                onLoad={() => this.setState({imageLoading: false})}
                alt="new" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
