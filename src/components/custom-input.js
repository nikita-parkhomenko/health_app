
// outsource dependencies
import React, { useMemo } from "react";
import { FormGroup, Label, Input, Badge } from 'reactstrap';

const CustomInput = ({ label, meta: { touched, error }, input, ...rest }) => {
    const valid = useMemo(() => touched && !error ? !error : null, [error, touched]);

    return (
        <FormGroup>
            <Label>{label}</Label>
            <Input valid={valid} {...input} {...rest} />
            {touched && error && <Badge color="danger">{error}</Badge>}
        </FormGroup>
    );
}

export default CustomInput;
