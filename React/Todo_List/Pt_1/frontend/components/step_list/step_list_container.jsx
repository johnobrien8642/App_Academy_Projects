import { connect } from 'react-redux';
import { StepList } from './step_list'
import { receiveStep } from '../../actions/step_actions.js'
import { stepsByTodoId } from '../../reducers/selectors';


export const mapStateToProps = (state, { todo_id }) => ({
  steps: stepsByTodoId(state, todo_id),
  todo_id
})

export const mapDispatchToProps = dispatch => ({
  receiveStep: step => dispatch(receiveStep(step))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepList)