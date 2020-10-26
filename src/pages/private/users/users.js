
// outsource dependencies
import { Table } from 'reactstrap';
import { Badge, Form, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Spinner, Alert, Button } from 'reactstrap';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, InputGroupAddon } from 'reactstrap';

// local dependencies
import { TYPE } from './reducer';
import { selector as usersSelector } from './reducer';
import ActionButton from '../../../components/action-button';
import PaginationField from '../../../components/pagination';
import CustomButton from '../../../components/custom-button';
import { search, plus, deleteIcon, editIcon } from '../../../assets/icons';

const Users = () => {
    const dispatch = useDispatch();
    const { users,
            initialized,
            disabled,
            errorMessage,
            sortASC,
            page,
            name,
            totalPages,
    } = useSelector(usersSelector);

    const searchByName = useCallback(event => {
        event.preventDefault();
        dispatch({ type: TYPE.FILTER_USERS, payload: { name, page: 0 } });
    }, [dispatch, name]);

    const nextPage = useCallback(setPage => {
        dispatch({ type: TYPE.FILTER_USERS, payload: { page: setPage } });
    }, [dispatch]);

    const sortUsers = useCallback(event => {
        const sort = event.target.textContent.toLowerCase();
        dispatch({ type: TYPE.FILTER_USERS, payload: { sort, sortASC: !sortASC } });
    }, [dispatch, sortASC]);

    const changeSearchFieldHandler = useCallback(event => {
        const name = event.target.value.trimLeft();
        dispatch({ type: TYPE.META, payload: { name } });
    }, [dispatch]);

    const clearName = useCallback(() => {
        dispatch({ type: TYPE.FILTER_USERS, payload: { name: '' } })
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
                <Col sm={8} className="d-flex align-items-center mb-3">
                    <Form className="d-flex" onSubmit={event => searchByName(event)}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                {
                                    name.length > 0 && <Button
                                        type="reset"
                                        color="danger"
                                        disabled={disabled}
                                        onClick={clearName}
                                    >
                                        X
                                    </Button>
                                }
                            </InputGroupAddon>
                            <Input
                                placeholder="Search"
                                type="text"
                                disabled={disabled}
                                value={name}
                                name='searchUser'
                                onChange={event => changeSearchFieldHandler(event)}
                            />
                            <InputGroupAddon addonType="append">
                                <Button
                                    color="primary"
                                    type="submit"
                                    disabled={disabled}
                                >
                                    {search} Search
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Form>
                </Col>
                <Col sm={3}>
                    <Button
                        color="success"
                        disabled={disabled}
                    >
                        {plus} Create User
                    </Button>
                </Col>
            </Row>
            <Table className='text-info mb-5' striped>
                <thead>
                <tr>
                    <th>
                        <CustomButton
                            sortUsers={sortUsers}
                            filterName="Name"
                        />
                    </th>
                    <th className="pointer">
                        <CustomButton
                            sortUsers={sortUsers}
                            filterName="Id"
                        />
                    </th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.length !== 0 ?
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
                                    <ActionButton
                                        text="Edit"
                                        icon={editIcon}
                                        disabled={disabled}
                                    />
                                    <ActionButton
                                        text="Delete"
                                        icon={deleteIcon}
                                        disabled={disabled}
                                    />
                                </td>
                            </tr>
                        ))
                        : []
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
                currentPage={page}
            />
        </Container>
    )
}

export default Users;
