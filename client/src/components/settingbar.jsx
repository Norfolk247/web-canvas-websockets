import React, {useEffect, useState} from 'react';
import '../styles/bar.scss'
import {useSelector} from "react-redux";

const Settingbar = () => {
    const [fill, setFill] = useState(true)
    const tool = useSelector(state => state.toolReducer.tool)
    useEffect(()=>{
        setFill(true)
    },[tool])

    return (
        <div className='settingbar'>
            <div className='settingbar_btn'>Толщина обводки</div>
            <input className='settingbar_btn' type='number' min='1' defaultValue={1} onChange={(e)=>{
                tool.setLineWidth(e.target.value)
            }}/>
            <div className='settingbar_btn'>Цвет обводки</div>
            <input className='settingbar_btn' type='color' onChange={e=>{
                tool.setStrokeColor(e.target.value)
            }}/>
            <div className={
                fill ? 'settingbar_btn' : 'settingbar_btn no-fill'
            } style={{cursor:"pointer",border:'1px solid black',padding:4}} onClick={()=> {
                setFill(!fill)
                tool.setFill(!fill)
            }}>Цвет заливки</div>
            <input className='settingbar_btn' type='color' onChange={e=>{
                tool.setFillColor(e.target.value)
            }}/>
        </div>
    );
};

export default Settingbar;