
// outsource dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import { Alert, Container } from 'reactstrap';
import { ConnectedRouter } from 'connected-react-router';

// local dependencies
import Pages from './pages'
import { history } from './store/store';
import { selector as appSelector } from './app-reducer';

function App() {
    const { errorMessage } = useSelector(appSelector);

    return (
        <ConnectedRouter history={history}>
            <Container>
                { errorMessage && <Alert color="danger"> {errorMessage} </Alert> }
            </Container>
            <Pages />
        </ConnectedRouter>
    );
}

export default App;
