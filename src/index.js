import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TodoEdit from './components/TodoEdit';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      getState={state => state.toastr} // This is the default
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />

    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/edit-todo/:id" component={TodoEdit} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
