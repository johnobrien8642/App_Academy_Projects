import React, { useState } from 'react';
import { Mutation } from 'react-apollo'
import { useHistory } from 'react-router-dom';
import Mutations from '../graphql/mutations';
const { REGISTER_USER } = Mutations;


const Register = () => {
  let [name, setName] = useState('');
  let [password, setPassword] = useState('');
  let [email, setEmail] = useState('');

  const updateCache = (client, { data }) => {
    console.log(data)
    client.writeData({
      data: {
        isLoggedIn: data.register.loggedIn,
        username: data.register.name
      }
    })
  }

  const todaysDate = () => {
    const time = new Date().getTime();
    const date = new Date(time);
    
    return date.toString();
  }

  const history = useHistory();

  return (
    <Mutation
      mutation={REGISTER_USER}
      onCompleted={data => {
        const { token } = data.register;
        localStorage.setItem('auth-token', token);
        history.push('/');
      }}
      update={(client, data) => updateCache(client, data)}
    >{registerUser => {
      return (    
        <form
          onSubmit={e => {
            e.preventDefault();
            registerUser({
              variables: {
                name: name,
                email: email,
                password: password,
                date: todaysDate()
              }
            })
          }}
        >
          <input
            type='text'
            onChange={e => setName(name = e.target.value)}
            placeholder={'Enter name'}
          >
          </input>
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
          <button type='submit'>Sign Up</button>
        </form>
      )
    }}
    </Mutation>
  )
}

export default Register;