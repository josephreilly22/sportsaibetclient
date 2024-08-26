import { configureStore } from '@reduxjs/toolkit';

// Reducer Imports 
import mlbReducer from './reducers/mlbSlice';
import nflReducer from './reducers/nflSlice';
import userReducer from './reducers/userSlice';

export default configureStore({
    reducer: {
        mlb: mlbReducer,
        nfl: nflReducer,
        user: userReducer
    }
})