import React from 'react'
import PokemonIndexItem from './pokemon_index_item.jsx'

class PokemonIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.requestAllPokemon();
  }

  render () {
    const pokemon = this.props.pokemon.map((poke) => {
      return <PokemonIndexItem key={poke.id} poke={poke}/>
    })

    return (
      <ul>
        {pokemon}
      </ul>
    )
  }
}

export default PokemonIndex;