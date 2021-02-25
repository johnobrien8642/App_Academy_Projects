import React from 'react';
import Queries from '../../client/graphql/queries';
import Mutations from '../../client/graphql/mutations';
import { Query, Mutation } from 'react-apollo';

const { FETCH_ABODES } = Queries;
const { UPDATE_GOD_ABODE } = Mutations;

class AbodesList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      abodeId: this.props.abodeId || '',
    }
    this.fieldUpdate = this.fieldUpdate.bind(this)
    this.renderOptions = this.renderOptions.bind(this)
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  renderOptions() {
    return (
      <Query query={FETCH_ABODES}>{({ loading, error, data }) => {
        if (loading) return <option>Loading...</option>
        if (error) return <option>Error</option>
        return data.abodes.map((abode, i) => (
          <option
            key={i}
            value={abode.id}
          >
            {abode.name}
          </option>
        ))
      }}
      </Query>
    )
  }

  render() {
    const firstOptionDefault = this.state.abodeId
    return (
      <div className='outer'>
        <h1>Update Abode</h1>
        <Mutation 
          mutation={UPDATE_GOD_ABODE}
        >
          {(updateGodAbode, data) => (
          <form
            onSubmit={e => {
            e.preventDefault();
              updateGodAbode({
              variables: {
                godId: this.props.godId,
                abodeId: this.state.abodeId
              }
              }).then((data) => {
              const newAbode = data.data.updateGodAbode.abode
              this.props.updateAbode(newAbode)
              })
            }}
        >
            <select
              defaultValue={this.state.abodeId}
              onChange={this.fieldUpdate('abodeId')}
            >
              <option disabled>--Select Abode--</option>
              {this.renderOptions()}
            </select>
            <button>Update Abode</button>
        </form>
        )}
        </Mutation>
      </div>
    )
  }
}

export default AbodesList;