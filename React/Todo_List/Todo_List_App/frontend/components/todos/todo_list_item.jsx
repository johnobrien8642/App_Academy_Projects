import React from 'react';
import TodoDetailViewContainer from './todo_detail_view_container.jsx'

export default class TodoListItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      detail: false
    };
    this.toggleDone = this.toggleDone.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this);
  }
  
  toggleDone (e) {
    e.preventDefault();
    const toggledTodo = Object.assign(
      {},
      this.props.todo,
      { done: !this.props.todo.done }
    );

    this.props.updateTodo(toggledTodo)
  }

  toggleDetail (e) {
    e.preventDefault();
    this.setState({ detail: !this.state.detail })
  }

  render () {
    const { todo, deleteTodo } = this.props;
    const { title, done, body } = todo;
    let detail;
    if (this.state.detail) {
      detail = <TodoDetailViewContainer todo={ todo } />
    }

    const tags = todo.tags.map((tag, i) => {
      return <li key={ i }>{ tag.name }</li>
    })

    return (
      <li key={`todo-list-item${todo.id}`} 
          className="todo-list-item">
        <div className="todo-header">
        <label htmlFor="todo-title">Title</label>
        <h2 onClick={this.toggleDetail} className="todo-title" id="todo-title">
          {title}
        </h2>
        <ul>
          { tags }
        </ul>
        <button 
          className={ done ? 'done' : 'undone'}
          onClick={ this.toggleDone }>
            { done ? 'Undo' : 'Done' }
        </button>
        </div>
        { detail }
      </li>
    )
  }
}