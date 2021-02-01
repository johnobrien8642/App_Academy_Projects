import { connect } from 'react-redux'
import { allTodos } from '../../reducers/selectors.js'
import {  deleteTodo, 
          fetchTodos, 
          createTodo,
          updateTodo } from '../../actions/todo_actions.js'
import  TodoList  from './todo_list.jsx'

const mapStateToProps = state => ({
  todos: allTodos(state),
  errors: state.errors
})

const mapDispatchToProps = dispatch => ({
  requestTodos: () => dispatch(fetchTodos()),
  deleteTodo: todo => dispatch(deleteTodo(todo)),
  createTodo: todo => dispatch(createTodo(todo)),
  updateTodo: todo => dispatch(updateTodo(todo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);