
// outsource dependencies
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Container, Row, Col } from 'reactstrap';
import { Spinner, Button, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import { TYPE } from './reducer';
import { selector as userSelector } from './reducer';
import { selector as appSelector } from '../../../app-reducer';

const User = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector(appSelector);
    const { initialized, errorMessage } = useSelector(userSelector);

    useEffect(() => {
        dispatch({ type:TYPE.INITIALIZE });
        return () => dispatch({ type: TYPE.CLEAR })
    }, [dispatch]);

    const refreshUser = () => dispatch({ type: TYPE.REFRESH_USER });
    const pushToUsersPage = () => props.push('/users');

    if (!initialized) {
        return <div className="d-flex justify-content-center py-5">
            <Spinner style={{ width: '4rem', height: '4rem', color: 'blue' }} type="grow" />
        </div>
    }

    return (
        <Container className="py-3">
            <Row>
                <Col xs={6}>
                    <h3>User Cabinet</h3>
                    { errorMessage && <Alert color="danger"> {errorMessage} </Alert> }
                </Col>
                <Col xs={2}>
                    <Button onClick={refreshUser} color="success">
                        Refresh
                    </Button>
                </Col>
                <Col xs={4}>
                    <Button onClick={pushToUsersPage} color="primary">
                        Show all users
                    </Button>
                </Col>
            </Row>
            <Row>{JSON.stringify(user, null, 2)}</Row>
        </Container>
    )
}

export default  connect(null, { push })(User);
