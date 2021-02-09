import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import BenchMap from '../bench/bench_map'

const BenchShow = ({ bench, benches, benchId, fetchBench }) => {

  return (
    <div>
      <Link to='/'>Back to Index</Link>
      <BenchMap 
      bench={bench}
      benches={benches}
      benchId={benchId}
      singleBench={true}
      fetchBench={fetchBench}/>
    
      {/* <div>
        <ul>
          <li>Description: {bench.description}</li>
          <li>Seating: {bench.seating}</li>
          <li>Lat: {bench.lat}</li>
          <li>Lng: {bench.lng}</li>
        </ul>
        <img src={bench.picture_url} alt=""/>
      </div> */}
    </div>
  )
}

export default BenchShow;