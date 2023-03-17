import React, {useEffect, useRef} from 'react';
import '../styles/canvas.scss'
import {useDispatch, useSelector} from "react-redux";
import {canvasSlice} from "../store/canvasSlice";
import Brush from "../tools/Brush";
import {toolSlice} from "../store/toolSlice";
import {useParams} from "react-router-dom";


const Canvas = () => {
    const hostname = 'localhost'
    const hostport = 5000

    const canvasRef = useRef()
    const dispatch = useDispatch()
    const {setCanvas,pushUndo,setSocket,setId} = canvasSlice.actions
    const {setTool} = toolSlice.actions
    const params = useParams()

    const {socket} = useSelector(state=>state.canvasReducer)

    useEffect(()=>{
        dispatch(setCanvas(canvasRef.current))
        dispatch(setTool(new Brush(canvasRef.current,socket,params.id)))
    },[socket])

    useEffect(()=>{
        const ws = new WebSocket(`ws://${hostname}:${hostport}/`)
        dispatch(setSocket(ws))
        dispatch(setId(params.id))
        ws.onopen = () => {
            ws.send(JSON.stringify({
                id:params.id,
                tool:{
                    name:'connect'
                }
            }))
        }
        ws.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            drawHandler(msg)
        }
    },[])

    const drawHandler = (msg) => {
        const tool = msg.tool
        const ctx = canvasRef.current.getContext('2d')
        switch (tool.name) {
            case "brush":
                Brush.draw(ctx,tool.x,tool.y)
                break
            case 'mouseUp':
                ctx.beginPath()
                break
            default:
                break
        }
    }

    return (
        <div className='canvas'>
            <canvas ref={canvasRef} onMouseDown={()=>{
                dispatch(pushUndo(canvasRef.current.toDataURL()))
            }} width={1200} height={700}/>
        </div>
    );
};

export default Canvas;