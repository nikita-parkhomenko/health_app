
// outsource dependencies
import React, { useEffect } from 'react';
import { Alert, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

// local dependencies
import Pages from './pages'
import { TYPE } from './app-reducer';
import { history } from './store/store';
import { selector as appSelector } from './app-reducer';

function App() {
    const dispatch = useDispatch();
    const { errorMessage } = useSelector(appSelector);

    useEffect(() => {
        dispatch({ type: TYPE.INITIALIZE });
        return () => dispatch({ type: TYPE.CLEAR })
    }, [dispatch]);

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
