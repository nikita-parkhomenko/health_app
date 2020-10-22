
// outsource dependencies
import { Alert } from 'reactstrap';
import { Spinner } from 'reactstrap';
import { Button, Form } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { Container, Row, Col } from 'reactstrap';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// local dependencies
import { TYPE } from './reducer';
import { selector as logInSelector } from './reducer';
import CustomInput from '../../../components/custom-input';
import ValidationService from '../../../services/validation-service';

const FORM_NAME = 'logInForm';

const validate = ({ username, password }) => {
    const errors = {};

    if (!ValidationService.isValidEmail(username)) {
        errors.username =  'You have entered an invalid email address!';
    }

    if (!ValidationService.isValidPassword(password)) {
        errors.password = 'You have entered an invalid password!'
    }

    return errors;
}

const LogIn = ({ handleSubmit }) => {
    const dispatch = useDispatch();
    const { disabled, initialized, errorMessage } = useSelector(logInSelector);

    useEffect(() => {
        dispatch({ type: TYPE.INITIALIZE });
        return () => dispatch({ type: TYPE.CLEAR });
    }, [dispatch]);

    const submit = useCallback(payload => {
        dispatch({ type: TYPE.LOG_IN, payload })
    }, [dispatch]);

    if (!initialized) {
        return <div className="d-flex justify-content-center py-5">
            <Spinner style={{ width: '4rem', height: '4rem', color: 'blue' }} type="grow" />
        </div>
    }

    return (
        <Container className="bg-primary text-white py-4">
            <Row>
                <Col xs={12} tag="h2" className="text-center">
                    Sign In
                </Col>
            </Row>
            { errorMessage && <Alert color="danger"> {errorMessage} </Alert> }
            <Row className="d-flex justify-content-center">
                <Col md="8" lg="6" >
                    <Form onSubmit={handleSubmit(submit)} className="pb-4">
                        <Field
                            type="email"
                            name="username"
                            label="Your email"
                            component={CustomInput}
                            placeholder="Enter your email..."
                        />

                        <Field
                            name="password"
                            type="password"
                            label="Your password"
                            component={CustomInput}
                            placeholder="Enter your password..."
                        />

                        <Button disabled={disabled} type="submit" color="warning">Log In</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default reduxForm({
    form: FORM_NAME,
    validate,
})(LogIn);
