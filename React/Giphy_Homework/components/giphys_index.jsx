import React from 'react';

import GiphysIndexItem from './giphys_index_item';

export default class GiphysIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    let { giphys } = this.props;
    const giphyItems = giphys.map((giphy) => {
      return <GiphysIndexItem key={ giphy.id } giphy={ giphy } />
    })

    return (
      <ul>
        { giphyItems }
      </ul>
    )
  }
}
