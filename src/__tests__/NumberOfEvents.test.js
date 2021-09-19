import React from 'react';
import { shallow } from 'enzyme';
import NumberofEvents from '../NumberofEvents';

describe('<NumberofEvents /> component', () => {

  let numberOfEventsWrapper;

  beforeAll(() => {
    numberOfEventsWrapper = shallow(<NumberofEvents />);
  });

  test('render the number of events menu', () => {
    expect(numberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('render events default', () => {
    const numberOfEvents = numberOfEventsWrapper.prop('numberOfEvents');
    expect(numberOfEventsWrapper.find('.numberInput').prop('value')).toBe(numberOfEvents);
  });

  test('change number of events with input value', () => {
    const inputValue = { target: { value: 5}};
    numberOfEventsWrapper.find('.numberInput').simulate('change', inputValue);
    expect(numberOfEventsWrapper.state('numberOfEvents')).toBe(5);
  });
});