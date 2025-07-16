export default class FetchWrapper {
  constructor(URL, new_email, new_password) {
    this.URL = URL;
    this.new_email = new_email;
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

  async post(endpoint, new_email, new_password) {
    return fetch(this.URL + endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: this.new_email,
        password: this.new_password,
      }),
    }).then(res => res.json());
  }
}
