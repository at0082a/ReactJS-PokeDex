import React from 'react';
import axios from 'axios';
import '../../src/App.css';


const type_colours = {
  normal: 'A8A77A',
  fire: 'EE8130',
  water: '6390F0',
  electric: 'F7D02C',
  grass : '7AC74C',
  ice: '96D9D6',
  fighting: 'C22E28',
  poison: 'A33EA1',
  ground: 'E2BF65',
  flying: 'A98FF3',
  psychic: 'F95587',
  bug : 'A6B91A',
  rock : 'B6A136',
  ghost : '735797',
  dragon : '6F35FC',
  dark : '705746',
  steel : 'B7B7CE',
  fairy : 'D685AD'
};

export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        description: '',
        types: [],
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
  console.log("this is description", description);

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
  const types = pokemon.data.types.map(type => {
      return type.type.name;
  });
  const abilities = pokemon.data.abilities.forEach(element => {
      return element.ability.name;
  });
  
  await axios.get(species).then(results => {
    let description = '';
    results.data.flavor_text_entries.some(flavor => {
      if (flavor.language === 'en') { 
        console.log(flavor.flavor_text);
        description = flavor.flavor_text;
        return
      }
    });
    this.setState({description});
  });

  this.setState({
    imageUrl,
    pokemonIndex,
    name,
    types,
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
              <div>
                <h5 className='col-4' style={{float: 'left'}}> {this.state.pokemonIndex} </h5>
              </div>
              <div className='col-9'>
                {this.state.types.map(type => 
                  <span key={{type}} className='badge badge-pill'
                  style={{backgroundColor: `#${type_colours[type]}`, float:'right'}}> 
                  {type} 
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='row align-items-center'>
             <div className='col-md-3'>
                <img src={this.state.imageUrl} 
                className='card-img-top rounded mx-auto mt-2' 
                alt={this.state.name}
                />
             </div>
             <div className='col-md-9'>
                <h4 className='mx-auto'> {this.state.name} </h4>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>
                    HP
                  </div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                    <div className='progress-bar' role='progressBar' 
                      style={{width:`${this.state.stats.hp}%`}} 
                      aria-valuenow='0'
                      aria-valuemin='25'                       
                      aria-valuemax='100' >
                      <small>{this.state.stats.hp}</small>
                   </div>
                  </div>
                 </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>
                    Attack
                  </div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                    <div className='progress-bar' role='progressBar' 
                      style={{width:`${this.state.stats.attack}%`}} 
                      aria-valuenow='0'
                      aria-valuemin='25'                       
                      aria-valuemax='100' >
                      <small>{this.state.stats.attack}</small>
                   </div>
                  </div>
                 </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>
                    Defense
                  </div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                    <div className='progress-bar' role='progressBar' 
                      style={{width:`${this.state.stats.defense}%`}} 
                      aria-valuenow='0'
                      aria-valuemin='25'                       
                      aria-valuemax='100' >
                      <small>{this.state.stats.defense}</small>
                   </div>
                  </div>
                 </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>
                    Speed
                  </div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                    <div className='progress-bar' role='progressBar' 
                      style={{width:`${this.state.stats.speed}%`}} 
                      aria-valuenow='0'
                      aria-valuemin='25'                       
                      aria-valuemax='100' >
                      <small>{this.state.stats.speed}</small>
                   </div>
                  </div>
                 </div>
                </div>
                <div className='row mt-1'>
                  <div className='col'>
                  <p> {this.state.height} </p>
                  </div>
                </div>
               </div>   
              </div>
             </div>
             <hr/>
            </div>
           </div>
    );
  }
}
