import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../client/graphql/mutations'
const { DELETE_GOD_DOMAIN } = Mutations


class DeleteDomain extends React.Component {

  render() {
    return (
      <Mutation
          mutation={DELETE_GOD_DOMAIN}
        >
          {(removeGodDomain, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  removeGodDomain({
                    variables: { godId: this.props.id, domain: this.props.domain }
                  })
                    .then((data) => {
                      const newDomainsArr = data.data.removeGodDomain.domains
                      this.props.updateDomains(newDomainsArr)
                    })
                    .then(() => this.setState({ editing: false }));
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

export default DeleteDomain;