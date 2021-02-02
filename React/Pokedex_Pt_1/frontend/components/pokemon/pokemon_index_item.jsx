import React from 'react'

export default class PokemonIndexItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { poke } = this.props
    return (
      <li>
        <h2>{ poke.name }</h2>
        <img src={ poke.imageUrl } />
      </li>
    )
  }
}