import { connect } from 'react-redux'
import { allTodos } from '../../../../Pt_2_Solution/frontend/reducers/selectors.js'
import { receiveTodo,
          deleteTodo } from '../../actions/todo_actions.js'
import  TodoList  from './todo_list.jsx'

const mapStateToProps = state => ({
  todos: allTodos(state),
  state
})

const mapDispatchToProps = dispatch => ({
  receiveTodo: todo => dispatch(receiveTodo(todo)),
  deleteTodo: todo => dispatch(deleteTodo(todo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);