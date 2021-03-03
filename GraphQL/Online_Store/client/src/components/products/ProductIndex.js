import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries';
const { FETCH_PRODUCTS, GET_USERNAME,
        FETCH_CATEGORIES } = Queries;

const ProductIndex = () => {
  let [ categoryNames, setCategories] = useState([])

  return (
    <div>
      <Query query={GET_USERNAME}>
        {({ data }) => {
          return (
          <Link 
            to={`/${data.username}/create_new_product`}>
              Create A New Product
          </Link>
          )
        }}
      </Query>
      
      <div>
        <Query
          query={FETCH_CATEGORIES}
        >{({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          return (
            data.categories.map((category, i) => {
              return(
                <label key={i}>{category.name}
                  <input
                    key={i}
                    type='checkbox'
                    value={category.name}    
                    onChange={e => {
                      if (categoryNames.includes(e.target.value)) {
                        const idx = categoryNames.indexOf(e.target.value)
                        let arrDup = categoryNames
                        arrDup.splice(idx, 1)
                        setCategories([...arrDup])
                      } else {
                        const arrWithNewCat = categoryNames.concat(e.target.value)
                        setCategories([...arrWithNewCat])
                      }
                    }}
                  />
                </label>
              )
            })
          )
        }}
        </Query>
      </div>

      <Query
        query={FETCH_PRODUCTS}
      >{({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          const productsFiltered = data.products.filter(p =>
            categoryNames.includes(p.category.name))
          
          if (categoryNames.length === 0) {
            return (
              <ul>
                {data.products.map(product => {
                  return (
                  <li key={product._id}>
                      <Link to={`/${product._id}/detail`}>
                        <h2>{product.name}</h2>
                      </Link>
                      <p>{product.description}</p>
                  </li>
                  ) 
                })}
              </ul>
            )
          } else {
            return (
              <ul>
                {productsFiltered.map(product => {
                  return (
                    <li key={product._id}>
                      <Link to={`/${product._id}/detail`}>
                        <h2>{product.name}</h2>
                      </Link>
                      <p>{product.description}</p>
                    </li>
                  )
                })}
              </ul>
            )
          }
        }}
      </Query>
      
    </div>
  )
}

export default ProductIndex;