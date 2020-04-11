class Api {

    getCurrentShowId() {

        return fetch('http://127.0.0.1:8080/live')
            .then(res => res.json());

    }

}

export default new Api();
