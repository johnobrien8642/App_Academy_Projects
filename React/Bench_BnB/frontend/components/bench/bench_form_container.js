import { connect } from 'react-redux'
import BenchForm from './bench_form'
import { createBench } from '../../actions/bench_actions'

export const mapStateToProps = (state, { location }) => {
  return {
    lat: new URLSearchParams(location.search).get('lat'),
    lng: new URLSearchParams(location.search).get('lng')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createBench: bench => dispatch(createBench(bench))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchForm)

