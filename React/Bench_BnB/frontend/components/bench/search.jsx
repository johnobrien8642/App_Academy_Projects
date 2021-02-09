import React from 'react'
import BenchMap from './bench_map.jsx'
import BenchIndex from './bench_index.jsx'
import FilterForm from './filter_form.jsx'


const Search = ({ benches, updateFilters, minSeating, maxSeating }) => (
  <div>
    <BenchMap 
    benches={benches}
    updateFilters={updateFilters}/>
    <FilterForm
    minSeating={minSeating}
    maxSeating={maxSeating}
    updateFilters={updateFilters}/>
    <BenchIndex 
      benches={benches} />
  </div>
)

export default Search