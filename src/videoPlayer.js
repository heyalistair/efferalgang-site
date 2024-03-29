import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './videoPlayer.css'

class VideoPlayer extends React.Component {

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={ node => this.videoNode = node }
            className={`video-js ${this.props.skin}`}>
          </video>
        </div>
      </div>
    )
  }
}

VideoPlayer.defaultProps = {
    skin: 'vjs-default-skin'
  }

export default VideoPlayer;
