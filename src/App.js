import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberofEvents from './NumberofEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import { WarningAlert } from './Alert';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 15,
    currentLocation: 'all',
    showWelcomeScreen: undefined,
    offlineText: navigator.onLine
  }

  async componentDidMount() {
    this.mounted = true;
    console.log("navigatoronlineornot:", navigator.onLine);
    if (!navigator.onLine) { 
      console.log("ifStatement!!!", navigator.onLine);
      getEvents().then((events) => {
        console.log("&&&&&&&&&&:", events);
        if (this.mounted) {
          this.setState({ 
            showWelcomeScreen: false,
            events, 
            locations: extractLocations(events), 
          });
        }
      });
      }
    const accesssToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accesssToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events), offlineText: '' });
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
    console.log("welcome:" , this.state.offlineText);
    return (
      <div className="App">
        <WarningAlert text={this.state.offlineText === false ? 'you are offline! events maybe out of date' : ''} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberofEvents onHandleEventCount={this.handleEventCount} numberOfEvents={this.state.numberOfEvents} />
        <EventList events={this.state.events}/>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={ ()=> {getAccessToken() }} />
      </div>
    );
  } 
}

export default App; 
