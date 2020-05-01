import React from 'react';
import './App.css';
import EfferalGangRadio from "./efferalGangRadio";
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/chat">
                    <div className="arena-chat"
                         data-publisher="efferalgang-radio"
                         data-chatroom="efferalgang-radio-global"
                         data-position="in-page"/>
                    <script async
                            src="https://go.arena.im/public/js/arenachatlib.js?p=efferalgang-radio&e=efferalgang-radio-global"/>
                </Route>
                <Route path="/ichat">
                    <iframe title="super-cool-efferalgang-iframe-chat"
                            src='https://go.arena.im/embed/chat/efferalgang-radio/efferalgang-radio-global'
                            style={{
                                'border': 0,
                                'width': '1px',
                                'min-width': '100%',
                                'height': '100%',
                                'border-radius': '4px'
                            }}/>
                </Route>
                <Route path="/">
                    <EfferalGangRadio/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
