import gql from 'graphql-tag';

export default {
  FETCH_PRODUCTS: gql`
    query FetchProducts {
      products {
        _id
        name
        description
        category {
          _id
          name
        }
      }
    }
 `,
  FETCH_PRODUCT: gql`
    query FetchProduct($id: ID!) {
      product(_id: $id) {
        _id
        name
        description
        weight
        cost
      }
    }
 `,
  FETCH_CATEGORIES: gql`
    query FetchCategories {
      categories {
        _id
        name
      }
    }
 `,
 IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
 `,
 GET_USERNAME: gql`
    query getUsername {
      username @client
    }
 `,
 FETCH_CART_ITEMS: gql`
    query FetchCartItems {
      cart @client {
        _id
        cost
      }
    }
 `
}