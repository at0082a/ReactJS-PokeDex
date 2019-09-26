import React from 'react';
import '../../src/App.css';
import { Link } from 'react-router-dom';

export default class PokeCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      pokemonIndex: '',
      imageLoading: true
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
        <Link to={`/pokemon/${this.state.pokemonIndex}`}>
          <div className='card'>
            <h5> {this.state.pokemonIndex} </h5>
            <img className="pokePic" 
            src={this.state.imageUrl} 
            onLoad={() => this.setState({imageLoading: false})}
            alt="new" 
            />
            <div className='card-header'>
              <h3> {this.state.name} </h3>
            </div>
          </div>
        </Link>
      </div>
      )
    } 
}