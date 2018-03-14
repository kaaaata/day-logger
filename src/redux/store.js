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
    happiness: {
      average: null,
    },
    productivity: {
      average: null,
    },
  }
};

const reducers = {
  default: (state = initialState, action) => {
    switch (action.type) {
      case 'add_day':
        const day_id = shortid.generate();
        const activity_id = shortid.generate();

        return { ...state,
          days: [{ id: day_id, date: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75, username: state.activeUsername }, ...state.days],
          activities: [{ id: activity_id, activity: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75, username: state.activeUsername, day: day_id }, ...state.activities],
        };
      case 'delete_day':
        return { ...state,
          days: state.days.filter(day => day.id !== action.payload.id),
        }
      case 'add_activity':
        return { ...state,
          activities: [{ id: shortid.generate(), activity: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75, username: state.activeUsername, day: day_id }, ...state.activities],
        }
      case 'delete_activity':
        return { ...state,
          activities: state.activities.filter(activity => activity.id !== action.payload.id),
          activeActivity: { id: state.activeActivity.id === action.payload.id
            ? state.activities.filter(activitiy => activity.day === state.activeDay.id)[0].id
            : state.activeActivity,
          },
        };
      case 'update_date':
        return { ...state,
          days: state.days.map(day => day.id === state.activeDay.id
            ? { ...day, date: action.payload.date }
            : day),
        };
      case 'update_activity':
        return { ...state,
          activities: state.activities.map(activity => activity.id === state.activeActivity.id
            ? { ...activity,
                activity: action.payload.activity || activity.activity,
                happiness: action.payload.activity || activity.happiness,
                productivity: action.payload.productivity || activity.productivity,
              }
            : activity),
        };
      case 'update_active_day':
        return { ...state, 
          activeDay: action.payload.day,
        };
      case 'update_active_activity':
        return { ...state, 
          activeActivity: action.payload.activity,
        };
      case 'initialize_store':
        return { ...state,
          activeUsername: action.payload.username,
          days: action.payload.days.map(day => ({ ...day, colors: JSON.parse(day.colors) })),
          activities: action.payload.activities.map(activity => ({ ...activity, colors: JSON.parse(day.colors) })),
        };
      case 'calculate_statistics':
        return { ...state,
          days: state.days.map(day => ({ ...day, 
            happiness: day.activities.reduce((a, b) => a.happiness + b.happiness),
            productivity: day.activities.reduce((a, b) => a.productivity + b.productivity),
          })),
          statistics: {
            happiness: { average: state.days.reduce((a, b) => a.happiness + b.happiness) },
            productivity: { average: state.days.reduce((a, b) => a.productivity + b.productivity) },
          },
        };
      default:
        return state;
    }
  },
};
// const reducers = {
//   default: (state = initialState, action) => {
//     switch (action.type) {
//       case 'add_day':
//         const day_ID = shortid.generate();
//         const activity_ID = shortid.generate();

//         return {
//           ...state,
//           activeDay: { id: day_ID },
//           activeActivity: { id: activity_ID },
//           days: [{ id: day_ID, date: '', activity: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75, activities: [
//             { id: activity_ID, date: '', activity: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75 }
//           ]}, ...state.days],
//         };
//       case 'add_activity':
//         const id = shortid.generate();

//         return {
//           ...state,
//           activeActivity: { id },
//           days: state.days.map(day => 
//             day.id === action.payload.id
//               ? { ...day, activities: [{
//                   id, date: day.date, activity: '', colors: functions.randomCircleColors(), happiness: 75, productivity: 75
//               }, ...day.activities] }
//               : day),
//         };
//       case 'delete_day':
//         return {
//           ...state,
//           days: state.days.filter(day => day.id !== action.payload.id),
//         };
//       case 'delete_activity':
//         return {
//           ...state,
//           activeActivity: { id: action.payload.id === state.activeActivity.id
//             ? state.days.filter(day => day.id === state.activeDay.id)[0].activities.filter(activity => 
//               activity.id !== action.payload.id)[0].id
//             : state.activeActivity.id },
//           days: state.days.map(day => (
//             { ...day, activities: day.activities.filter(activity => activity.id != action.payload.id) }
//           )),
//         };
//       case 'update_activity':
//         return {
//           ...state,
//           days: state.days.map(day => (
//             { ...day, activities: day.activities.map(activity => 
//               activity.id === state.activeActivity.id
//                 ? { ...activity, 
//                   id: action.payload.id || activity.id,
//                   date: action.payload.date || activity.date,
//                   activity: action.payload.activity || activity.activity,
//                   colors: action.payload.colors || activity.colors,
//                   happiness: action.payload.happiness || activity.happiness,
//                   productivity: action.payload.productivity || activity.productivity,
//                 }
//                 : activity,
//             )}
//           )),
//         };
//       case 'update_dates':
//         return {
//           ...state,
//           days: state.days.map(day => 
//             day.id === action.payload.id
//               ? { ...day, date: action.payload.date, activities: day.activities.map(activity => (
//                 { ...activity, date: action.payload.date }))}
//               : day),  
//         };
//       case 'update_active_day':
//         return {
//           ...state,
//           activeDay: { id: action.payload.id },
//           activeActivity: { id: state.days.filter(day => day.id === action.payload.id)[0].activities[0].id },
//         };
//       case 'update_active_activity':
//         return {
//           ...state,
//           activeActivity: { id: action.payload.id },
//         };
//       default:
//         return state;
//     }
//   },
// };

export default createStore(combineReducers(reducers));
