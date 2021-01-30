import { connect } from 'react-redux';
import TodoDetailView from './todo_detail_view';
import { deleteTodo } from '../../actions/todo_actions'

const mapDispatchToProps = (dispatch, { todo }) => ({
  removeTodo: () => dispatch(deleteTodo(todo)),
  receiveSteps: () => dispatch(receiveSteps(todo))
})

export default connect(
  null,
  mapDispatchToProps
)(TodoDetailView);