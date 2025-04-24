// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // fetchRequests
// // export const fetchRequests = createAsyncThunk(
// //   'requests/fetchRequests',
// //   async (_, thunkAPI) => {
// //     try {
// //       const token = localStorage.getItem('userToken');
// //       const response = await axios.get(
// //         'https://nuqta-production.up.railway.app/api/request',
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             'Accept-Language': 'en',
// //           },
// //         }
// //       );
// //       return response.data;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(
// //         error.response?.data?.message || error.message
// //       );
// //     }
// //   }
// // );

// // Add request
// export const addRequest = createAsyncThunk(
//   'requests/addRequest',
//   async (newRequest, thunkAPI) => {
//     try {
//       const token = localStorage.getItem('userToken');
//       const response = await axios.post(
//         'https://nuqta-production.up.railway.app/api/request',
//         newRequest,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//             'Accept-Language': 'en',
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// // Update request
// export const updateRequest = createAsyncThunk(
//   'requests/updateRequest',
//   async (updatedRequest, thunkAPI) => {
//     try {
//       const token = localStorage.getItem('userToken');
//       const response = await axios.put(
//         'https://nuqta-production.up.railway.app/api/request',
//         updatedRequest,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//             'Accept-Language': 'en',
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// // Delete request
// export const deleteRequest = createAsyncThunk(
//   'requests/deleteRequest',
//   async (id, thunkAPI) => {
//     try {
//       const token = localStorage.getItem('userToken');
//       await axios.delete(
//         `https://nuqta-production.up.railway.app/api/request/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Accept-Language': 'en',
//           },
//         }
//       );
//       return id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// const bloodRequestSlice = createSlice({
//   name: 'bloodRequests',
//   initialState: {
//     requests: [],
//     isEditing: false,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setFormData: (state, action) => {
//       state.formData = action.payload;
//     },
//     setIsEditing: (state, action) => {
//       state.isEditing = action.payload;
//     },
//     resetForm: (state) => {
//       state.formData = {
//         id: null,
//         name: '',
//         governorate: '',
//         city: '',
//         phone: '',
//         quantity: '',
//         age: '',
//         gender: '',
//         urgency: 'normal',
//         bloodType: '',
//         status: 'Open',
//         image: null,
//       };
//       state.isEditing = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // fetchRequests
//       // .addCase(fetchRequests.pending, (state) => {
//       //   state.loading = true;
//       //   state.error = null;
//       // })
//       // .addCase(fetchRequests.fulfilled, (state, action) => {
//       //   state.loading = false;
//       //   state.requests = action.payload;
//       // })
//       // .addCase(fetchRequests.rejected, (state, action) => {
//       //   state.loading = false;
//       //   state.error = action.payload;
//       // })

//       // Add request
//       .addCase(addRequest.fulfilled, (state, action) => {
//         state.requests.push(action.payload);
//       })

//       // Update request
//       .addCase(updateRequest.fulfilled, (state, action) => {
//         const index = state.requests.findIndex((req) => req.id === action.payload.id);
//         if (index >= 0) {
//           state.requests[index] = action.payload;
//         }
//       })

//       // Delete request
//       .addCase(deleteRequest.fulfilled, (state, action) => {
//         state.requests = state.requests.filter((req) => req.id !== action.payload);
//       });
//   },
// });

// export const { setFormData, setIsEditing, resetForm } = bloodRequestSlice.actions;

// export default bloodRequestSlice.reducer;
