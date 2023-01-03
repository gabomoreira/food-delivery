import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedTab: '',
};

export const tabSlice = createSlice({
  name: 'tabSlice',
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const {setSelectedTab} = tabSlice.actions;

export const getSelectedTab = state => state.tab.selectedTab;

export default tabSlice.reducer;
