import { connect } from 'react-redux'
import { login } from '../../actions/session_actions'
import SessionForm from './session_form.jsx'


const mapStateToProps = (state, ownProps) => {
  return {
    formType: 'login',
    errors: state.errors.session.responseJSON || []
  }
}

const mapDispatchToProps = dispatch => {
  return {
    processForm: user => dispatch(login(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm)