import * as BenchApiUtil from '../util/bench_api_util';

export const RECEIVE_BENCHES = 'RECEIVE_BENCHES';
export const RECEIVE_BENCH = 'RECEIVE_BENCH';
export const RECEIVE_BENCH_ERRORS = 'RECEIVE_BENCH_ERRORS'

export const receiveBenches = benches => ({
  type: RECEIVE_BENCHES,
  benches
})

export const receiveBench = bench => ({
  type: RECEIVE_BENCH,
  bench
})

export const receiveBenchErrors = errors => ({
  type: RECEIVE_BENCH_ERRORS,
  errors
})

export const fetchBenches = filters => dispatch => (
    BenchApiUtil.fetchBenches(filters)
      .then(benches => dispatch(receiveBenches(benches)))
)

export const fetchBench = id => dispatch => (
    BenchApiUtil.fetchBench(id)
      .then(bench => dispatch(receiveBench(bench)))
)

export const createBench = bench => dispatch => (
    BenchApiUtil.createBench(bench)
      .then(bench => dispatch(receiveBench(bench)))
      .fail(err => dispatch(receiveBenchErrors(err.responseJSON)))
)