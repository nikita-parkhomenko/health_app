
// outsource dependencies
import Select from 'react-select';
import React, { useCallback } from 'react';
import { Label, FormGroup, Badge } from 'reactstrap';

const ReactReduxSelect = ({ input, options, label, meta: { error, touched } }) => {
    const changeHandler = useCallback(value => input.onChange(value), [input]);
    const blurHandler = useCallback(() => input.onBlur(input.value), [input]);

    return (
        <FormGroup>
            <Label>{label}</Label>
            <Select
                {...input}
                isClearable
                options={options}
                onBlur={blurHandler}
                onChange={changeHandler}
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
            />
            {touched && error && <Badge color="danger">{error}</Badge>}
        </FormGroup>
    )
}

export default ReactReduxSelect;
