
// outsource dependencies
import React, { useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import ApiService from '../services/api-service';
import { Label, FormGroup, Badge } from 'reactstrap';

const ReactReduxAsyncSelect = ({ input, label, meta: { error, touched } }) => {
    const loadOptionsHandler = useCallback(name => ApiService.loadRoles(name), []);
    const blurHandler = useCallback(() => input.onBlur(input.value), [input]);

    return (
        <FormGroup>
            <Label>{label}</Label>
            <AsyncSelect
                isMulti
                {...input}
                isClearable
                defaultOptions
                value={input.value}
                onBlur={blurHandler}
                onChange={input.onChange}
                loadOptions={loadOptionsHandler}
                getOptionValue={option => option.name}
                getOptionLabel={option => option.name}
            />
            {touched && error && <Badge color="danger">{error}</Badge>}
        </FormGroup>
    );
}

export default ReactReduxAsyncSelect;

