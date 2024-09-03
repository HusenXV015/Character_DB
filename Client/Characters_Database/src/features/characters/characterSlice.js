import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (url, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const originalResponse = await axios.get(`${url}/characters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const moogleResponse = await axios.get(
        'https://www.moogleapi.com/api/v1/characters'
      );

      return {
        originalCharacters: originalResponse.data.characters,
        moogleCharacters: moogleResponse.data,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Fetch character error');
    }
  }
);

const characterSlice = createSlice({
  name: 'characters',
  initialState: {
    originalCharacters: [],
    moogleCharacters: [],
    loading: false,
    searchTerm: '',
    sortColumn: 'id',
    sortOrder: 'ASC',
    currentPageOriginal: 1,
    currentPageMoogle: 1,
    charactersPerPage: 6,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortColumn: (state, action) => {
      state.sortColumn = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setCurrentPageOriginal: (state, action) => {
      state.currentPageOriginal = action.payload;
    },
    setCurrentPageMoogle: (state, action) => {
      state.currentPageMoogle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.originalCharacters = action.payload.originalCharacters;
        state.moogleCharacters = action.payload.moogleCharacters;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        alert(action.payload);
      });
  },
});

export const {
  setSearchTerm,
  setSortColumn,
  setSortOrder,
  setCurrentPageOriginal,
  setCurrentPageMoogle,
} = characterSlice.actions;

export default characterSlice.reducer;
