import React from 'react';
import '../styles/bar.scss'
import {useDispatch, useSelector} from "react-redux";
import {toolSlice} from "../store/toolSlice";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";
import {canvasSlice} from "../store/canvasSlice";

const Toolbar = () => {
    const dispatch = useDispatch()
    const {setTool} = toolSlice.actions
    const {undo,redo} = canvasSlice.actions
    const {canvas} = useSelector(state => state.canvasReducer)

    return (
        <div className='toolbar'>
            <div className='toolbar_btn brush' onClick={()=> {
                dispatch(setTool(new Brush(canvas)))
            }}/>
            <div className='toolbar_btn rect' onClick={()=> {
                dispatch(setTool(new Rect(canvas)))
            }}/>
            <div className='toolbar_btn circle' onClick={()=> {
                dispatch(setTool(new Circle(canvas)))
            }}/>
            <div className='toolbar_btn line' onClick={()=> {
                dispatch(setTool(new Line(canvas)))
            }}/>
            <div className='toolbar_btn eraser' onClick={()=> {
                dispatch(setTool(new Eraser(canvas)))
            }}/>
            <div className='toolbar_btn undo' onClick={()=> {
                dispatch(undo(canvas))
            }}/>
            <div className='toolbar_btn redo' onClick={()=> {
                dispatch(redo(canvas))
            }}/>
            <div className='toolbar_btn save' onClick={()=> {

            }}/>
        </div>
    );
};

export default Toolbar;