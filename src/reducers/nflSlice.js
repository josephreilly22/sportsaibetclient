import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchNFLGames = createAsyncThunk(
    'nfl/fetchNFLGames',
    async () => {
        const response = await axios.get('https://api.sportsaibet.com/nfltoday');
        return response.data;
    }
)

export const nflSlice = createSlice({
    name: 'nfl',
    initialState: {
        games: [],
        loading: false,
        error: null
    }, 
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchNFLGames.fulfilled, (state, action) => {
            state.games = action.payload;
            state.loading = false;
            state.error = null;
        })
        builder.addCase(fetchNFLGames.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchNFLGames.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        })
    }
})

export const {  } = nflSlice.actions;
export default nflSlice.reducer;