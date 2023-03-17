import {createSlice} from "@reduxjs/toolkit";

const initialState = {tool: null}

export const toolSlice = createSlice({
    name: 'tool',
    initialState: initialState,
    reducers: {
        setTool(state,action) {
            state.tool = action.payload
        }
    }
})