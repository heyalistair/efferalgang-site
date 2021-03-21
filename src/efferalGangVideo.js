import React, {Component} from 'react'
import VideoPlayer from './videoPlayer'

class EfferalGangVideo extends Component {

    render() {

        const videoJsOptions = {
            preload: 'auto',
            autoplay: true,
            controls: true,
            fluid: true,
            sources: [{
                src:"https://alistairj.com/hls/stream.m3u8",
                type:"application/x-mpegURL"
            }]
        }

        return <VideoPlayer { ...videoJsOptions } />
    }
}

export default EfferalGangVideo;