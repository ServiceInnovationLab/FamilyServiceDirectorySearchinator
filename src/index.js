// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HashRouter, Route, Switch } from 'react-router-dom';

// Styles
import './styles/index.css';

// Local components
import AppCon from './container/app-container';
import ServiceInfo from './components/Service/ServiceInfo';
import Footer from './components/Templates/Footer';

// Data
import reducers from './reducers/index';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1 className="container-fluid">Find Whānau Support - Mobile Site</h1>

          <Switch>
            <Route exact path="/" component={AppCon} />
            <Route path="/category/:category" component={AppCon} />
            <Route path="/service/:name" component={ServiceInfo} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
ReactDOM.render(<Footer />, document.getElementById('footer'));
