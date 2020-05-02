import React from "react";
import {css} from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Api from "./services/api";
import ReactPlayer from "react-player";
import './efferalGangRadio.css';


const override = css`
  border-color: red;
  alignItems: 'center';
  justifyContent: 'center';
`;

const Status = {
    Archive: "ARCHIVE",
    Upcoming: "UPCOMING",
    Live: "LIVE"
}

const waitingMusic = "9v9-Nw4nAZg";

class AwesomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
        return (
            <div className="sweet-loading">
                <ClipLoader
                    css={override}
                    size={150}
                    color={"#123abc"}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

class EfferalGangRadioView extends React.Component {

    renderLoading() {
        return (<AwesomeComponent/>);
    }

    renderError() {
        return (<div className="alert alert-warning"><strong>Error!</strong> {":'("/*this.props.error.message*/}</div>);
    }

    renderResult() {

        const { data } = this.props;
        const { status } = data;

        let videoId = "";
        let t = 0;

        if (status === Status.Archive) {
            videoId = data.archive_player.current.id;
            t = data.archive_player.current.playhead;
            return (
                <div className='EfferalGangRadio'>
                    <ReactPlayer
                        width='100%'
                        height='100%'
                        pip={false}
                        controls={true}
                        url={`https://www.youtube.com/watch?v=${videoId}&t=${t}`} playing/>
                </div>
            );
        }

        if (status === Status.Upcoming) {
            return (
                <div className='EfferalGangRadio'>
                    <ReactPlayer
                        width='100%'
                        height='100%'
                        pip={false}
                        controls={false}
                        loop={true}
                        url={`https://www.youtube.com/watch?v=${videoId}`} playing/>
                </div>
            );
        } else if (status === Status.Live) {
            videoId = data.live_player.current.id;
        }

        return (
            <div className='EfferalGangRadio'>
                <ReactPlayer
                    width='100%'
                    height='100%'
                    pip={false}
                    controls={true}
                    url={`https://www.youtube.com/watch?v=${videoId}`} playing/>
            </div>
        );

    }

    render() {
        const {data, error} = this.props;

        if (data) {
            return this.renderResult();
        } else if (error) {
            return this.renderError();
        } else {
            return this.renderLoading();
        }
    }
}

class EfferalGangRadio extends React.Component {
    state = {
        data: null,
        error: null,
        loading: true
    };

    render() {
        return (
            <EfferalGangRadioView {...this.state} />
        );
    }

    componentDidMount() {
        this.getVideo();
        this.interval = setInterval(() => this.getVideo(), 20000);

    }

    getVideo() {
        Api.getCurrentShowId()
            .then((data) => {

                console.log("STATUS: " + JSON.stringify(data.status));

                if (!this.state.data) {
                    // there is no state, so set the state to start playing a video
                    this.setState({data: {...data}})
                }

                const incomingStatus = data.status;
                const currentStatus = this.state.data.status;

                if (incomingStatus !== currentStatus) {
                    // we've just switched from archive to live
                    this.setState({data: {...data}});
                } else if (incomingStatus === Status.Live && currentStatus === Status.Live) {
                    // if one live is being handed off to another
                    if (data.live_player.current.id !== this.state.data.live_player.current.id) {
                        this.setState({data: {...data}});
                    }
                } else if (incomingStatus === Status.Archive && currentStatus === Status.Archive) {
                    // if one archive is being handed off to another
                    if (data.archive_player.current.id !== this.state.data.archive_player.current.id) {
                        this.setState({data: {...data}});
                    }
                }

            })
            .catch((error) => {
                this.setState({error: true});
                console.log("error: " + JSON.stringify(error));
            });
    }
}


export default EfferalGangRadio;
