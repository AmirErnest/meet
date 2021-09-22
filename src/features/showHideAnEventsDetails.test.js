import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';

import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import EventList from '../EventList';
import Event from '../Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let EventListWrapper;
    let EventWrapper;
    given('the user hasn’t expanded an event to see its details', () => {
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
    });
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see a list of all the events without details', () => {
      expect(EventWrapper.find(".description")).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppWrapper;
    let EventListWrapper;
    let EventWrapper;
    given('the main page is open', () => {
      AppWrapper = mount(<App />);
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
    });

    when('the user clicked on expand/more details button on a specific event', () => {
      EventWrapper.find(".details-btn").at(1).simulate("click");
    });

    then('the user should see the details of this specific event', () => {
      expect(EventWrapper.find(".description")).toHaveLength(2);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let AppWrapper;
    let EventListWrapper;
    let EventWrapper;
    given('an event’s details is expanded', () => {
      AppWrapper = mount(<App />);
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
      EventWrapper.find(".details-btn").at(1).simulate("click");
      EventWrapper.find(".description");
    });

    when('the user clicks on the collapse/show less button', () => {
      EventWrapper.find(".details-btn").at(1).simulate("click");
    });

    then('the user should no longer see the event’s details', () => {
      expect(EventWrapper.find(".description")).toHaveLength(0);
    });
  });

});