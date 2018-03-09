import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as functions from '../functions';

const initialState = {
  days: [
    { date: 'March 1, 2018', colors: functions.randomCircleColors(), happiness: 100, productivity: 100,
      activities: [
        { date: 'March 1, 2018', activity: 'learn redux', colors: functions.randomCircleColors(), happiness: 100, productivity: 100 },
        { date: 'March 1, 2018', activity: 'play dota', colors: functions.randomCircleColors(), happiness: 100, productivity: 100 },
        { date: 'March 1, 2018', activity: 'work out', colors: functions.randomCircleColors(), happiness: 100, productivity: 100 },
      ],
    },
    { date: 'March 2, 2018', colors: functions.randomCircleColors(),
      activities: [
        { date: 'March 2, 2018', activity: 'learn redux', colors: functions.randomCircleColors(), happiness: 100, productivity: 100 },
        { date: 'March 2, 2018', activity: 'play dota', colors: functions.randomCircleColors(), happiness: 100, productivity: 100 },
        { date: 'March 2, 2018', activity: 'work out', colors: functions.randomCircleColors(), happiness: 100, productivity: 100 },
      ],
    },
    { date: 'March 3, 2018', colors: functions.randomCircleColors(),
      activities: [
        { date: 'March 3, 2018', activity: 'learn redux', colors: functions.randomCircleColors(), happiness: 100, productivity: 100 },
        { date: 'March 3, 2018', activity: 'play dota', colors: functions.randomCircleColors(), happiness: 100, productivity: 100 },
        { date: 'March 3, 2018', activity: 'work out', colors: functions.randomCircleColors(), happiness: 100, productivity: 100 },
      ],
    },
  ],
  newActivity: {
    activity: '', colors: functions.randomCircleColors(), happiness: 50, productivity: 50,
  },
};

const reducers = {
  default: (state = initialState, action) => {
    switch (action.type) {
      case 'add_day':
        return {
          ...state,
          days: [action.payload, ...state.days],
        };
      case 'add_new_activity':
        return {
          ...state,
          days: state.days.map(day => 
            day.date === action.payload.date
              ? { ...day, activities: [action.payload, ...day.activities] }
              : day),
          newActivity: { activity: '', colors: functions.randomCircleColors(), happiness: 50, productivity: 50 },
        };
      case 'update_dates':
        return {
          ...state,
          days: state.days.map(day => 
            day.date === action.payload.oldDate
              ? { ...day, date: action.payload.newDate, activities: day.activities.map(activity => (
                { ...activity, date: action.payload.newDate }))}
              : day),  
        };
      default:
        return state;
    }
  },
};

export default createStore(combineReducers(reducers));
