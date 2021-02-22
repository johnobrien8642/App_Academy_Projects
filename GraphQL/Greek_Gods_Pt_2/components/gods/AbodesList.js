import React from 'react';
import Queries from '../../client/graphql/queries';
// import DeleteGod from './DeleteGod'
import { Query } from 'react-apollo';
import { Link, Route } from 'react-router-dom';
import AbodeCreate from '../create/AbodeCreate'

const { FETCH_ABODES } = Queries;

const AbodesList = () => {
  return (
    <div className='outer'>
      <Link to='/abodes/new'>Create New Abode</Link>
      <ul>
        <Query query={FETCH_ABODES}>{({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>

          return data.abodes.map(({ id, name, coordinates }) => (
            <li key={id}>
              <Link to={`/abodes/${id}`}>
                <h4>{name}</h4>
              </Link>
              <p>{coordinates}</p>
              {/* <DeleteGod id={id} /> */}
            </li>
          ))
        }}
        </Query>
      </ul>
    </div>
  )
}

export default AbodesList;