import { createSlice } from '@reduxjs/toolkit';

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    propertiesDelta: 0,
    transactionsDelta: 0,
    customersDelta: 0,
  },
  reducers: {
    incrementStat: (state, action) => {
      const { key, delta } = action.payload;
      if (key === 'properties') {
        state.propertiesDelta += delta;
      } else if (key === 'transactions') {
        state.transactionsDelta += delta;
      } else if (key === 'customers') {
        state.customersDelta += delta;
      }
    },
    resetDeltas: (state) => {
      state.propertiesDelta = 0;
      state.transactionsDelta = 0;
      state.customersDelta = 0;
    },
  },
});

export const { incrementStat, resetDeltas } = statsSlice.actions;
export default statsSlice.reducer;
