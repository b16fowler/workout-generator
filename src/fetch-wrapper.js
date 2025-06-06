/**************************************************************************
 * fetch-wrapper class
 **************************************************************************/

export default class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(endpoint) {
    return fetch(this.baseURL + endpoint).then((response) => response);
  }
}
