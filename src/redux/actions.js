export const addDay = () => ({ type: 'add_day', payload: null });
export const deleteDay = (day) => ({ type: 'delete_day', payload: day });
export const addActivity = (day) => ({ type: 'add_activity', payload: day });
export const updateDates = (dates) => ({ type: 'update_dates', payload: dates });
export const updateActivity = (activity) => ({ type: 'update_activity', payload: activity });
export const deleteActivity = (activity) => ({ type: 'delete_activity', payload: activity });
export const updateActiveDay = (day) => ({ type: 'update_active_day', payload: day });
export const updateActiveActivity = (activity) => ({ type: 'update_active_activity', payload: activity });
