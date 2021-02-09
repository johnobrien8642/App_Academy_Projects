export const selectAllBenches = (state) => {
  return Object.values(state.entities.benches)
}

export const selectBench = (state, benchId) => {
  return state.entities.benches[benchId]
}