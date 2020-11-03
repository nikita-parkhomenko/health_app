
// outsource dependencies
import React, { useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import ApiService from '../services/api-service';
import { Label, FormGroup, Badge } from 'reactstrap';

const ReactReduxAsyncSelect = ({ input, label, meta: { error, touched } }) => (
    <FormGroup>
        <Label>{label}</Label>
        <AsyncSelect
            isMulti
            {...input}
            isClearable
            defaultOptions
            value={input.value}
            onChange={input.onChange}
            onBlur={useCallback(() => input.onBlur(input.value), [input])}
            loadOptions={useCallback(name => ApiService.loadRoles(name), [])}
        />
        {touched && error && <Badge color="danger">{error}</Badge>}
    </FormGroup>
);

export default ReactReduxAsyncSelect;

