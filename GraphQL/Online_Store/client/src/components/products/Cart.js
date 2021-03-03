import React, { useState } from 'react';
import { Query } from 'react-apollo';
import CartItem from './CartItem'
import Queries from '../../graphql/queries'
const { FETCH_CART_ITEMS } = Queries;

const Cart = () => {
  let totalCost = 0

  return (
    <Query
      query={ FETCH_CART_ITEMS }
    >
      {({ loading, data }) => {
        if (loading) return <p>Loading...</p>
      return (
        <div>
          <h1>Cart</h1>
          {data.cart.forEach((prd, i) => {
            totalCost += prd.cost
          })}
          <h3>Total: {totalCost}</h3>
          <ul>
            {data.cart.map((prd, i) => {
              return (
                <li key={i}>
                  <CartItem prd={prd} />
                </li>
              )
            })}
          </ul>
        </div>
      )
      }}
    </Query>
  )
}

export default Cart;