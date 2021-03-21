import React from 'react';
import './App.css';
import EfferalGangRadio from "./efferalGangRadio";
import EfferalGangVideo from "./efferalGangVideo";
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
        data-position="in-page" />);
};

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/live">
                    <LiveList />
                </Route>
                <Route path="/castr">
                    <iframe src="https://player.castr.com/live_4fe7f180890311eb99623595db260c33" width="100%" height="100%" frameborder="0" scrolling="no" allow="autoplay" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
                </Route>
                <Route path="/video">
                    <EfferalGangVideo />
                </Route>
                <Route path="/chat">
                    <ArenaEmbedChat />
                </Route>
                <Route path="/ichat">
                    <iframe
                        title="super-cool-efferalgang-iframe-chat"
                        src='https://go.arena.im/embed/chat/efferalgang-radio/efferalgang-radio-global'
                        style={{
                            'border': 0,
                            'width': '1px',
                            'min-width': '100%'
                        }} />
                </Route>
                <Route path="/dchat">
                    <iframe
                        src="https://titanembeds.com/embed/689546540271927301"
                        height="800"
                        width="400"
                        frameborder="0" />
                </Route>
                <Route path="/">
                    <EfferalGangRadio />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
