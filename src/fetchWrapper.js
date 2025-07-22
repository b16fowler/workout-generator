export default class FetchWrapper {
  constructor(URL, new_username, new_password) {
    this.URL = URL;
    this.new_username = new_username;
    this.new_password = new_password;
  }

  async get(endpoint) {
    return fetch(this.URL + endpoint, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    }).then(res => res.json());
  }

  async post(endpoint, query) {
    return fetch(this.URL + endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    }).then(res => res.json());
  }
}
