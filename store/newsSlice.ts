import { createAsyncThunk, createSlice, AsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import axios from '../axios';
import { StoryType, RootState } from './types';


interface StoryQueryType {
    storyType: StoryType,
    lastStoryId: number,
    storyCount: number,
    operation: 'append' | 'new'
}

export const getStories = createAsyncThunk(
    'news/getStories',
    async (payload : StoryQueryType, thunkAPI ) => {

        try {
            const url = payload.storyType === StoryType.new ? '/newstories.json' : '/topstories.json';

            const response : AxiosResponse = await axios.get(url);

            let stories = response.data as number[];
            

            if(payload.operation === 'append'){

                const lastStoryIndex = stories.indexOf(payload.lastStoryId);

                stories = stories.slice(lastStoryIndex + 1, lastStoryIndex + payload.storyCount);

                return stories;
            }

            return stories.slice(0, payload.storyCount)
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to get stories, please check your connection.')
        }
    }
);

interface NewState {
    news: Array<number>,
    errorMessage: string,
    isFetching: boolean,
    isSuccess: boolean,
    isFetched: boolean
}

const initialState : NewState = {
    news: [],
    errorMessage: '',
    isFetching: false,
    isSuccess: false,
    isFetched: false,
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        resetState(state) {
            state.errorMessage = '';
            state.isFetching = false;
            state.isSuccess = false;
            state.isFetched = true;

            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStories.fulfilled, (state, {payload, meta}) => {

            if(meta.arg.operation === 'append'){
                state.news.push(...payload as number[]);
            }else{
                state.news = payload as number[];
            }
            state.isSuccess = true;
            state.isFetching = false;
            state.isFetched = true;
            state.errorMessage = '';

            return state;
        });
        builder.addCase(getStories.pending, (state, {meta}) => {
            if(meta.arg.operation === 'new'){
                state.isFetching = true;
            }
        });
        builder.addCase(getStories.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = false;
            state.errorMessage = payload as string;

            return state;
        });
    }
}
)

export const { resetState } = newsSlice.actions;
export const newsSelector = (store : RootState) => store.news

export default newsSlice;