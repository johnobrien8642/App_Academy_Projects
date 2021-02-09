import { connect } from 'react-redux';
import BenchShow from './bench_show.jsx'
import { fetchBench } from '../../actions/bench_actions'
import { selectBench } from '../../reducers/selectors'

const mapStateToProps = (state, { match }) => {
  const benchId = parseInt(match.params.benchId);
  const bench = selectBench(state, benchId) || JSON.parse(localStorage.getItem('bench'));
  const benches = state.entities.benches;
  return {
    benchId,
    bench,
    benches
  }
}

const mapDispatchToProps = dispatch => ({
  fetchBench: id => dispatch(fetchBench(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchShow)