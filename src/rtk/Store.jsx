import { configureStore } from "@reduxjs/toolkit";
import userTypeReducer from './slices/userTypeSlice'

import userReducer from './slices/userSlice'
import orgReducer from './slices/orgSlice'
import usersReducer from './slices/usersSlice';
import organizationsReducer from './slices/organizationsSlice';

export const store = configureStore({
  reducer: {
    userType: userTypeReducer,
    user: userReducer,
    organization: orgReducer,
    users: usersReducer,
    organizations: organizationsReducer,
  }
})