import React from 'react';
import TodoListItem from './todo_list_item.jsx'
import TodoForm from './todo_form.jsx'

export default class TodoList extends React.Component {
  render () {
    const { todos, receiveTodo, deleteTodo } = this.props
    const todoItems = todos.map(todo => (
      <TodoListItem
      key={`todo-list-item${todo.id}`}
      todo={todo} 
      receiveTodo={ receiveTodo }
      deleteTodo={ deleteTodo }
      />
      )
    )

    return (
      <div>
        <TodoForm receiveTodo={ receiveTodo }/>
        <ul className="todo-list">
          { todoItems }
        </ul>
      </div>
    )
  }
}