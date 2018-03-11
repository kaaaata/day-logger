import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as functions from '../functions';
import shortid from 'shortid';

const initialState = {
  activeActivity: { id: null },
  days: [
    { id: shortid.generate(), date: 'March 1, 2018', colors: functions.randomCircleColors(), happiness: 75, productivity: 75,
      activities: [
        { id: shortid.generate(), date: 'March 1, 2018', activity: 'learn redux', colors: functions.randomCircleColors(), happiness: 75, productivity: 75 },
        { id: shortid.generate(), date: 'March 1, 2018', activity: 'play dota', colors: functions.randomCircleColors(), happiness: 75, productivity: 75 },
        { id: shortid.generate(), date: 'March 1, 2018', activity: 'work out', colors: functions.randomCircleColors(), happiness: 75, productivity: 75 },
      ],
    },
    { id: shortid.generate(), date: 'March 2, 2018', colors: functions.randomCircleColors(), happiness: 75, productivity: 75,
      activities: [
        { id: shortid.generate(), date: 'March 2, 2018', activity: 'learn redux', colors: functions.randomCircleColors(), happiness: 75, productivity: 75 },
        { id: shortid.generate(), date: 'March 2, 2018', activity: 'play dota', colors: functions.randomCircleColors(), happiness: 75, productivity: 75 },
        { id: shortid.generate(), date: 'March 2, 2018', activity: 'work out', colors: functions.randomCircleColors(), happiness: 75, productivity: 75 },
      ],
    },
    { id: shortid.generate(), date: 'March 3, 2018', colors: functions.randomCircleColors(), happiness: 75, productivity: 75,
      activities: [
        { id: shortid.generate(), date: 'March 3, 2018', activity: 'learn redux', colors: functions.randomCircleColors(), happiness: 75, productivity: 75 },
        { id: shortid.generate(), date: 'March 3, 2018', activity: 'play dota', colors: functions.randomCircleColors(), happiness: 75, productivity: 75 },
        { id: shortid.generate(), date: 'March 3, 2018', activity: 'work out', colors: functions.randomCircleColors(), happiness: 75, productivity: 75 },
      ],
    },
  ],
};

const reducers = {
  default: (state = initialState, action) => {
    switch (action.type) {      
      case 'add_day':
        return {
          ...state,
          days: [{ id: shortid.generate(), date: '', activity: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75, activities: [
            { id: shortid.generate(), date: '', activity: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75 }
          ]}, ...state.days],
        };
      case 'add_activity':
        const id = shortid.generate();

        return {
          ...state,
          activeActivity: { id },
          days: state.days.map(day => 
            day.id === action.payload.id
              ? { ...day, activities: [{
                  id, date: day.date, activity: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75
              }, ...day.activities] }
              : day),
        };
      case 'delete_activity':
        return {
          ...state,
          // activeActivity: { id: action.payload.id === state.activeActivity.id ? null : action.payload.id },
          days: state.days.map(day => (
            { ...day, activities: day.activities.slice(0, day.activities.length - 1 ) }
            // day.activities.filter(activity => activity.id !== action.payload.id)
          ))
        };
      case 'update_activity':
        return {
          ...state,
          days: state.days.map(day => (
            { ...day, activities: day.activities.map(activity => 
              activity.id === state.activeActivity.id
                ? { ...activity, 
                  id: action.payload.id || activity.id,
                  date: action.payload.date || activity.date,
                  activity: action.payload.activity || activity.activity,
                  colors: action.payload.colors || activity.colors,
                  happiness: action.payload.happiness || activity.happiness,
                  productivity: action.payload.productivity || activity.productivity,
                }
                : activity,
            )}
          )),
        };
      case 'update_dates':
        return {
          ...state,
          days: state.days.map(day => 
            day.id === action.payload.id
              ? { ...day, date: action.payload.date, activities: day.activities.map(activity => (
                { ...activity, date: action.payload.date }))}
              : day),  
        };
      case 'update_active_activity':
        return {
          ...state,
          activeActivity: { ...state.activeActivity, id: action.payload.id },
        };
      default:
        return state;
    }
  },
};

export default createStore(combineReducers(reducers));
