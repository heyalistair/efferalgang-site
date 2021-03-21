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
                src:"http://167.172.160.213/hls/stream.m3u8",
                type:"application/x-mpegURL"
            }]
        }

        return <VideoPlayer { ...videoJsOptions } />
    }
}

export default EfferalGangVideo;