import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        const response = await axios.get('https://api.sportsaibet.com/auth/login/success', {
            withCredentials: true
        })
        return response.data.person[0];
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstName: null,
        lastName: null,
        dailyEmail: null,
        userId: null,
        email: null,
        profileImage: null,
        loggedIn: false,
        loading: false,
        error: null
    }, 
    reducers: {
        clearUserData: state => {
            state.firstName = null
            state.lastName = null
            state.dailyEmail = null
            state.userId = null
            state.email = null
            state.profileImage = null
            state.loggedIn = false
        }
    },
    extraReducers: (builder) => {
            builder.addCase(fetchUserData.fulfilled, (state, action) => {
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName
                state.dailyEmail = action.payload.dailyEmail
                state.userId = action.payload.userId
                state.profileImage = action.payload.profileImage
                state.email = action.payload.email
                state.loggedIn = true
                state.loading = false
                state.error = null
            })
            builder.addCase(fetchUserData.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            builder.addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
    }
})

export const { addUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;