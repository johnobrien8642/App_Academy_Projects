import gql from 'graphql-tag';

export default {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        name
        token
        loggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
        name
      }
    }
  `,
  LOGOUT_USER: gql`
    mutation LogoutUser($id: ID!) {
      logout(_id: $id) {
        loggedIn
        token
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!, $date: String!) {
      register(name: $name, email: $email, password: $password, date: $date) {
        name
        token
        loggedIn
      }
    } 
  `,
  CREATE_PRODUCT: gql`
    mutation CreateProduct($name: String!, $description: String!, $category: ID!, $weight: Float!) {
      newProduct(name: $name, description: $description, category: $category, weight: $weight) {
        _id
        name
        description
        weight
      }
    }
  `
}