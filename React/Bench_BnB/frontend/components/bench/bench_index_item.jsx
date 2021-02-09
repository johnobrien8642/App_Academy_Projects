import React from 'react';


const BenchIndexItem = ({bench: {description, lat, lng}}) => {
  return (
    <li>
      <p>{description}</p>
      <span>{lat}</span>
      <span>{lng}</span>
    </li>
  )
}

export default BenchIndexItem;