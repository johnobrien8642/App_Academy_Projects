import React, { useState } from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import Queries from '../../graphql/queries';
const { FETCH_CART_ITEMS } = Queries;

const AddToCart = ({_id, cost}) => {
  let [message, setMessage] = useState('');
  return (
    <Query
      query={FETCH_CART_ITEMS}
    >{({ data }) => {
      let cart = data.cart;
      const matchedIdx = cart.findIndex(p => p._id == _id)
      
      if (matchedIdx === -1) {
        const newItem = { _id: _id, cost: cost, __typename: 'CartItems' }
        return (
          <div>
          <p>{message}</p>
          <ApolloConsumer>
            {client => {
            return (
              <button
                onClick={e => {
                  e.preventDefault()
                  client.writeData({
                    data: {
                      cart: cart.concat(newItem)
                    }
                  })
                  setMessage(message = 'Item added to cart')
                }}
              >
                Add To Cart
              </button>
            )
          }}
          </ApolloConsumer>
          </div>
        )
      } else {
        return (
          <div>
            <p>{message}</p>
          <ApolloConsumer>
            {client => {
            if (cart.length === 0) {
              cart = []
            } else {
            }
            return (
              <button
                onClick={e => {
                  e.preventDefault()
                  cart.splice(matchedIdx, 1)
                  client.writeData({
                    data: {
                      cart: cart
                    }
                  })
                  setMessage(message = 'Item removed from cart')
                }}
              >
                Remove From Cart
            </button>
            )
            }}
          </ApolloConsumer>
          </div>
        )
      }
    }}
    </Query>
  )
}

export default AddToCart;