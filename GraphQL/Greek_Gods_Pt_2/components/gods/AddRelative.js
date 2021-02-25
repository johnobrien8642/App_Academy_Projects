import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import Queries from '../../client/graphql/queries'
import Mutations from '../../client/graphql/mutations'
import GodsList from './GodsList'

const { FETCH_GODS } = Queries
const { ADD_GOD_RELATIVE } = Mutations

class AddRelative extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
      editing: false,
      relativeId: '',
      relatives: this.props.relatives
    }
    // console.log(this.state.relatives)
    this.handleEdit = this.handleEdit.bind(this)
    this.fieldUpdate = this.fieldUpdate.bind(this)
  }

  handleEdit() {
    this.setState({ editing: true })
  }

  componentDidUpdate(prevProps) {
    if (this.props.relatives !== prevProps.relatives) {
      this.setState({ relatives: this.props.relatives, editing: false })
    }
  }


  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  render() {
    let submitButton;
    const { type, editing } = this.state
    if (type === 'parent') {
      submitButton = 'Add Parent'
    } else if (type === 'sibling' ) {
      submitButton = 'Add Sibling'
    } else if (type === 'child') {
      submitButton = 'Add Child'
    }
    const defaultOption = 'default'
    if (editing) {
      return (
        <div>
          <Mutation
            mutation={ADD_GOD_RELATIVE}
          >
            {(addGodRelative, data) => (
            <form
              onSubmit={e => {
                e.preventDefault();
                addGodRelative({
                  variables: {
                    godId: this.props.id,
                    relativeId: this.state.relativeId,
                    relationship: this.props.type
                  }
                }).then((data) => {
                  const godObj = {}
                  const newGod = data.data.addGodRelative
                  godObj.id = newGod.id
                  godObj.name = newGod.name
                  godObj.__typename = newGod.__typename
                  const newRelativeArr = this.state.relatives.concat(godObj)
                  this.setState({ editing: false, relatives: newRelativeArr })
                  return godObj
                }).then((godObj) => this.props.updateRelatives(godObj, this.props.type))
              }}
            >
              <select
                onChange={this.fieldUpdate('relativeId')}
                defaultValue={defaultOption}
                key={this.props.relatives}
              >
                <option value={defaultOption} disabled>--Select Relative--</option>
                <Query query={FETCH_GODS}>{({ loading, error, data }) => {
                  if (loading) return <option>Loading...</option>
                  if (error) return <option>Error</option>

                  return data.gods.map((god, i) => {
                    let matched = false;
                    this.state.relatives.forEach((god2, i) => {
                      if (god.id == god2.id || god.id == this.props.id) {
                        matched = true;
                      }
                    })

                    if (god.id == this.props.id) {
                      matched = true;
                    }

                    if (!matched) {
                      return <option key={i} value={god.id}>{god.name}</option>
                    } else {
                      matched = false;
                    }
                  })
                }}
                </Query>
              </select>
              <button value='submit'>{submitButton}</button>
            </form>
          )}
          </Mutation>
        </div>
      )
    } else {
      return (
        <div>
          <button 
            className={'relativeButton'} 
            onClick={this.handleEdit}
          >
            {submitButton}
          </button>
        </div>
      )
    }
  }
}

export default AddRelative;