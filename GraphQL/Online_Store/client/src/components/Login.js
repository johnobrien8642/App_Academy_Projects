import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Mutations from '../graphql/mutations';
const { LOGIN_USER } = Mutations;


const Login = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const history = useHistory();

  const updateCache = (client, {data}) => {
    client.writeData({
      data: { 
        isLoggedIn: data.login.loggedIn, 
        username: data.login.name 
      }
    });
  }
   
  return (
    <Mutation 
      mutation={LOGIN_USER}
      onCompleted={data => {
        const { token } = data.login;
        localStorage.setItem('auth-token', token);
        history.push('/');
      }}
      update={(client, data) => updateCache(client, data)}
    >{loginUser => {
      return (
        <form 
          onSubmit={e => {
            e.preventDefault();
            loginUser({
              variables: {
                email: email,
                password: password
              }
            });
          }}
        >
          <input 
            type='text'
            onChange={e => setEmail(email = e.target.value)}
            placeholder={'Enter email'}
          >
          </input>
          <input 
            type='text'
            onChange={e => setPassword(password = e.target.value)}
            placeholder={'Enter password'}
          >
          </input>
          <button value='submit'>login</button>
        </form>
      )
    }}
    </Mutation>
  )
}

export default Login;