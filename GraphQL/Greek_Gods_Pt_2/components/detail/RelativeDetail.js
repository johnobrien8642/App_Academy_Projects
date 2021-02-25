import React, { Component } from 'react'
import { update } from '../../server/models/God'
import AddRelative from '../gods/AddRelative'
import RemoveRelative from '../gods/RemoveRelative'

class RelativeDetail extends Component {
  constructor(props) {
    super(props)
  
    this.state ={
      god: this.props.god,
      parents: this.props.god.parents,
      siblings: this.props.god.siblings,
      children: this.props.god.children,
      allRelatives: this.props.god.parents.concat(
        this.props.god.siblings, 
        this.props.god.children
      ),
      editing: false
    }
    console.log(this.state.allRelatives)
    this.updateRelatives = this.updateRelatives.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.pluckRelative = this.pluckRelative.bind(this)

  }

  updateRelatives(newGod, type) {
    const { parents, siblings, children, allRelatives } = this.state;
    if (type === 'parent') {
      const withNewParentArr = parents.concat(newGod)
      const updateRelatives = allRelatives.concat(newGod)
      this.setState({ parents: withNewParentArr, allRelatives: updateRelatives, editing: false })
    } else if (type === 'sibling') {
      const withNewSiblingArr = siblings.concat(newGod)
      const updateRelatives = allRelatives.concat(newGod)
      this.setState({ siblings: withNewSiblingArr, allRelatives: updateRelatives, editing: false })
    } else if (type === 'child') {
      const withNewChildArr = children.concat(newGod)
      const updateRelatives = allRelatives.concat(newGod)
      this.setState({ children: withNewChildArr, allRelatives: updateRelatives, editing: false })
    }
  }

  pluckRelative(relativeId, godIdx, type) {
    const { parents, siblings, children, allRelatives } = this.state;
    if (type === 'parent') { 
      const withoutNewParentArr = parents.length === 1 ? [] : parents.splice(godIdx, 1)
      const updateRelatives = allRelatives.filter(rel => rel.id !== relativeId)
      this.setState({ parents: withoutNewParentArr, allRelatives: updateRelatives })
    } else if (type === 'sibling') {
      const withoutNewSiblingArr = siblings.length === 1 ? [] : siblings.splice(godIdx, 1)
      const updateRelatives = allRelatives.filter(rel => rel.id !== relativeId)
      this.setState({ siblings: withoutNewSiblingArr, allRelatives: updateRelatives })
    } else if (type === 'child') {
      const withoutNewChildArr = children.length === 1 ? [] : children.splice(godIdx, 1)
      const updateRelatives = allRelatives.filter(rel => rel.id !== relativeId)
      this.setState({ children: withoutNewChildArr, allRelatives: updateRelatives })
    }
  }

  handleEdit() {
    this.setState({ editing: true })
  }

  render() {
    const { god, parents, 
            siblings, children, 
            allRelatives, editing } = this.state;
    const updateRelatives = this.updateRelatives
    const handleEdit = this.handleEdit
    const pluckRelative = this.pluckRelative
    return (
      <div>
        <div>
          <h2>Parents</h2>
            <ul>
              {parents.map((parent, i) => {
                return (
                <li key={i}>
                  {parent.name}
                    <RemoveRelative
                      godId={this.props.god.id}
                      relativeId={parent.id}
                      relationship={'parent'}
                      godIdx={i}
                      pluckRelative={pluckRelative.bind(this)}
                    />
                </li>
                ) 
              })}
            </ul>
            <AddRelative 
              id={god.id} 
              type={'parent'} 
              relatives={allRelatives}
              editing={editing}
              updateRelatives={updateRelatives.bind(this)}
            />
        </div>
        <div>
          <h2>Siblings</h2>
            <ul>
              {siblings.map((sibling, i) => {
                return (
                  <li key={i}>
                    {sibling.name}
                    <RemoveRelative 
                      godId={this.props.god.id}
                      relativeId={sibling.id}
                      relationship={'sibling'}
                      godIdx={i}
                      pluckRelative={pluckRelative.bind(this)}
                    />
                  </li>
                ) 
              })}
            </ul>
          <AddRelative 
            id={god.id} 
            type={'sibling'} 
            relatives={allRelatives}
            editing={editing}
            updateRelatives={updateRelatives.bind(this)}
            handleEdit={handleEdit.bind(this)}
          />
        </div>
        <div>
          <h2>Children</h2>
            <ul>
              {children.map((children, i) => {
                return (
                <li key={i}>
                  {children.name}
                  <RemoveRelative
                    godId={this.props.god.id}
                    relativeId={children.id}
                    relationship={'child'}
                    godIdx={i}
                    pluckRelative={pluckRelative.bind(this)}
                  />
                </li>
                ) 
              })}
            </ul>
          <AddRelative 
            id={god.id} 
            type={'child'} 
            relatives={allRelatives}
            editing={editing}
            updateRelatives={updateRelatives.bind(this)}
            handleEdit={handleEdit.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default RelativeDetail;