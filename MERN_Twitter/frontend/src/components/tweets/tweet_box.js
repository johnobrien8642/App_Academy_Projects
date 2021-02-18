import React from 'react';

export default class TweetBox extends React.Component {
  render () {
    return (
      <div>
        <h3>{this.props.text}</h3>
      </div>
    )
  }
}