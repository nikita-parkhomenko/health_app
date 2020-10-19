
// outsource dependencies
import React, { useEffect } from "react";
import { Spinner, Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import {TYPE} from './reducer';
import {userState} from './reducer';
import {appState} from '../../../app-reducer';

const User = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(appState);
    const { initialized } = useSelector(userState);

    useEffect(() => {
        dispatch({type:TYPE.INITIALIZE});
        return () => dispatch({type: TYPE.CLEAR})
    }, [dispatch]);

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
                </Col>
                <Col>
                    <Button color="success">Refresh</Button>
                </Col>
            </Row>
            <Row>{JSON.stringify(user, null, 2)}</Row>
        </Container>
    )
}

export default User;
