
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
import Paginate from '../../../components/pagination';
import { selector as usersSelector } from './reducer';
import ActionButton from '../../../components/action-button';
import CustomButton from '../../../components/custom-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt,
    faPlus,
    faSearch,
    faTimes,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

const insteadEvent = cb => e => e.preventDefault() || cb(e);

const Users = () => {
    const dispatch = useDispatch();
    const { items,
            initialized,
            disabled,
            errorMessage,
            sortASC,
            page,
            name,
            totalElements,
    } = useSelector(usersSelector);

    const searchByName = useCallback(() => {
        dispatch({ type: TYPE.FILTER_ITEMS, payload: { name, page: 0 } });
    }, [dispatch, name]);

    const onChangePage = useCallback(page => dispatch({
        type: TYPE.FILTER_ITEMS, payload: { page }
    }), [dispatch]);

    const sortUsers = useCallback(name => {
        dispatch({ type: TYPE.FILTER_ITEMS, payload: { sort: name, sortASC: !sortASC } });
    }, [dispatch, sortASC]);

    const changeSearchFieldHandler = useCallback(value => {
        dispatch({ type: TYPE.META, payload: { name: value.trimLeft() } });
    }, [dispatch]);

    const clearName = useCallback(() => {
        dispatch({ type: TYPE.FILTER_ITEMS, payload: { name: '' } })
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
                    <Form className="d-flex" onSubmit={insteadEvent(searchByName)}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                {
                                    name.length > 0 && <Button
                                        type="reset"
                                        color="danger"
                                        disabled={disabled}
                                        onClick={clearName}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                }
                            </InputGroupAddon>
                            <Input
                                placeholder="Search"
                                type="text"
                                disabled={disabled}
                                value={name}
                                name="searchUser"
                                onChange={event => changeSearchFieldHandler(event.target.value)}
                            />
                            <InputGroupAddon addonType="append">
                                <Button
                                    color="primary"
                                    type="button"
                                    disabled={disabled}
                                    onClick={searchByName}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
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
                        <FontAwesomeIcon
                            transform="left-5"
                            icon={faPlus}
                        />
                        Create User
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
                            name="name"
                        />
                    </th>
                    <th className="pointer">
                        <CustomButton
                            sortUsers={sortUsers}
                            filterName="Id"
                            name="id"
                        />
                    </th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    items.length !== 0 ?
                        items.map((user) => (
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
                                        disabled={disabled}
                                        icon={<FontAwesomeIcon transform="left-3" icon={faPencilAlt} />}
                                    />
                                    <ActionButton
                                        text="Delete"
                                        icon={<FontAwesomeIcon transform="left-3" icon={faTrashAlt} />}
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
                !items.length && (
                    <Alert color="secondary">
                        No known Users
                    </Alert>
                )
            }
            <Row>
                <Col className="d-flex justify-content-center" sm={12}>
                    <Paginate
                        activePage={page}
                        onChange={onChangePage}
                        totalItemsCount={totalElements}
                        itemsPerPage={20}
                        displayedPages={5}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Users;
