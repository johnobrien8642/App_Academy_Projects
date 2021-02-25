import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../client/graphql/mutations'

const { UPDATE_GOD_DESCRIPTION } = Mutations

class DescriptionDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false,
      description: this.props.description || ''
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
        <Mutation mutation={UPDATE_GOD_DESCRIPTION}>
          {(updateGodDescription, data) => (
            <div>
              <h2>Description</h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateGodDescription({
                    variables: { id: this.props.id, description: this.state.description }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <textarea 
                  value={this.state.description}
                  onChange={this.fieldUpdate('description')}
                ></textarea>
                <button description='submit'>Update Description</button>
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
            <img src="https://img.icons8.com/android/24/000000/pencil.png" />
          </div>
          <h2>Description</h2>
          <p>{this.state.description}</p>
        </div>
      )
    }
  }
}

export default DescriptionDetail;