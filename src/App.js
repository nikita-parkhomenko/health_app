
// outsource dependencies
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

// local dependencies
import store from './store/store';
import Pages from './pages'

function App() {
  return (
      <BrowserRouter>
        <Provider store={store}>
            <Pages />
        </Provider>
      </BrowserRouter>
  );
}

export default App;
