import React from "react";
import Api from "./services/api";
import './efferalGangLiveList.css';
import logo from './img/logo.jpg';
import moment from 'moment';

class LiveListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            videoId: '',
            loading: false,
            isVideoFound: false,
            isNewShowAdded: false,
            error: false
        };
    }

    handleChange(event) {
        this.setState({videoId: event.target.value});
    }

    track() {
        const videoId = this.props.data;

        if (videoId !== "") {
            this.setState({videoId: '', loading: true});

            Api.trackNewVideoId(encodeURIComponent(this.state.videoId))
                .then(data => {
                    console.log(JSON.stringify(data));
                    if (data.hasOwnProperty('video')) {
                        console.log("data.new = " + data.new);
                        this.setState({loading: false, isNewShowAdded: data.new, error: false, isVideoFound: true});
                    } else {
                        this.setState({loading: false, error: true, isVideoFound: false});
                    }
                }
            );
        }
    }

    renderLoading() {
        return (<div className='EfferalGangRadio'>
            loading
        </div>);
    }

    renderError() {
        return (<div className="alert alert-warning"><strong>Error!</strong> {":'("/*this.props.error.message*/}</div>);
    }

    renderResult() {

        const { data } = this.props;
        const { status } = data;
        const handleChange = this.handleChange.bind(this);
        const track = this.track.bind(this);

        const { upcoming, current } = data.live_player;

        let shows = upcoming.map((item, key) =>
            <li key={item.id}> <span> <img src={item.thumbnail.url} className="thumbnail"/> </span>{item.title} (coming {moment(item.scheduled_at).fromNow()} at {moment(item.scheduled_at).format('LLLL')})</li>
        );

        let videoId = "";
        let t = 0;

        console.log('isNewShowAdded: ' + this.isNewShowAdded);

        return (
            <div className='livelist-wrapper'>

                <div>
                    <img className='logo' src={logo}/>
                </div>
                <div className='livelist'>

                    <h1>
                        Current show
                    </h1>

                    {!!current ?
                        <p key={current.id}> <span> <img src={current.thumbnail.url} className="thumbnail"/> </span>{current.title}</p>
                        :
                        <p> No lives! </p>}

                    <h1>
                        Upcoming shows
                    </h1>

                    <ul>
                        {shows}
                    </ul>

                    <h2>
                        Manually add an upcoming or live show
                    </h2>

                    <p>
                        Something missing? I check for new shows listed on the efferalgang channel every hour at :59. If your show is missing
                        and you can't wait that long, paste in the id of your show so that I can track it.
                    </p>

                    <input
                        type='text'
                        className='text-input'
                        value={this.state.videoId}
                        onChange={handleChange}
                        disabled={this.state.loading}
                        placeholder='Paste the URL, e.g. "https://studio.youtube.com/video/IjnIFdbHzvw/livestreaming"'
                    />

                    <button className='track-button' onClick={track}> Add show </button>

                    { this.state.error ?
                        <div>
                            <img className={'gif-response'} src='https://media.giphy.com/media/14aUO0Mf7dWDXW/giphy.gif'/>
                            <p className='error-message'> This is embarrassing but I don't understand what you have pasted into the text field. It can literally be any URL to your show or even the show ID itself. Are you sure this show exists and it's part of the Efferalgang channel?</p>
                        </div>
                        : null }


                    { this.state.isVideoFound && !this.state.isNewShowAdded ?
                        <div>
                            <img className={'gif-response'} src='https://media.giphy.com/media/3o6ZtfraiyfUkNDwru/giphy.gif'/>
                            <p className='warning-message'> I already knew about this show... so maybe there is not problem here? </p>
                        </div>
                        : null
                    }

                    { this.state.isVideoFound && this.state.isNewShowAdded ?
                        <div>
                            <img className={'gif-response'} src='https://media.giphy.com/media/YVpIaYgJ3lpMk/giphy.gif'/>
                            <p className='success-message'> YOU DID IT. </p>
                        </div>
                        : null
                    }
                </div>
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

class LiveList extends React.Component {
    state = {
        data: null,
        error: null,
        loading: true
    };

    render() {
        return (
            <LiveListView {...this.state} />
        );
    }

    componentDidMount() {
        this.getVideo();
        this.interval = setInterval(() => this.getVideo(), 20000);
    }

    getVideo() {
        Api.getPlayerInfo()
            .then((data) => {
                console.log("STATUS: " + JSON.stringify(data.status));
                this.setState({data: {...data}})
            })
            .catch((error) => {
                this.setState({error: true});
                console.log("error: " + JSON.stringify(error));
            });
    }
}


export default LiveList;
