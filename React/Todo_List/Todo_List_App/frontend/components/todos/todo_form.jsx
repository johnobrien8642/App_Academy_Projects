import React from 'react';
import { uniqueId } from '../../util/id_generator'
import ErrorList from './error_list'

export default class TodoForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      done: false,
      tag_names: [], 
      newTag: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  addTag(e) {
    this.setState({
      tag_names: [ ...this.state.tag_names, this.state.newTag ],
      newTag: ''
    })
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault();
    const todo = Object.assign({}, this.state, { id: uniqueId() });
    this.props.createTodo({todo}).then(
      () => this.setState({
        title: '', 
        body: '',
        tag_names: []
      })
    );
  }

  render () {
    const tag_names = this.state.tag_names.map((tag, idx) => {
      const clickHandler = () => this.removeTag(idx);
      return <li key={ idx } onClick={ clickHandler }>{ tag }</li>
    })

    const { errors } = this.props
    return (
      <form className='todo-form' onSubmit={this.handleSubmit}>
        <ErrorList errors={ errors } />
        <label>Title:
          <input 
          className='input'
          ref='ref'
          value={ this.state.title }
          placeholder='go to the bank'
          onChange={ this.update('title') }
          required/>
        </label>
        <label>Body:
          <textarea 
          className='input' 
          ref='body' 
          cols='20' 
          rows='5'
          placeholder='get twenty dollars'
          value={ this.state.body }
          onChange={ this.update('body') }
          required></textarea>
        </label>
        <div className='add-tags'>
        <input 
          id='tag-input' 
          className='tag-input' 
          onChange={ this.update('newTag')}
          value={ this.state.newTag }/>
          <button type='button' className='button' onClick={ this.addTag }>Add tag</button>
        </div>
        <ul className='tag-list'>
          { tag_names }
        </ul>
        <button className='create-button'>Create Todo!</button>
      </form>
    )
  }
}