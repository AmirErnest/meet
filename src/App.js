import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 15,
    currentLocation: 'all',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accesssToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accesssToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
      console.log(events);
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }
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
    if(this.state.showWelcomeScreen === undefined) return <div className= "App" />
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberofEvents onHandleEventCount={this.handleEventCount} numberOfEvents={this.state.numberOfEvents} />
        <EventList events={this.state.events}/>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={ ()=> {getAccessToken() }} />
      </div>
    );
  } 
}
//comment
export default App; 
