import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo';

import Mutations from '../../client/graphql/mutations'
import Queries from '../../client/graphql/mutations'
const { NEW_EMBLEM } = Mutations;
const { FETCH_EMBLEMS } = Queries;

class EmblemCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      message: ''
    }

    this.update = this.update.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateCache = this.updateCache.bind(this)
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value })
  }

  handleSubmit(e, newEmblem) {
    e.preventDefault();
    let name = this.state.name;

    newEmblem({
      variables: {
        name: name
      }
    }).then(() => {
      this.setState({
        message: `New emblem "${name}" created successfully`,
        name: ''
      })
    }).then(() => this.props.history.push('/emblems'))
  }

  updateCache(cache, data) {
    let emblems;
    try {
      emblems = cache.readQuery({ query: FETCH_EMBLEMS });
    } catch (err) {
      return;
    }
    const newEmblem = data.data.newEmblem

    if (emblems) {
      const emblemArray = emblems.emblems;

      cache.writeQuery({
        query: FETCH_EMBLEMS,
        data: { emblems: emblemArray.concat(newEmblem) }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={NEW_EMBLEM}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(newEmblem, { data }) => (
          <div>
            <h1>Create A New Emblem</h1>
            <form onSubmit={e => this.handleSubmit(e, newEmblem)}>
              <input
                type='text'
                placeholder='name'
                onChange={this.update('name')}
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

export default EmblemCreate;