import React from 'react';
import Queries from '../../client/graphql/queries';
// import DeleteGod from './DeleteGod'
import { Query } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import EmblemCreate from '../create/EmblemCreate'

const { FETCH_EMBLEMS } = Queries;

const EmblemsList = () => {
  return (
    <div className='outer'>
      <Link to='/emblems/new'>Create New Emblem</Link>
      <Route exact path='/emblems/new' component={EmblemCreate}/>
      <ul>
        <Query query={FETCH_EMBLEMS}>{({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>

          return data.emblems.map(({ id, name }) => (
            <li key={id}>
              <Link to={`/emblems/${id}`}>
                <h4>{name}</h4>
              </Link>
              {/* <DeleteGod id={id} /> */}
            </li>
          ))
        }}
        </Query>
      </ul>
    </div>
  )
}

export default EmblemsList;