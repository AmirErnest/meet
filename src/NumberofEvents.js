import React, { Component, useState } from 'react';
import { ErrorAlert } from './Alert';

class NumberofEvents extends Component {
  state = {
    numberOfEvents: 15,
    errorText: '',
  }

  updateEventCount = (event) => {
    const eventCount = event.target.value;
    if(eventCount < 1 || eventCount > 15) {
    return this.setState({
      numberOfEvents: eventCount,
      errorText: 'Please select a number between 1-15'
    });
  } else {
    this.setState({
      numberOfEvents: eventCount,
      errorText: ''
    });
  }
  this.props.onHandleEventCount(eventCount);
  };

  render() { 
    return (
      <div className="numberOfEvents">
        <ErrorAlert text={this.state.errorText} />
        <label htmlFor="number">Events per page: </label>
          <input 
          type="number" 
          id="number" 
          className="numberInput"
          value={this.props.numberOfEvents}
          placeholder="#" 
          onChange={this.updateEventCount} />
      </div>
    )
  }
}

export default NumberofEvents;