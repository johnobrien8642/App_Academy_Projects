import React from 'react';
import Item from './../items/item';
import ItemDetailContainer from './../items/item_detail_container';
import PokemonFormContainer from './../pokemon/pokemon_form_container';
import { Route, Link } from 'react-router-dom';
import LoadingIcon from './loading_icon';

class PokemonDetail extends React.Component {

  componentDidMount() {
    this.props.requestSinglePokemon(this.props.match.params.pokemonId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.pokemonId !== this.props.match.params.pokemonId) {
      this.props.requestSinglePokemon(this.props.match.params.pokemonId)
    }
  }

  render() {
    if (this.props.loading) {
      return <section className="pokemon-detail"><LoadingIcon /></section>;
    }
    if (!this.props.pokemon) return null;
    
    return (
      <section className="pokemon-detail">
        <figure>
          <img src={this.props.pokemon.imageUrl} alt={this.props.pokemon.name} />
        </figure>

        <Link to={`/pokemon/${this.props.pokemon.id}/edit`}>
          Edit ${this.props.pokemon.name}
        </Link>

        <ul>
          <li><h2>{this.props.pokemon.name}</h2></li>
          <li>Type: {this.props.pokemon.pokeType}</li>
          <li>Attack: {this.props.pokemon.attack}</li>
          <li>Defense: {this.props.pokemon.defense}</li>
          <li>Moves: {this.props.moves.join(', ')}</li>
        </ul>

        <section className="toys">
          <h3>Items</h3>
          <ul className="toy-list">
            {this.props.items.map(item => <Item key={item.name} item={item} />)}
          </ul>
        </section>
        
        <Route path="/pokemon/:pokemonId/item/:itemId" component={ItemDetailContainer} />
        <Route path="/pokemon/:pokemonId/edit" component={PokemonFormContainer} />

      </section>
    )
  }
}

export default PokemonDetail;
