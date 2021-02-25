import gql from 'graphql-tag';

export default {
  DELETE_GOD: gql`
    mutation DeleteGod($id: ID!) {
      deleteGod(id: $id) {
        id
      }
    }
  `,
  NEW_GOD: gql`
    mutation NewGod($name: String, $type: String, $description: String) {
      newGod(name: $name, type: $type, description: $description) {
        id
        name
        description
      }
    }
  `,
  NEW_EMBLEM: gql`
    mutation newEmblem($name: String) {
      newEmblem(name: $name) {
        id
        name
      }
    }
  `,
  NEW_ABODE: gql`
    mutation newAbode($name: String, $coordinates: String) {
      newAbode(name: $name, coordinates: $coordinates) {
        id
        name
      }
    }
  `,
  UPDATE_GOD_NAME: gql`
    mutation updateGod($id: ID!, $name: String) {
      updateGod(id: $id, name: $name) {
        id
        name
      }
    }
  `,
  UPDATE_GOD_TYPE: gql`
    mutation updateGod($id: ID!, $type: String) {
      updateGod(id: $id, type: $type) {
        id
        name
      }
    }
  `,
  UPDATE_GOD_DESCRIPTION: gql`
    mutation updateGod($id: ID!, $description: String) {
      updateGod(id: $id, description: $description) {
        id
        name
      }
    }
  `,
  ADD_GOD_DOMAIN: gql`
    mutation addGodDomain($godId: ID!, $domain: String!) {
      addGodDomain(godId: $godId, domain: $domain) {
        id
        name
        domains
      }
    }
  `,
  DELETE_GOD_DOMAIN: gql`
    mutation removeGodDomain($godId: ID!, $domain: String!) {
      removeGodDomain(godId: $godId, domain: $domain) {
        id
        name
        domains
      }
    }
  `,
  UPDATE_GOD_ABODE: gql`
    mutation updateGodAbode($godId: ID!, $abodeId: ID!) {
      updateGodAbode(godId: $godId, abodeId: $abodeId) {
        abode {
          id
          name
          coordinates
        }
      }
    }
  `,
  ADD_GOD_EMBLEM: gql`
    mutation addGodEmblem($godId: ID!, $emblemId: ID!) {
      addGodEmblem(godId: $godId, emblemId: $emblemId) {
        name
        emblems {
          id
          name
        }
      }
    }
  `,
  DELETE_GOD_EMBLEM: gql`
    mutation removeGodEmblem($godId: ID!, $emblemId: ID!) {
      removeGodEmblem(godId: $godId, emblemId: $emblemId) {
        name
        emblems {
          id
          name
        }
      }
    }
  `,
  ADD_GOD_RELATIVE: gql`
    mutation addGodRelative($godId: ID!, $relativeId: ID!, $relationship: String!) {
      addGodRelative(godId: $godId, relativeId: $relativeId, relationship: $relationship) {
        id
        name
      }
    }
  `,
  REMOVE_GOD_RELATIVE: gql`
    mutation removeGodRelative($godId: ID!, $relativeId: ID!, $relationship: String!) {
      removeGodRelative(godId: $godId, relativeId: $relativeId, relationship: $relationship) {
        id
        name
      }
    }
  `,
};