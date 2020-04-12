class Api {

    API_URL = "http://134.122.54.81:8080";

    getCurrentShowId() {

        return fetch(this.API_URL + "/live")
            .then(res => res.json());

    }

}

export default new Api();
