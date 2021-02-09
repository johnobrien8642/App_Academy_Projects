import React from 'react';
import BenchIndexItem from './bench_index_item.jsx'

export default class BenchIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const benchesList = this.props.benches.map((bench, i) =>{
      return <BenchIndexItem key={i} bench={bench} />
    })
    return (
      <ul>
        {benchesList}
      </ul>
    )
  }
}