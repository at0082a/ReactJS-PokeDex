import React from 'react';
import '../../src/App.css';

export default class PokeCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      pokemonIndex: ''
    };
  }
  componentDidMount() {
    const name = this.props.name;
    const url = this.props.url;
    console.log(url);
    const pokemonIndex = url.split("/")[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
    this.setState({name, imageUrl, pokemonIndex});
  }

  render() {
    return (
      <div className='col-md-3 col-sm-6 mb-5'> 
          <div className='card'>
            <h5>{this.state.pokemonIndex} </h5>
            <img className="pokePic" src={this.state.imageUrl} alt="new" />
            <div className='card-header'>
              <h1> {this.state.name} </h1>
            </div>
          </div>
      </div>
      )
    } 
}