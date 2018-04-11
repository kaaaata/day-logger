import { createStore, combineReducers } from 'redux';
import * as functions from '../functions';
import shortid from 'shortid';

const initialState = {
  activeUsername: null,
  activeDay: { id: null },
  activeActivity: { id: null }, 
  days: [],
  activities: [],
  statistics: {
    happinesses: [],
    productivities: [],
  },
  saved: true, // whether redux is saved to psql. impacts yellow highlight on header button 'save'
};

const reducers = {
  default: (state = initialState, action) => {
    switch (action.type) {
      case 'add_day':
        const day_id = shortid.generate();
        const activity_id = shortid.generate();
        return { ...state, saved: false, 
          days: [{ id: day_id, date: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75, username: state.activeUsername }, ...state.days],
          activities: [{ id: activity_id, activity: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75, username: state.activeUsername, day: day_id }, ...state.activities],
        };
      case 'delete_day':
        return { ...state, saved: false,
          days: state.days.filter(day => day.id !== action.payload.id),
        }
      case 'add_activity':
        const id = shortid.generate();
        return { ...state, saved: false,
          activeActivity: { id },
          activities: [{ id, activity: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75, username: state.activeUsername, day: state.activeDay.id }, ...state.activities],
        };
      case 'delete_activity':
        const index = state.activities.filter(activity => activity.day === state.activeDay.id).map(activity => activity.id).indexOf(action.payload.id);
        const newActivities = state.activities.filter(activity => activity.day === state.activeDay.id && activity.id !== action.payload.id);
        return { ...state, saved: false,
          activities: state.activities.filter(activity => activity.id !== action.payload.id),
          activeActivity: { id: state.activeActivity.id === action.payload.id
            ? (index >= newActivities.length ? newActivities[index - 1].id : newActivities[index].id)
            : state.activeActivity.id,
          },
        };
      case 'update_date':
        return { ...state, saved: false,
          days: state.days.map(day => day.id === state.activeDay.id
            ? { ...day, date: action.payload.date }
            : day),
        };
      case 'update_activity':
        return { ...state, saved: false,
          activities: state.activities.map(activity => activity.id === state.activeActivity.id
            ? { ...activity,
                // can't use action.payload.activity || activity.activity for the following line because '' is false
                activity: action.payload.activity === undefined ? activity.activity : action.payload.activity,
                happiness: action.payload.happiness || activity.happiness,
                productivity: action.payload.productivity || activity.productivity,
              }
            : activity),
        };
      case 'update_active_day':
        return { ...state,
          activeDay: { id: action.payload.id },
        };
      case 'update_active_activity':
        return { ...state,
          activeActivity: { id: action.payload.id },
        };
      case 'initialize_store':
        return { ...state,
          activeUsername: action.payload.username,
          days: action.payload.days.map(day => ({ ...day, colors: JSON.parse(day.colors) })),
          activities: action.payload.activities.map(activity => ({ ...activity, colors: JSON.parse(activity.colors) })),
        };
      case 'calculate_statistics':
        return { ...state,
          days: state.days.map(day => {
            const activities = state.activities.filter(activity => activity.day === day.id);
            return { ...day, 
              happiness: ~~(activities.map(activity => activity.happiness).reduce((a, b) => a + b) / activities.length),
              productivity: ~~(activities.map(activity => activity.productivity).reduce((a, b) => a + b) / activities.length) };
          }),
          statistics: {
            happiness: {
              raw: state.days.map(day => day.happiness),
              percentages: state.days.map(day => ~~((150 - day.happiness) * 100 / 150)),
              average: ~~((150 - state.days.map(day => day.happiness).reduce((a, b) => a + b) / state.days.length) * 100 / 150) + '%',
              activities: state.activities.map(activity => ~~((150 - activity.happiness) * 100 / 150)),
            },
            productivity: {
              raw: state.days.map(day => day.productivity),
              percentages: state.days.map(day => ~~((150 - day.productivity) * 100 / 150)),
              average: ~~((150 - state.days.map(day => day.productivity).reduce((a, b) => a + b) / state.days.length) * 100 / 150) + '%',
              activities: state.activities.map(activity => ~~((150 - activity.productivity) * 100 / 150)),
            }
          },
        };
      case 'save':
        return { ...state, saved: true };
      default:
        return state;
    }
  },
};

export default createStore(combineReducers(reducers));
