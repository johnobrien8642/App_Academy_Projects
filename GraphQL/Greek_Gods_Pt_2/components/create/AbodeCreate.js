import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo';

import Mutations from '../../client/graphql/mutations'
import Queries from '../../client/graphql/mutations'
const { NEW_ABODE } = Mutations;
const { FETCH_ABODES } = Queries;

class AbodeCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      coordinates: '',
      message: ''
    }

    this.update = this.update.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateCache = this.updateCache.bind(this)
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value })
  }

  handleSubmit(e, newAbode) {
    e.preventDefault();
    const { name, coordinates } = this.state;

    newAbode({
      variables: {
        name: name,
        coordinates: coordinates
      }
    }).then(() => {
      this.setState({
        message: `New abode "${name}" created successfully`,
        name: '',
        coordinates: ''
      })
    }).then(() => this.props.history.push('/abodes'))
  }

  updateCache(cache, data) {
    let abodes;
    try {
      abodes = cache.readQuery({ query: FETCH_ABODES });
    } catch (err) {
      return;
    }
    const newAbode = data.data.newAbode

    if (abodes) {
      const abodeArray = abodes.abodes;

      cache.writeQuery({
        query: FETCH_ABODES,
        data: { abodes: abodeArray.concat(newAbode) }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_ABODE}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newAbode, { data }) => (
          <div>
            <h1>Create A New Abode</h1>
            <form onSubmit={e => this.handleSubmit(e, newAbode)}>
              <input
                type='text'
                placeholder='name'
                onChange={this.update('name')}
              />
              <input
                type='text'
                placeholder='coordinates'
                onChange={this.update('coordinates')}
              />
              <button>submit</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    )
  }
}

export default AbodeCreate;