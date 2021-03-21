class Api {

    API_URL = "https://alistairj.com/status";
    // API_URL = "http://localhost:8080";

    getPlayerInfo() {

        return fetch(this.API_URL + "/live")
            .then(res => res.json());

    }

    trackNewVideoId(videoId) {

        return fetch(this.API_URL + "/track?video_id=" + videoId, {
                method: 'POST'
            })
            .then(res => res.json());

    }

}

export default new Api();
