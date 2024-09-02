import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, AuthState } from './AuthSlice';
import usersReducer from './UserSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: usersReducer,
  },
});

const token = localStorage.getItem('accessToken');
if (token) {
  store.dispatch(login(token));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;