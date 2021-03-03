import React from 'react';
import Queries from '../../client/graphql/queries';
import Mutations from '../../client/graphql/mutations';
import { Query, Mutation } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import EmblemCreate from '../create/EmblemCreate'

const { FETCH_EMBLEMS } = Queries;
const { ADD_GOD_EMBLEM } = Mutations;

class EmblemsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      emblems: this.props.emblems,
      emblemId: ''
    }

    this.fieldUpdate = this.fieldUpdate.bind(this)
  }
  
  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render () {
    const firstOptionDefault = 'default'
    return (
      <div className='outer'>
      <Link to='/emblems/new'>Create New Emblem</Link>
      <Route exact path='/emblems/new' component={EmblemCreate}/>
      <Mutation 
        mutation={ADD_GOD_EMBLEM}
      >
        {(addGodEmblem, data) => (
      <form
        onSubmit={e => {
          e.preventDefault();
          addGodEmblem({
            variables: {
              godId: this.props.god.id,
              emblemId: this.state.emblemId
            }
          }).then((data) => {
            const newEmblems = data.data.addGodEmblem.emblems
            this.setState({ emblems: newEmblems })
            return newEmblems
          }).then((newEmblems) => this.props.updateAddEmblems(newEmblems))
        }}
      >
        
          <Query query={FETCH_EMBLEMS}>{({ loading, error, data }) => {
            if (loading) return <option>Loading...</option>
            if (error) return <option>Error</option>
            
            let matched = false;
            
            <select 
              defaultValue={this.state.emblemId} 
              onChange={this.fieldUpdate('emblemId')}>
            {data.emblems.map((emblem, i) => {
              this.state.emblems.forEach((emblem2, i) => {
                if (emblem.id == emblem2.id) {
                  matched = true
                }
                if (!matched) {
                  return <option key={i} value={emblem.id}>{emblem.name}</option>
                } else {
                  matched = false;
                }
              })
            })}
            </select>
          }}
          </Query>
        <button value='submit'>Submit Emblem</button>
        </form>
      )}
      </Mutation>
    </div>
    )
  }
}

export default EmblemsList;