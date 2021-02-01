import React from 'react';

import GiphysIndex from './giphys_index';

export default class GiphysSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = { search: '' }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ search: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    const search = this.state.search.split(' ').join('+')
    this.props.fetchSearchGiphys(search)
    this.state.search = ''
  } 

  render () {
    let { giphys } = this.props

    return (
      <div>
        <form className='search-form'>
        <label className='search-input-label'>Search: 
          <input  
            placeholder='search here'
            value={this.state.search}
            onChange={this.handleChange} />
        </label>
          <button 
          type='submit' 
          onClick={this.handleSubmit}>submit</button>
        </form>
        <GiphysIndex giphys={ giphys } />
      </div>
    )
  }
}