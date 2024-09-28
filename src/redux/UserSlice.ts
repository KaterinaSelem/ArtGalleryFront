import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../components/UserCard/types";
import { API_ENDPOINTS } from "../components/Config/apiConfig";

interface UserState {
    user: IUser[];
    isLoading: boolean;
    error: string | null;
    }

const initialState: UserState = {
    user: [],
    isLoading: false,
    error: null
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_USER, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue(`Error: ${response.status} ${response.statusText}`);
      }


      const data = await response.json();
      return data as IUser[];
    } catch (error) {
      return rejectWithValue('Error fetching users');
    }
  }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export default usersSlice.reducer;

