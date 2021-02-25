import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../client/graphql/mutations'
const { DELETE_GOD_EMBLEM } = Mutations


class DeleteEmblem extends React.Component {

  render() {
    return (
      <Mutation
        mutation={DELETE_GOD_EMBLEM}
      >
        {(removeGodEmblem, data) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                removeGodEmblem({
                  variables: { 
                    godId: this.props.id, 
                    emblemId: this.props.emblemId 
                  }
                })
                  .then((data) => {
                    const newEmblemsArr = data.data.removeGodEmblem.emblems
                    this.props.updateRemoveEmblems(newEmblemsArr)
                  })
              }}
            >
              <button type='submit'>Delete</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default DeleteEmblem;