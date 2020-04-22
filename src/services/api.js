class Api {

    // API_URL = "https://alistairj.com";
    API_URL = "http://localhost:8080";

    getCurrentShowId() {

        return fetch(this.API_URL + "/live")
            .then(res => res.json());

    }

}

export default new Api();
