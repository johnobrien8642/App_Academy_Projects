import React from 'react'
import GreetingContainer from './greeting/greeting_container'
import LoginFormContainer from './session_form/login_form_container'
import SignupFormContainer from './session_form/signup_form_container'
import { AuthRoute } from '../util/route_util.jsx'
import { Route, Link } from 'react-router-dom'

const App = () => (
  <div>
    <header>
      <Link to='/' className='header-link'>
        <h1>Bench BnB</h1>
      </Link>
      <GreetingContainer />
    </header>
      
      <AuthRoute exact path={'/login'} component={LoginFormContainer} />
      <AuthRoute exact path={'/signup'} component={SignupFormContainer} />
  </div>
)

export default App;