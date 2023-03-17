import React from 'react'
import './styles/app.scss'
import Toolbar from "./components/toolbar";
import Settingbar from "./components/settingbar";
import Canvas from "./components/canvas";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className='app'>
                <Switch>
                    <Route path='/:id'>
                        <Toolbar/>
                        <Settingbar/>
                        <Canvas/>
                    </Route>
                    <Redirect to={`${(+new Date).toString(16)}`}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App