import React from "react";
import {css} from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Api from "./services/api";
import ReactPlayer from "react-player";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
  alignItems: 'center';
  justifyContent: 'center';
`;

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

class EfferalGangInfoView extends React.Component {

    renderLoading() {
        return (<AwesomeComponent/>);
    }

    renderError() {
        return (<div className="alert alert-warning"><strong>Error!</strong> {":'("/*this.props.error.message*/}</div>);
    }

    renderResult() {
        const {video_id, is_live} = this.props.data;
        return (
            <div>
                {is_live ? <p>Radio EfferalGang is live!</p> :
                    <p>Radio EfferalGang fait dodo, mais nos archives jamais</p>}
                <ReactPlayer url={`https://www.youtube.com/watch?v=${video_id}`} playing/>
            </div>
        );
    }

    render() {
        const {data, error} = this.props;

        if (data) {
            console.log("data: " + JSON.stringify(data));
            return this.renderResult();
        } else if (error) {
            return this.renderError();
        } else {
            return this.renderLoading();
        }
    }
}

class EfferalGangInfo extends React.Component {
    state = {
        data: null,
        error: null,
        loading: true
    };

    render() {
        return (
            <EfferalGangInfoView {...this.state} />
        );
    }

    componentDidMount() {

        this.interval = setInterval(() => this.getVideo(), 20000);

    }

    getVideo() {
        Api.getCurrentShowId()
            .then((data) => {
                console.log("data: " + JSON.stringify(data));
                const { video_id, is_live } = data;

                if (!this.state.data) {
                    // there is no state, so set the state to start playing a video
                    this.setState({data: {...data}});
                } else if (this.state.data.is_live && !is_live) {
                    // we've just switched from live to archive so update the state
                    this.setState({data: {...data}});
                } else if (!this.state.data.is_live && is_live) {
                    // we've just switched from archive to live
                    this.setState({data: {...data}});
                } else {
                    // if one live is being handed off to another
                    if (this.state.data.is_live && is_live && (this.state.data.video_id !== video_id)) {
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


export default EfferalGangInfo;
