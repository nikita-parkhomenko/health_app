
// outsource dependencies
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import ApiService from '../services/api-service';
import { Label, FormGroup, Badge } from 'reactstrap';

export const getOptionName = option => option.name;

const ReactReduxAsyncSelect = ({ input, label, getOptionValue, getOptionLabel, meta: { error, touched } }) => {
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
                getOptionValue={getOptionValue}
                getOptionLabel={getOptionLabel}
                loadOptions={loadOptionsHandler}
            />
            {touched && error && <Badge color="danger">{error}</Badge>}
        </FormGroup>
    );
}

ReactReduxAsyncSelect.propTypes = {
    getOptionValue: PropTypes.func.isRequired,
    getOptionLabel: PropTypes.func.isRequired,
}

export default ReactReduxAsyncSelect;

