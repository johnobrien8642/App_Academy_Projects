import { connect } from 'react-redux'
import { fetchBenches } from '../../actions/bench_actions'
import BenchIndex from './bench_index.jsx'
import { selectAllBenches } from '../../reducers/selectors'

const mapStateToProps = state => {
  return {
    // benches: state.entities.benches || null
    benches: selectAllBenches(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllBenches: () => dispatch(fetchBenches())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchIndex)