import gql from 'graphql-tag'

export default {
  FETCH_GODS: gql`
    query FetchGods {
      gods {
        id
        name
        description
      }
    }
  `,
  FETCH_ABODE: gql`
    query fetchAbode($id: ID!) {
      abode(id: $id) {
        id
        name
        coordinates
      }
    }
  `,
  FETCH_ABODES: gql`
    query fetchAbodes {
      abodes {
        id
        name
        coordinates
      }
    }
  `,
  FETCH_EMBLEMS: gql`
    query fetchEmblems {
      emblems {
        id
        name
      }
    }
  `,
  FETCH_GOD: gql`
    query fetchGod($id: ID!) {
      god(id: $id) {
        id
        name
        type
        description
        domains
        abode {
          id
          name
        }
        emblems {
          id
          name
        }
        parents {
          id
          name
        }
        children {
          id
          name
        }
        siblings {
          id
          name
        }
      }
    }
  `,
  FETCH_PARENTS: gql`
    query fetchParents($id: ID!) {
      god(id: $id) {
        parents {
          id
          name
        }
      }
    }
  `,
  FETCH_SIBLINGS: gql`
    query fetchSiblings($id: ID!) {
      god(id: $id) {
        parents {
          id
          name
        }
      }
    }
  `,
  FETCH_CHILDREN: gql`
    query fetchChildren($id: ID!) {
      god(id: $id) {
        parents {
          id
          name
        }
      }
    }
  `,
}
