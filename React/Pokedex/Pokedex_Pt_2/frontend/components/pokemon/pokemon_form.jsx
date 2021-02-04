import React from 'react'

export default class PokemonForm extends React.Component {
  constructor(props) {
    super(props)
    const { id, name, attack, defense, pokeType, imageUrl } = this.props.pokemon;

    this.state = {
      id: id || '',
      name: name || '',
      attack: attack || '',
      defense: defense || '',
      poke_type: pokeType || 'bug',
      image_url: imageUrl || '',
      move_1: this.props.moves[0] || '',
      move_2: this.props.moves[1] || '',
      move_3: this.props.moves[2] || ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.pokemon) {
      this.props.updatePokemon(this.state, this.props.pokemon.id)
        .then(
          updatedPokemon =>
            this.props.history.push(
              `/pokemon/${updatedPokemon.id}`
            )
        )
    } else {
      this.props.createPokemon(this.state)
        .then(
          newPokemon =>
          this.props.history.push(
            `/pokemon/${newPokemon.id}`
          )
        )
    }
  }

  errors() {
    return this.props.errors.map(error => {
      return (
        <li className="error" key={error}>
          {error}
        </li>
      );
    });
  }

  render () {
  const TYPES = window.POKEMON_TYPES

    const types = TYPES.map((type, i) => {
      return <option key={i} value={type}>{type}</option>
    })

    return (
      <section className={ this.props.pokemon ? '' : 'pokemon-detail' }>
        <p>{console.log(this.props.pokemon)}</p>
        <ul>{this.errors()}</ul>
        <form className='pokemon-form' onSubmit={this.handleSubmit}>
          <input type="hidden"
          name='id'
          value={this.props.pokemon.id}/>
          
          <input
          type='text' 
          placeholder={'enter name'}
          onChange={this.update('name')}
          value={this.state.name}/>
          
          <input
          input='text'
          placeholder={'paste image url'}
          onChange={this.update('image_url')}
          value={this.state.image_url}/>

          <select 
            onChange={this.update('poke_type')} 
            value={this.state.poke_type}>
            {types}
          </select>
          
          <input
          type='number'
          min='0'
          max='99'
          onChange={this.update('attack')}
          placeholder='Attack'
          value={this.state.attack}/>
          
          <input
          type='number'
          min='0'
          max='99'
          onChange={this.update('defense')}
          placeholder='Defense'
          value={this.state.defense} />
          
          <input
          type="text"
          value={this.state.move_1}
          placeholder="Move 1"
          onChange={this.update("move_1")}/>

          <input
          type="text"
          value={this.state.move_2}
          placeholder="Move 2"
          onChange={this.update("move_2")}/>
          
          <input
          type="text"
          value={this.state.move_3}
          placeholder="Move 3"
          onChange={this.update("move_3")}/>
          
          <button>Submit</button>
        </form>
      </section>
    )
  }
}