import React from 'react';
import StepListContainer from '../step_list/step_list_container'

export default class TodoDetailView extends React.Component {
  componentDidMount() {
    this.props.requestSteps();
  }

  render () {
    const { todo, removeTodo } = this.props;
    return (
      <div>
        <p className='todo-body'>{todo.body}</p>
        <button onClick={() => removeTodo(todo)}>Delete</button>
        <StepListContainer  todo_id={ todo.id } />
      </div>
    )
  }
}