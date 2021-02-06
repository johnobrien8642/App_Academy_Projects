// import React from 'react';
// import { Link } from 'react-router-dom';

// const Greeting = ({ currentUser, logout }) => {
//   const sessionLinks = () => (
//     <nav className="login-signup">
//       <Link to="/login">Login</Link>
//       &nbsp;or&nbsp;
//       <Link to="/signup">Sign up!</Link>
//     </nav>
//   );
//   const personalGreeting = () => (
//     <hgroup className="header-group">
//       <h2 className="header-name">Hi, {currentUser.username}!</h2>
//       <button className="header-button" onClick={logout}>Log Out</button>
//     </hgroup>
//   );

//   return currentUser ? personalGreeting() : sessionLinks();
// };


// export default Greeting;


import React from 'react'
import { Route, Link } from 'react-router-dom'
import { logout } from '../../util/session_api_util';

export default class Greeting extends React.Component {
  constructor(props) {
    super(props)

    this.renderAuthInterface = this.renderAuthInterface.bind(this)
  }

  logoutUser (e) {
    e.preventDefault();
    logout(currentUser)
  }

  renderAuthInterface () {
    if (this.props.currentUser) {
      return (
        <div className='welcome'>
          <h2>{this.props.currentUser.username}</h2>
          <button onClick={this.props.logout}>Log out</button>
        </div>
      )
    } else {
      return <Route exact path={'/'} render={() => 
      <div className='sign-up-or-login'>
        <Link to='/signup'>Sign up</Link>
        <Link to='/login'>Login</Link>
      </div>} /> 
    }
  }

  render () {
    return (
      <div className='greeting'>
        {this.renderAuthInterface()}
      </div>
    )
  };
}