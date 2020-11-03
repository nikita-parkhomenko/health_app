
// outsource dependencies
import React from 'react';
import Select from 'react-select';
import { Label, FormGroup, Badge } from 'reactstrap';

const ReactReduxSelect = ({ input, options, label, meta: { error, touched } }) => (
    <FormGroup>
        <Label>{label}</Label>
        <Select
            {...input}
            isClearable
            options={options}
            onBlur={() => input.onBlur(input.value)}
            onChange={value => input.onChange(value)}
        />
        {touched && error && <Badge color="danger">{error}</Badge>}
    </FormGroup>
)

export default ReactReduxSelect;
