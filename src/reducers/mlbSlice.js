import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMLBGames = createAsyncThunk(
    'mlb/fetchMLBGames',
    async () => {
        const date = new Date();
        const day = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
        const response = await axios.get('https://api.sportsaibet.com/mlbtoday', {
            date: day
        });
        return response.data;
    }
)

export const mlbSlice = createSlice({
    name: 'mlb',
    initialState: {
        games: [],
        loading: false,
        error: null
    }, 
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchMLBGames.fulfilled, (state, action) => {
            state.games = action.payload;
            state.loading = false;
            state.error = null;
        })
        builder.addCase(fetchMLBGames.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchMLBGames.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        })
    }
})

export const {  } = mlbSlice.actions;
export default mlbSlice.reducer;