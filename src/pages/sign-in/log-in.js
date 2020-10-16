
// outsource dependencies
import React, { useEffect } from "react";
import { Button, Form } from 'reactstrap';
import { reduxForm, Field } from "redux-form";
import { Container, Row, Col } from 'reactstrap';
import { useDispatch } from 'react-redux';


// local dependencies
import TYPE from './actions';
import CustomInput from '../../components/custom-input';
import ValidationService from '../../services/validation-service';

const LOG_IN_FORM = 'logInForm';

const validate = ({ email, password }) => {
    const errors = {};

    // if (!ValidationService.isValidEmail(email)) {
    //     errors.email =  'You have entered an invalid email address!';
    // }
    //
    // if (!ValidationService.isValidPassword(password)) {
    //     errors.password = 'You have entered an invalid password!'
    // }

    return errors;
}

const LogIn = ({ handleSubmit }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('initialized')
        dispatch({ type: TYPE.INITIALIZE })
    }, [dispatch])

    const submit = ({ password, email }) => {
        const user = {
            client: 'admin_application',
            password,
            username: email,
        }

        console.log(user)
        dispatch({ type: TYPE.FETCH_TOKEN, payload: { user } })
    }

    return (
        <Container className="bg-primary text-white py-4">
            <Row>
                <Col xs={12} tag="h2" className="text-center">
                    Sign In
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col md="8" lg="6" >
                    <Form onSubmit={handleSubmit(submit)} className="pb-4">
                        <Field
                            type="email"
                            name="email"
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

                        <Button type="submit" color="warning">Log In</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default reduxForm({
    form: LOG_IN_FORM,
    validate,
})(LogIn);
