
// outsource dependencies
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

// local dependencies
import { selector as appSelector } from '../app-reducer'

const Header = () => {
    const { user } = useSelector(appSelector);

    return (
        <Container className="bg-primary d-flex justify-content-center" fluid={true}>
            <Col sm={10} >
                <Row className="d-flex justify-content-end">
                    <h5 className='text-white p-3'>{user.name}</h5>
                    <img
                        src={user.coverImage.url}
                        alt="user"
                        className="align-self-center"
                        style={{ width: '50px', height: '50px', borderRadius: '50%'}}
                    />
                </Row>
            </Col>
        </Container>
    )
}

export default Header;
