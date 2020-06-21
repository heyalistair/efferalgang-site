import React from 'react';
import './App.css';
import EfferalGangRadio from "./efferalGangRadio";
import LiveList from "./efferalGangLiveList";
import useScript from './hooks/useScript';
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";


const ArenaEmbedChat = props => {
    useScript('https://go.arena.im/public/js/arenachatlib.js?p=efferalgang-radio&e=efferalgang-radio-global');
    // rest of your component

    return (<div className="arena-chat"
                 data-publisher="efferalgang-radio"
                 data-chatroom="efferalgang-radio-global"
                 data-position="in-page"/>);
};

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/live">
                    <LiveList/>
                </Route>
                <Route path="/chat">
                    <ArenaEmbedChat/>
                </Route>
                <Route path="/ichat">
                    <iframe title="super-cool-efferalgang-iframe-chat"
                            src='https://go.arena.im/embed/chat/efferalgang-radio/efferalgang-radio-global'
                            style={{
                                'border': 0,
                                'width': '1px',
                                'min-width': '100%'
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
