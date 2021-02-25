import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../client/graphql/mutations'

const { UPDATE_GOD_TYPE } = Mutations

class TypeDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false,
      type: this.props.type || ''
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
        <Mutation mutation={UPDATE_GOD_TYPE}>
          {(updateGodType, data) => (
            <div>
              <h2>Type</h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateGodType({
                    variables: { id: this.props.id, type: this.state.type }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <select
                  value={this.state.type}
                  onChange={this.fieldUpdate('type')}
                >
                  <option value="God">God</option>
                  <option value="Goddess">Goddess</option>
                </select>
                <button type='submit'>Update Type</button>
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
          <h2>Type</h2>
          <p>{this.state.type}</p>
        </div>
      )
    }
  }
}

export default TypeDetail;