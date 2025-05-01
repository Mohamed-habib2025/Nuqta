import { configureStore } from "@reduxjs/toolkit";
import userTypeReducer from './slices/userTypeSlice'
import usersReducer from './slices/usersSlice';
import userReducer from './slices/userSlice'
import useridReducer from './slices/userid';
import organizationsReducer from './slices/organizationsSlice';
import orgReducer from './slices/orgSlice'
import orgidReducer from './slices/orgid'
import ForgotPasswordReducer from './slices/ForgotPassword'
import RequestsUserReducer from './slices/RequestsUser'

export const store = configureStore({
  reducer: {
    userType: userTypeReducer,

    users: usersReducer,
    user: userReducer,
    userid: useridReducer,

    organizations: organizationsReducer,
    organization: orgReducer,
    orgid: orgidReducer,
    
    forgetpassword:ForgotPasswordReducer,

    requestsUser:RequestsUserReducer,
  }
})