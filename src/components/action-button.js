
// outsource dependencies
import React from 'react';
import { Button } from 'reactstrap';

const ActionButton = ({ text, icon, disabled }) => (
    <Button
        color="link"
        disabled={disabled}
        className="text-info p-0 pr-2"
    >
        {icon}
        {text}
    </Button>
);

export default ActionButton;
