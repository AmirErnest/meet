import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';

describe('<App /> component', () => {
  let AppWrapper;
  //beforeAll() function will be executed before each and every one of the tests in the test suite
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', ()=> {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
});