import { connect } from 'react-redux'
import { createPokemon, updatePokemon } from '../../actions/pokemon_actions'
import PokemonForm from './pokemon_form'
import { selectPokemonMovesNames } from './../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
 return {
   pokemon: ownProps.match.params.pokemonId ? 
    state.entities.pokemon[ownProps.match.params.pokemonId] : null,
   moves: ownProps.match.params.pokemonId ? selectPokemonMovesNames(state) : null, 
   errors: state.ui.errors
 } 
}

const mapDispatchToProps = dispatch => {
 return {
   createPokemon: (pokemon) => dispatch(createPokemon(pokemon)),
   updatePokemon: (pokemon) => dispatch(updatePokemon(pokemon))
 } 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonForm)