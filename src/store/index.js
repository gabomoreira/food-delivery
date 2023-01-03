import {configureStore} from '@reduxjs/toolkit';

import tabReducer from './tab/tabSlice';

export const store = configureStore({
  reducer: {
    tab: tabReducer,
  },
});
