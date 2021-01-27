class Store {
  constructor (rootReduceer) {
    this.rootReducer = rootReducer;
    this.state = {};
  }

  getState () {
    return Object.assign({}, this.state);
  }
}