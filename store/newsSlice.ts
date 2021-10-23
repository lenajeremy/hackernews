import { createAsyncThunk, createSlice, AsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import axios from '../axios';
import { StoryType, RootState } from './types';


interface StoryQueryType {
    storyType: StoryType,
    start: number,
    end: number,
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
                const news : number[] = thunkAPI.getState().news.news;

                stories = stories.slice(payload.start, payload.end);

                Alert.alert(JSON.stringify(stories))

                return stories.concat(news);
            }
            return stories.slice(payload.start, payload.end)
        } catch (error) {
            Alert.alert("network error");
            console.warn("Error", error.message);
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
    news: [1, 2,3, 4, 5, 6, 7],
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
        builder.addCase(getStories.fulfilled, (state, {payload}) => {
            state.news = payload as number[];
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