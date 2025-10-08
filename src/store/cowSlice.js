import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialCows = [
  { earTag: '001', sex: 'Male', pen: 'A1', status: 'Active', lastEvent: '2025-10-08', weight: 400, events: [] },
  { earTag: '002', sex: 'Female', pen: 'B2', status: 'In Treatment', lastEvent: '2025-10-07', weight: 350, events: [] },
];

const initialState = {
  cows: initialCows,
  search: '',
  statusFilter: '',
  penFilter: '',
  loading: false,
};

export const saveCow = createAsyncThunk(
  'cow/saveCow',
  async (newCow, { getState }) => {
    const { cows } = getState().cow;
    const exists = cows.find(c => c.earTag === newCow.earTag);
    let updatedCows;
    if (exists) {
      updatedCows = cows.map(c => c.earTag === newCow.earTag ? newCow : c);
    } else {
      updatedCows = [...cows, newCow];
    }
    return updatedCows;
  }
);

const cowSlice = createSlice({
  name: 'cow',
  initialState,
  reducers: {
    setSearch: (state, action) => { state.search = action.payload; },
    setStatusFilter: (state, action) => { state.statusFilter = action.payload; },
    setPenFilter: (state, action) => { state.penFilter = action.payload; },
    deleteCow: (state, action) => {
      state.cows = state.cows.filter(cow => cow.earTag !== action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(saveCow.pending, state => { state.loading = true; })
      .addCase(saveCow.fulfilled, (state, action) => {
        state.cows = action.payload;
        state.loading = false;
      });
  }
});

export const { setSearch, setStatusFilter, setPenFilter, deleteCow } = cowSlice.actions;
export default cowSlice.reducer;
