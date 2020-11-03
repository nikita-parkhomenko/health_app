
// outsource dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {Container, Row, Col, Spinner} from 'reactstrap';
import { Card, Button, CardHeader, Form, CardBody } from 'reactstrap';

// local dependencies
import { TYPE } from './reducer';
import CustomInput from '../../../components/custom-input';
import { selector as createUserSelector } from './reducer';
import ReduxFormSelect from '../../../components/redux-form-select';
import ValidationService from '../../../services/validation-service';
import ReactReduxAsyncSelect from '../../../components/redux-form-async-select';

const FORM_NAME = 'createUserName';
const suffixOptions = [
    { value: 'Jr.', label: 'Jr.' },
    { value: 'Sr.', label: 'Sr.' },
    { value: '2nd', label: '2nd' },
]

const validate = values => {
    const errors = {};

    if (!ValidationService.isValidEmail(values.email)) {
        errors.email = 'Enter valid email'
    }

    if (!ValidationService.isValidName(values.firstName)) {
        errors.firstName = 'Enter valid Name'
    }

    if (!ValidationService.isValidName(values.middleName)) {
        errors.middleName = 'Enter valid Middle Name'
    }

    if (!ValidationService.isValidName(values.lastName)) {
        errors.lastName = 'Enter valid Last Name'
    }

    if (values.suffix === undefined) {
        errors.suffix = 'Required'
    }

    if (values.roles === undefined) {
        errors.roles = 'Required'
    }

    return errors;
}

const CreateUser = ({ handleSubmit }) => {
    const dispatch = useDispatch();
    const { disabled, initialized } = useSelector(createUserSelector);

    useEffect(() => {
        dispatch({ type: TYPE.INITIALIZE });
        return () => dispatch({ type: TYPE.CLEAR });
    }, [dispatch]);

    const submit = payload => {
        dispatch({ type: TYPE.CREATE_USER, payload });
    }

    if (!initialized) {
        return <div className="d-flex justify-content-center py-5">
            <Spinner style={{ width: '4rem', height: '4rem', color: 'blue' }} type="grow" />
        </div>
    }

    return (
        <Container>
            <Row>
                <Col sm={10}>
                    <h1 className="text-info my-2">User</h1>
                    <Form onSubmit={handleSubmit(submit)}>
                        <Card className="my-2">
                            <CardHeader className="text-info font-weight-bold">
                                Main
                            </CardHeader>
                            <CardBody>
                                <Field
                                    type="text"
                                    name="firstName"
                                    component={CustomInput}
                                    placeholder="First Name"
                                    label={<strong className="required-asterisk"> First Name </strong>}
                                />
                                <Field
                                    type="text"
                                    name="middleName"
                                    component={CustomInput}
                                    placeholder="Middle Name"
                                    label={<strong className="required-asterisk"> Middle Name </strong>}
                                />
                                <Field
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    component={CustomInput}
                                    label={<strong className="required-asterisk"> Last Name </strong>}
                                />
                                <Field
                                    name="suffix"
                                    options={suffixOptions}
                                    component={ReduxFormSelect}
                                    label={<strong className="required-asterisk"> Suffix </strong>}
                                />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader className="text-info font-weight-bold">
                                Role
                            </CardHeader>
                            <CardBody>
                                <Field
                                    name="roles"
                                    component={ReactReduxAsyncSelect}
                                    label={<strong className="required-asterisk"> Chose your roles </strong>}
                                />
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    component={CustomInput}
                                    label={<strong className="required-asterisk"> Email </strong>}
                                />
                            </CardBody>
                        </Card>
                        <Button
                            type="submit"
                            color="success"
                            className="my-2"
                            disabled={disabled}
                            onClick={handleSubmit(submit)}
                        >
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default reduxForm({
    form: FORM_NAME,
    validate,
})(CreateUser);
