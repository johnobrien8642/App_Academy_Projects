import React from 'react';
import AddToCart from '../products/AddToCart'
import { useParams } from 'react-router-dom';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries'
const { FETCH_PRODUCT } = Queries;

const ProductDetail = () => {
  const { _id } = useParams();
  
  return (
    <Query
      query={FETCH_PRODUCT}
      variables={{ id: _id }}
    >{({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;
      return (
      <div>
        <h2>{data.product.name}</h2>
        <p>{data.product.description}</p>
        <p>{data.product.weight}</p>
        <AddToCart cost={data.product.cost} _id={_id} />
      </div>
      )
    }}
    </Query>
  )
}

export default ProductDetail;