class Store {
  
  constructor(rootReduceer) {
    this.rootReducer = rootReducer;
    this.state = {};
    this.getState = this.getState.bind(this);
    this.subscriptions = [];
  }

  getState() {
    return Object.assign({}, this.state);
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action);
  }

  subscribe(cb) {
    this.subscriptions.push(cb);
  }
}

const createStore = (...args) => new Store(...args);

const combineReducers = config => {
  return (prevState, action) => {
    const nextState = {};
    Object.keys(config).forEach(k => {
      if (!action) {
        nextState[k] = config[k](...args);
      } else {
        nextState[k] = config[k](prevState[k], action);
      }
    });
    return nextState;
  }
}

