export const addDay = () => ({ type: 'add_day', payload: null });
export const addNewActivity = (newActivity) => ({ type: 'add_new_activity', payload: newActivity });
export const updateDates= (dates) => ({ type: 'update_dates', payload: dates });
export const updateNewActivity = (updates) => ({ type: 'update_new_activity', payload: updates });
