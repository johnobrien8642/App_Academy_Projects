import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../client/graphql/mutations'
const { ADD_GOD_DOMAIN } = Mutations

class AddDomain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      domain: ''
    }

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    if (this.state.editing) {
      return (
        <Mutation 
          mutation={ADD_GOD_DOMAIN}
        >
          {(addGodDomain, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addGodDomain({
                    variables: { godId: this.props.id, domain: this.state.domain }
                  })
                  .then((data) => {
                    const newDomainsArr = data.data.addGodDomain.domains
                    this.props.updateDomains(newDomainsArr)
                  })
                  .then(() => this.setState({ editing: false }));
                }}
              >
                <input
                 value={this.state.domain}
                 onChange={this.fieldUpdate('domain')}
                 placeholder='Enter new domain'
                ></input>
                <button type='submit'>Submit</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <div
            onClick={this.handleEdit}
            style={{ fontSize: '10px', cursor: 'pointer', display: 'inline' }}
          >
            <img src="https://img.icons8.com/material-sharp/24/000000/create.png" />
          </div>
          <div>
            <h2>Add New Domain</h2>
          </div>
        </div>
      )
    }
  }
}

export default AddDomain;