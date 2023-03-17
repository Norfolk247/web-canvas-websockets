import {createSlice} from "@reduxjs/toolkit";

const initialState = {canvas: null,undoList: [],redoList: [],socket: null, id: null}

export const canvasSlice = createSlice({
    name: 'canvas',
    initialState: initialState,
    reducers: {
        setCanvas(state,action) {
            state.canvas = action.payload
        },
        pushUndo(state,action) {
            state.undoList.push(action.payload)
        },
        setSocket(state,action) {
            state.socket = action.payload
        },
        setId(state,action) {
            state.id = action.payload
        },
        undo(state,action) {
            let canvas = action.payload
            let ctx = canvas.getContext('2d')
            if (state.undoList.length > 0) {
                let dataUrl = state.undoList.pop()
                state.redoList.push(canvas.toDataURL())
                let img = new Image()
                img.src = dataUrl
                img.onload = () => {
                    ctx.clearRect(0,0,canvas.width,canvas.height)
                    ctx.drawImage(img,0,0,canvas.width,canvas.height)
                }
            } else {
                ctx.clearRect(0,0,canvas.width,canvas.height)
            }
        },
        redo(state,action) {
            let canvas = action.payload
            let ctx = canvas.getContext('2d')
            if (state.redoList.length > 0) {
                let dataUrl = state.redoList.pop()
                state.undoList.push(canvas.toDataURL())
                let img = new Image()
                img.src = dataUrl
                img.onload = () => {
                    ctx.clearRect(0,0,canvas.width,canvas.height)
                    ctx.drawImage(img,0,0,canvas.width,canvas.height)
                }
            }
        }
    }
})