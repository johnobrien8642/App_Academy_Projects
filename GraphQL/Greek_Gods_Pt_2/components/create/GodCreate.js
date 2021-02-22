import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo';

import Mutations from '../../client/graphql/mutations'
import Queries from '../../client/graphql/mutations'
const { NEW_GOD }  = Mutations;
const { FETCH_GODS } = Queries;

class GodCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      type: 'God',
      description: '',
      message: ''
    }

    this.update = this.update.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateCache = this.updateCache.bind(this)
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value })
  }

  handleSubmit(e, newGod) {
    e.preventDefault();
    let name = this.state.name;

    newGod({
      variables: {
        name: name,
        type: this.state.type,
        description: this.state.description
      }
    }).then(() => {
      this.setState({
        message: `New god "${name}" created successfully`,
        name: '',
        type: '',
        description: ''
      })
    }).then(() => this.props.history.push('/'))
  }

  updateCache(cache, data) {
    let gods;
    try {
      gods = cache.readQuery({ query: FETCH_GODS });
    } catch (err) {
      return;
    }
    const newGod = data.data.newGod

    if (gods) {
      const godArray = gods.gods;

      cache.writeQuery({
        query: FETCH_GODS,
        data: { gods: godArray.concat(newGod) }
      });
    }
  }

  render () {
    return (
      <Mutation
        mutation={NEW_GOD}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newGod, { data }) => (
          <div>
            <h1>Create A New God</h1>
            <form onSubmit={e => this.handleSubmit(e, newGod)}>
              <input
                type='text'
                placeholder='name'
                onChange={this.update('name')}
              />
              <textarea
                placeholder='description'
                onChange={this.update('description')}
              ></textarea>
              <select onChange={this.update('type')}>
                <option value="God">God</option>
                <option value="Goddess">Goddess</option>
              </select>
              <button>submit</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    )
  }
}

export default GodCreate;