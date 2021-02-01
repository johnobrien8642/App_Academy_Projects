import React from 'react';
import TodoListItem from './todo_list_item.jsx'
import TodoForm from './todo_form.jsx'
// import { createTodo } from '../../actions/todo_actions'

export default class TodoList extends React.Component {
  componentDidMount () {
    this.props.requestTodos()
  }

  render () {
    const { todos, receiveTodo, updateTodo, 
      deleteTodo, createTodo, errors } = this.props
    const todoItems = todos.map(todo => (
      <TodoListItem
      key={`todo-list-item${todo.id}`}
      todo={todo} 
      updateTodo={ updateTodo }
      deleteTodo={ deleteTodo }
      />
      )
    )
      // debugger
    return (
      <div>
        <TodoForm createTodo={ createTodo } errors={ errors }/>
        <ul className="todo-list">
          { todoItems }
        </ul>
      </div>
    )
  }
}