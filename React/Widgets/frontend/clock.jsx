import React from 'react';

export default class Clock extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      time: new Date()
    };

    this.tick = this.tick.bind(this);
  }

  componentDidMount () {
    this.intervalId = setInterval(this.tick, 1000);
  }

  // componentWillUnmount () {
  // //   clearInterval(this.intervalId)
  // // }

  tick () {
    this.setState({ time: new Date() })
  }

  render () {
    let month = this.state.time.getMonth() + 1;

    let hours = this.state.time.getHours()  
    let minutes = this.state.time.getMinutes()
    let seconds = this.state.time.getSeconds()

    hours = hours === 0 ? '12' : hours % 12
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    return (
      <div className="clock">
        <h1>Timeclock</h1>
        <div className="clockface">
          <div className="date">
            <span>Date: </span>
            <span>{month}/</span>
            <span>{this.state.time.getDate()}/</span>
            <span>{this.state.time.getFullYear()}</span>
          </div>
          
          <div className="time">
            <span>{hours}:</span>
            <span>{minutes}:</span>
            <span>{seconds}</span>
          </div>
        </div>
      </div>
      )
  }
}