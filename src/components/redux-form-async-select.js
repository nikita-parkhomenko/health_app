
// outsource dependencies
import React from 'react';
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
            onBlur={() => input.onBlur(input.value)}
            loadOptions={name => ApiService.loadRoles(name)}
        />
        {touched && error && <Badge color="danger">{error}</Badge>}
    </FormGroup>
);

export default ReactReduxAsyncSelect;
