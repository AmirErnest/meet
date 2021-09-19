import React, { Component, useState } from 'react';
import { ErrorAlert} from './Alert'; 

class NumberofEvents extends Component {
  state = {
    numberOfEvents: 15,
    errorText: '',
  }

  updateEventCount = (eventCount) => {
    if(eventCount < 1 || eventCount > 15) {
    return this.setState({
      numberOfEvents: 0,
      errorText: 'Please select a number between 1-15'
    });
  } else {
    this.setState({
      numberOfEvents: eventCount,
      errorText: ''
    });
  }
  };

  render() {
    return (
      <div className="numberOfEvents">
        <ErrorAlert text={this.state.errorText}/>
        <label htmlFor="number">Events per page: </label>
          <input 
          type="number" 
          id="number" 
          className="numberInput"
          value={this.props.numberOfEvents}
          placeholder="#" 
          onChange={(e) => this.updateEventCount(e.target.value)} />
      </div>
    )
  }
}

export default NumberofEvents;