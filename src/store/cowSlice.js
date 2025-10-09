import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'COW_DATA';

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

export const loadCows = createAsyncThunk('cow/loadCows', async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue) {
      return JSON.parse(jsonValue);
    }
    return initialCows;
  } catch (error) {
    console.error('Failed to load cows:', error);
    return initialCows;
  }
});

export const saveCow = createAsyncThunk(
  'cow/saveCow',
  async (newCow, { getState }) => {
    const { cows } = getState().cow;
    const exists = cows.find(c => c.earTag === newCow.earTag);
    const updatedCows = exists
      ? cows.map(c => (c.earTag === newCow.earTag ? newCow : c))
      : [...cows, newCow];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCows));

    return updatedCows;
  }
);

export const deleteCowAsync = createAsyncThunk(
  'cow/deleteCow',
  async (earTag, { getState }) => {
    const { cows } = getState().cow;
    const updatedCows = cows.filter(cow => cow.earTag !== earTag);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCows));

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
  },
  extraReducers: builder => {
    builder
      .addCase(loadCows.pending, state => { state.loading = true; })
      .addCase(loadCows.fulfilled, (state, action) => {
        state.cows = action.payload;
        state.loading = false;
      })
      .addCase(saveCow.pending, state => { state.loading = true; })
      .addCase(saveCow.fulfilled, (state, action) => {
        state.cows = action.payload;
        state.loading = false;
      })
      .addCase(deleteCowAsync.fulfilled, (state, action) => {
        state.cows = action.payload;
      });
  },
});

export const { setSearch, setStatusFilter, setPenFilter } = cowSlice.actions;
export default cowSlice.reducer;
