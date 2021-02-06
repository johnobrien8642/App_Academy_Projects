import React from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    // this.renderErrors = this.renderErrors.bind(this)
    this.update = this.update.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
    this.setState({
      username: '',
      password: ''
    });
    <Redirect to={'/'} />
  }

  update (field) {
    return e => 
    this.setState({ 
      [field]: e.currentTarget.value 
    })
  }

  authLinks () {
    if (this.props.formType === 'login') {
      return <Link to={'/signup'}>Sign Up</Link>
    } else if (this.props.formType === 'signup') {
      return <Link to={'/login'}>Login</Link>
    }
  }
  
  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderErrors()}
        <label>Username:
          <input 
          type="text"
          placeholder={'enter username'}
          onChange={this.update('username')}
          value={this.state.username}/>
        </label>

        <label>Password:
          <input 
          type="text"
          placeholder={'enter password'}
          onChange={this.update('password')}
          value={this.state.password}/>
        </label>

        <input type="submit" value={this.props.formType}/>

        {this.authLinks()}        
      </form>
    )
  }
}

