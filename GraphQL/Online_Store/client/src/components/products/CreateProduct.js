import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import Mutations from '../../graphql/mutations';
import Queries from '../../graphql/queries';
const { FETCH_CATEGORIES, FETCH_PRODUCTS } = Queries;
const { CREATE_PRODUCT } = Mutations;

const CreateProduct = () => {
  let [name, setName] = useState('')
  let [description, setDescription] = useState('')
  let [category, setCategory] = useState('')
  let [weight, setWeight] = useState('')
  let [message, setMessage] = useState('')


  const updateCache = (cache, { data }) => {
    let products;
    try {
      products.cache.readQuery({ query: FETCH_PRODUCTS })
    } catch(err) {
      return;
    }

    if (products) {
      let productArrary = products.products;
      let newProduct = data.newProduct;
      cache.writeQuery({
        query: FETCH_PRODUCTS,
        data: { products: productArrary.concat(newProduct) }
      })
    }
  }

  return (
    <Mutation
      mutation={CREATE_PRODUCT}
      update={(cache, data) => updateCache(cache, data)}
      onCompleted={data => {
        const { name } = data.newProduct;
        setMessage(message = `New product ${name} created successfully`)
      }}
    >{createProduct => {
      return (
        <div>
        <h1>Create A New Product</h1>
        <p>{message}</p>
        <form
        onSubmit={e => {
          e.preventDefault();
          createProduct({
            variables: {
              name: name,
              description: description,
              category: category,
              weight: parseFloat(weight)
            }
          })
        }}
        >
          <input
            type='text'
            onChange={e => setName(name = e.target.value)}
            placeholder={'Enter name'}
          >
          </input>

          <input
            type='text'
            onChange={e => setDescription(description = e.target.value)}
            placeholder={'Enter description'}
          >
          </input>

          <Query
            query={FETCH_CATEGORIES}
          >{({ loading, error, data}) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              return (
                <select 
                  defaultValue={'default'}
                  onChange={e => setCategory(category = e.target.value)}
                >
                  <option value={'default'} disabled>--Select Category--</option>
                  {data.categories.map((category, i) => {
                    return (
                      <option 
                        key={i} 
                        value={category._id}>
                          {category.name}
                      </option>
                    )
                  })}
                </select>
              )
          }}
          </Query>

          <input
            type='number'
            min='0'
            max='50'
            step='0.1'
            onChange={e => setWeight(weight = e.target.value)}
            placeholder={'Enter weight'}
          >
          </input>
          
          <button type='submit'>Create</button>
        </form>
        </div>
      )
    }}
    </Mutation>
  )
}

export default CreateProduct;