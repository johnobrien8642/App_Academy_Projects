import React from 'react';
import EmblemsList from '../emblems/EmblemsList'
import DeleteEmblem from './DeleteEmblem'

class EmblemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false,
      emblems: this.props.god.emblems,
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.updateAddEmblems = this.updateAddEmblems.bind(this)
    this.updateRemoveEmblems = this.updateRemoveEmblems.bind(this)
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }
  
  updateRemoveEmblems(newEmblems) {
    const newEmblemArr = newEmblems
    this.setState({ emblems: newEmblemArr, editing: false })
  }

  updateAddEmblems(newEmblems) {
    const newEmblemArr = Object.assign([], this.state.emblems, newEmblems)
    this.setState({ emblems: newEmblemArr, editing: false })
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    const updateAddEmblems = this.updateAddEmblems;
    const updateRemoveEmblems = this.updateRemoveEmblems;
    if (this.state.editing) {
      return (
        <div>
          <ul>
            {this.state.emblems.map((emblem, i) => {
              return (
                <li key={i}>
                  {emblem.name}
                  <DeleteEmblem 
                    id={this.props.god.id} 
                    emblemId={emblem.id} 
                    updateRemoveEmblems={updateRemoveEmblems.bind(this)}
                  />
                </li>
              )
            })}
          </ul>

          <EmblemsList 
            god={this.props.god} 
            emblems={this.state.emblems} 
            updateAddEmblems={updateAddEmblems.bind(this)} 
          />
        </div>
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
          <ul>
            <h2>Emblems</h2>
            {this.state.emblems.map((emblem, i) => {
              return <li key={i}>{emblem.name}</li>
            })}
          </ul>
        </div>
      )
    }
  }
}

export default EmblemDetail;