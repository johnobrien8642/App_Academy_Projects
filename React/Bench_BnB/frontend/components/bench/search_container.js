import { connect } from 'react-redux'
import { fetchBenches } from '../../actions/bench_actions'
import Search from './search.jsx'
import { selectAllBenches } from '../../reducers/selectors'
import { updateFilters } from '../../actions/filter_actions'

const mapStateToProps = state => {
  return {
    benches: selectAllBenches(state),
    minSeating: state.ui.filters.minSeating,
    maxSeating: state.ui.filters.maxSeating
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchAllBenches: bounds => dispatch(fetchBenches(bounds)),
    updateFilters: (filter, value) => dispatch(updateFilters(filter, value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)