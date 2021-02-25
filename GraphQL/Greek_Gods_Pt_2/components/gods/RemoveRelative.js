import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../client/graphql/mutations';
const { REMOVE_GOD_RELATIVE } = Mutations;

const linkStyle = {
  cursor: 'pointer',
  fontSize: '10px',
  color: 'red'
}

const RemoveRelative = props => {
  return (
    <Mutation
      mutation={REMOVE_GOD_RELATIVE}
    >
      {(removeGodRelative, { data }) => (
        <a
          style={linkStyle}
            onClick={e => {
              e.preventDefault();
              removeGodRelative({ variables: { 
                godId: props.godId, 
                relativeId: props.relativeId, 
                relationship: props.relationship 
              } 
              }).then(() => { 
                props.pluckRelative(
                  props.relativeId,
                  props.godIdx, 
                  props.relationship
                  )
                })
          }}
        >
          <p>remove</p>
        </a>
      )}
    </Mutation>
  )
}

export default RemoveRelative;