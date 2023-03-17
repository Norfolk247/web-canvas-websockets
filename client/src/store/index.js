import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {toolSlice} from "./toolSlice";
import {canvasSlice} from "./canvasSlice";

const rootReducer = combineReducers({
    toolReducer:toolSlice.reducer,
    canvasReducer:canvasSlice.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}