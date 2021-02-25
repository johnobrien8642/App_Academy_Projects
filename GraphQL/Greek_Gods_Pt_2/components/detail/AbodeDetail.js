import React from 'react';
import Mutations from '../../client/graphql/mutations'
import Queries from '../../client/graphql/queries'
import AbodesList from '../abodes/AbodesList'

const { UPDATE_GOD_ABODE } = Mutations
const { FETCH_ABODES } = Queries


class AbodeDetail extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      editing: false,
      abodeId: this.props.abode.id,
      abodeName: this.props.abode.name,
      abodeCoordinates: this.props.abode.coordinates,
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.updateAbode = this.updateAbode.bind(this)
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  updateAbode(newAbode) {
    this.setState({ 
      abodeId: newAbode.id,
      abodeName: newAbode.name,
      abodeCoordinates: newAbode.coordinates,
      editing: false 
    })
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    const updateAbode = this.updateAbode;
    
    if (this.state.editing) {
      return (
        <AbodesList 
          god={this.props.god} 
          godId={this.props.id} 
          abodeId={this.state.abodeId}
          updateAbode={updateAbode.bind(this)}
        />
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
          <h2>Abode: {this.state.abodeName}</h2>
          <p>Coordinates: {this.state.abodeCoordinates}</p>
        </div>
      )
    }
  }
}

export default AbodeDetail;