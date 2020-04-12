class Api {

    API_URL = "https://64.225.81.86:8080";

    getCurrentShowId() {

        return fetch(this.API_URL + "/live")
            .then(res => res.json());

    }

}

export default new Api();
