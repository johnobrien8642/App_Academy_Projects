import { connect } from 'react-redux';
import StepListItem from './step_list_item'
import { updateStep, deleteStep } from '../../actions/step_actions.js'
import { stepsByTodoId } from '../../reducers/selectors';

export const mapDispatchToProps = (dispatch, { step }) => ({
  updateStep: updatedStep => dispatch(updateStep(updatedStep)),
  removeStep: () => dispatch(deleteStep(step))
})

export default connect(
  null,
  mapDispatchToProps
)(StepListItem)