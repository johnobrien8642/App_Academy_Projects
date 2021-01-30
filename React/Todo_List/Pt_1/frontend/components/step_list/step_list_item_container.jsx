import { connect } from 'react-redux';
import StepListItem from './step_list_item'
import { deleteStep, receiveStep } from '../../actions/step_actions.js'
import { stepsByTodoId } from '../../reducers/selectors';

export const mapDispatchToProps = dispatch => ({
  deleteStep: step => dispatch(deleteStep(step)),
  receiveStep: step => dispatch(receiveStep(step))
})

export default connect(
  null,
  mapDispatchToProps
)(StepListItem)