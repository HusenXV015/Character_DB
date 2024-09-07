import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  originalCharacters: [],
  moogleCharacters: [],
  loading: false,
  error: '',
  searchTerm: '',
  sortColumn: 'id',
  sortOrder: 'ASC',
  currentPageOriginal: 1,
  currentPageMoogle: 1,
  charactersPerPage: 6,
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.error = '';
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.originalCharacters = action.payload.originalCharacters;
      state.moogleCharacters = action.payload.moogleCharacters;
      state.error = '';
    },
    fetchReject(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSortColumn(state, action) {
      state.sortColumn = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setCurrentPageOriginal(state, action) {
      state.currentPageOriginal = action.payload;
    },
    setCurrentPageMoogle(state, action) {
      state.currentPageMoogle = action.payload;
    },
  },
});

export const {
  fetchPending,
  fetchSuccess,
  fetchReject,
  setSearchTerm,
  setSortColumn,
  setSortOrder,
  setCurrentPageOriginal,
  setCurrentPageMoogle,
} = characterSlice.actions;

export const fetchAsync = (url) => async (dispatch) => {
  try {
    dispatch(fetchPending());

    const token = localStorage.getItem('access_token');
    const originalResponse = await axios.get(`${url}/characters`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const moogleResponse = await axios.get(
      'https://www.moogleapi.com/api/v1/characters'
    );

    dispatch(fetchSuccess({
      originalCharacters: originalResponse.data.characters,
      moogleCharacters: moogleResponse.data,
    }));
  } catch (error) {
    dispatch(fetchReject(error.response?.data?.error || 'Fetch character error'));
  }
};

export default characterSlice.reducer;
