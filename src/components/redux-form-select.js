
// outsource dependencies
import Select from 'react-select';
import React, { useCallback } from 'react';
import { Label, FormGroup, Badge } from 'reactstrap';

const ReactReduxSelect = ({ input, options, label, meta: { error, touched } }) => (
    <FormGroup>
        <Label>{label}</Label>
        <Select
            {...input}
            isClearable
            options={options}
            onBlur={useCallback(() => input.onBlur(input.value), [input])}
            onChange={useCallback(value => input.onChange(value), [input])}
        />
        {touched && error && <Badge color="danger">{error}</Badge>}
    </FormGroup>
)

export default ReactReduxSelect;
