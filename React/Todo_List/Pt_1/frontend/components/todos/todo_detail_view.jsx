import React from 'react';
import StepListContainer from '../step_list/step_list_container'

export default class TodoDetailView extends React.Component {
  render () {
    const { todo, deleteTodo } = this.props;
    return (
      <div>
        <p className='todo-body'>{todo.body}</p>
        <button onClick={() => deleteTodo(todo)}>Delete</button>
        <StepListContainer todo_id={ todo.id } />
      </div>
    )
  }
}