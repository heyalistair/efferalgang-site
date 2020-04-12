class Api {

    API_URL = "https://alistairj.com/";

    getCurrentShowId() {

        return fetch(this.API_URL + "/live")
            .then(res => res.json());

    }

}

export default new Api();
