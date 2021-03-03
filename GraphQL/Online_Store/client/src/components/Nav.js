import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Queries from '../graphql/queries';
import { ApolloConsumer, Query } from 'react-apollo'
const { IS_LOGGED_IN, GET_USERNAME } = Queries;

const Nav = props => {
  const history = useHistory();

  return (
  <ApolloConsumer>
    {client => (
    <Query
      query={IS_LOGGED_IN}
    >{({ data }) => {
      if (data.isLoggedIn) {
        return (
          <div>
            <Query query={GET_USERNAME}>
              {({ data }) => {
                return (
                  <div>
                    <h2>{data.username}</h2>
                    <Link to={`/${data.username}/cart`}>
                      <button>Cart</button>
                    </Link>
                  </div>
                )
              }}
              </Query>
            <button
              onClick={e => {
                e.preventDefault();
                localStorage.removeItem('auth-token');
                client.writeData({
                  data: {
                    isLoggedIn: false,
                    username: ''
                  }
                })
                history.push('/');
              }}
            >
              Logout
            </button>
          </div>
        );
      } else {
        return (
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>
        );
      }
    }}
    </Query>
    )}
    </ApolloConsumer>
  )
};

export default Nav;