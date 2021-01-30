import { uniqueId } from '../../util/id_generator'
import React from 'react';

export default class TodoForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      done: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return e => this.setState({[property]: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault();
    const todo = Object.assign({}, this.state, { id: uniqueId() });
    this.props.receiveTodo(todo);
    this.setState({
      title: '',
      body: '',
    })
  }

  render () {
    return (
      <form className='todo-form' onSubmit={this.handleSubmit}>
        <label>Title:
          <input 
          className='input'
          ref='ref'
          value={this.state.title}
          placeholder='go to the bank'
          onChange={this.update('title')}
          required/>
        </label>
        <label>Body:
          <textarea 
          className='input' 
          ref='body' 
          cols='20' 
          rows='5'
          placeholder='get twenty dollars'
          onChange={this.update('body')}
          required></textarea>
        </label>
        <button className='create-button'>Create Todo!</button>
      </form>
    )
  }
}