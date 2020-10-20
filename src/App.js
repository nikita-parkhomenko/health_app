
// outsource dependencies
import React from 'react';
import { ConnectedRouter } from 'connected-react-router';

// local dependencies
import Pages from './pages'
import { history } from './store/store';

function App() {
  return (
      <ConnectedRouter history={history}>
          <Pages />
      </ConnectedRouter>
  );
}

export default App;
