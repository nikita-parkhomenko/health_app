
// outsource dependencies
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {Spinner, Button, Alert} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import { TYPE } from './reducer';
import { selector as userSelector } from './reducer';
import { selector as appSelector } from '../../../app-reducer';

const User = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(appSelector);
    const { initialized, errorMessage } = useSelector(userSelector);

    useEffect(() => {
        dispatch({ type:TYPE.INITIALIZE });
        return () => dispatch({ type: TYPE.CLEAR })
    }, [dispatch]);

    const refreshUser = () => dispatch({ type: TYPE.REFRESH_USER });

    if (!initialized) {
        return <div className="d-flex justify-content-center py-5">
            <Spinner style={{ width: '4rem', height: '4rem', color: 'blue' }} type="grow" />
        </div>
    }

    return (
        <Container className="py-3">
            <Row>
                <Col>
                    <h3>User Cabinet</h3>
                    { errorMessage && <Alert color="danger"> {errorMessage} </Alert> }
                </Col>
                <Col>
                    <Button onClick={refreshUser} color="success">
                        Refresh
                    </Button>
                </Col>
            </Row>
            <Row>{JSON.stringify(user, null, 2)}</Row>
        </Container>
    )
}

export default User;
