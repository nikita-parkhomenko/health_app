
// outsource dependencies
import { Table } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { Container, Row, Col } from 'reactstrap';
import { Spinner, Alert, Button } from 'reactstrap';
import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, FormGroup, Form, Input } from 'reactstrap';

// local dependencies
import { TYPE } from './reducer';
import { selector as usersSelector } from './reducer';
import EditButton from '../../../components/edit-button';
import PaginationField from '../../../components/pagination';
import DeleteButton from '../../../components/delete-button';
import { sortUp, sortDown, search, plus } from '../../../assets/icons';

const CustomInput = ({ input, ...rest }) => (
    <FormGroup className="d-flex">
        <Input {...input} {...rest} />
    </FormGroup>
);

const FORM_NAME = 'searchUserForm';

const Users = ({ handleSubmit, pristine, reset, submitting }) => {
    const dispatch = useDispatch();
    const { users,
            initialized,
            disabled,
            errorMessage,
            sortNamesASC,
            sortIdASC,
            currentPage,
            totalPages,
    } = useSelector(usersSelector);

    const sortUsers = useCallback(event => {
        const sortBy = event.target.textContent;
        dispatch({ type: TYPE.SORT_USERS, payload: { sortBy } });
    }, [dispatch]);

    const nextPage = useCallback(pageNumber => {
        dispatch({ type: TYPE.NEXT_PAGE, payload: { pageNumber } });
    }, [dispatch]);

    const submit = useCallback(query => {
        const { searchUser } = query;
        dispatch({ type: TYPE.SEARCH_USERS, payload: { searchUser } });
    }, [dispatch]);

    useEffect(() => {
        dispatch({ type:TYPE.INITIALIZE });
        return () => dispatch({ type: TYPE.CLEAR })
    }, [dispatch]);

    if (!initialized) {
        return <div className="d-flex justify-content-center py-5">
            <Spinner style={{ width: '4rem', height: '4rem', color: 'blue' }} type="grow" />
        </div>
    }

    return (
        <Container className="py-3">
            <Row>
                <Col xs={12}>
                    <h3 className="my-3 text-primary">Users</h3>
                    { errorMessage && <Alert color="danger"> {errorMessage} </Alert> }
                </Col>
            </Row>
            <Row>
                <Col sm={8} className="d-flex align-items-center">
                    <Form className="d-flex" onSubmit={handleSubmit(submit)}>
                        <Button
                            className="align-self-center mb-3"
                            type="reset"
                            disabled={pristine || submitting}
                            onClick={reset}
                        >
                            X
                        </Button>
                        <Field
                            disabled={disabled}
                            type="text"
                            name='searchUser'
                            component={CustomInput}
                            placeholder='Search'
                        />
                        <Button
                            disabled={disabled}
                            className="align-self-center mb-3"
                            type="submit"
                            color="primary"
                        >
                            {search}
                        </Button>
                    </Form>
                </Col>
                <Col sm={3}>
                    <Button color="success">
                        {plus} Create User
                    </Button>
                </Col>
            </Row>
            <Table className='text-info mb-5' striped>
                <thead>
                <tr>
                    <th>
                        <Button
                            onClick={e => sortUsers(e)}
                            className="text-info py-0"
                            color="link"
                        >
                            { sortNamesASC ? sortDown : sortUp }
                            <span className="font-weight-bold">Name</span>
                        </Button>
                    </th>
                    <th className="pointer">
                        <Button
                            onClick={event => sortUsers(event)}
                            className="text-info py-0"
                            color="link"
                        >
                            { sortIdASC ? sortDown : sortUp }
                            <span className="font-weight-bold">Id</span>
                        </Button>
                    </th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.length &&
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td className="text-secondary">{user.id}</td>
                                <td>
                                    <Badge className='text-lowercase' color="danger">
                                        {user.roles[0].name}
                                    </Badge>
                                </td>
                                <td>
                                    <EditButton text="Edit"/>
                                    <DeleteButton text="Delete"/>
                                </td>
                            </tr>
                        ))
                }
                </tbody>
            </Table>
            {
                !users.length && (
                    <Alert color="secondary">
                        No known Users
                    </Alert>
                )
            }
            <PaginationField
                nextPage={nextPage}
                pages={totalPages}
                currentPage={currentPage}
            />
        </Container>
    )
}

export default reduxForm({
    form: FORM_NAME,
})(Users);
