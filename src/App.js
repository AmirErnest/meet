import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import { extractLocations, getEvents } from './api';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 15,
    currentLocation: 'all'
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

    //update events counts and location
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
      events :
      events.filter((event) => event.location === location);
      const {numberOfEvents} = this.state;
      this.setState({
        //events: locationEvents
        events: locationEvents.slice(0, numberOfEvents),
        currentLocation: location,
      });
    });
  }

    // handle pagination
    handleEventCount = (eventCount) => {
      const { currentLocation } = this.state;
      this.setState({
        numberOfEvents: eventCount
      });
      this.updateEvents(currentLocation);
    }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <EventList events={this.state.events}/>
        <NumberofEvents onHandleEventCount={this.handleEventCount} numberOfEvents={this.state.numberOfEvents} />
      </div>
    );
  } 
}

export default App;
