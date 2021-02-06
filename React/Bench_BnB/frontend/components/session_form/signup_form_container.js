import { connect } from 'react-redux'
import { signup } from '../../actions/session_actions'
import SessionForm from './session_form.jsx'


const mapStateToProps = ({ errors }) => {
  return {
    formType: 'signup',
    errors: errors.session.responseJSON || []
  }
}

const mapDispatchToProps = dispatch => {
  return {
    processForm: user => dispatch(signup(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm)