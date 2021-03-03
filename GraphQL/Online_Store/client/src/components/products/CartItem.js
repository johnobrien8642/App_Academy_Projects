import React, { useState } from 'react'
import { Query } from 'react-apollo' 
import Queries from '../../graphql/queries'
const { FETCH_PRODUCT } = Queries;

const CartItem = ({ prd }) => {
  let [quantity, setQuantity] = useState(0);

  return (
    <div>
      <Query
        query={FETCH_PRODUCT}
        variables={{ id: prd._id }}
      >{({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        return (
          <ul>
            <li>Name: {data.product.name}</li>
            <li>Description: {data.product.description}</li>
            <li>Weight: {data.product.weight}</li>
            <li>Cost: {data.product.cost}</li>
            <li>Quantity: 
            <input
              type='number'
              min='0'
              max='50'
              onChange={e => setQuantity(quantity = e.target.value)}
            />
            </li>
          </ul>
        )
      }}
      </Query>
    </div>
  )
}

export default CartItem;