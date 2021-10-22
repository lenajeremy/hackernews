import { createAsyncThunk, createSlice, AsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import axios from '../axios';
import { StoryType, RootState } from './types';


interface StoryQueryType {
    storyType: StoryType,
    start: number,
    end: number
}

export const getStories = createAsyncThunk(
    'news/getStories',
    async (payload : StoryQueryType, thunkAPI ) => {
        try {
            const url = payload.storyType === StoryType.new ? '/newstories.json' : '/topstories.json';

            const response : AxiosResponse = await axios.get(url);

            const stories : number[] | any = response.data;

            return stories.slice(payload.start, payload.end)
        } catch (error) {
            console.warn("Error", error.message);
            thunkAPI.rejectWithValue('Unable to get stories, please check your connection.')
        }
    }
);

interface NewState {
    news: Array<number>,
    errorMessage: string,
    isFetching: boolean,
    isSuccess: boolean,
}

const initialState : NewState = {
    news: [],
    errorMessage: '',
    isFetching: false,
    isSuccess: false,
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        resetState(state) {
            state.errorMessage = '';
            state.isFetching = false;
            state.isSuccess = false;

            return state
        }
    },
    extraReducers: {
        [getStories.fulfilled.toString()] : (state, {payload}) => {
            state.news = payload;
            state.isSuccess = true;
            state.isFetching = false;
            state.errorMessage = '';

            return state;
        },
        [getStories.pending.toString()] : (state) => {
            state.isFetching = true;
        },
        [getStories.rejected.toString()] : (state, payload) => {
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload;

            return state;

        }
    }
}
)

export const { resetState } = newsSlice.actions;
export const newsSelector = (store : RootState) => store.news

export default newsSlice;