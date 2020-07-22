import React, { useContext } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Context } from '../Form';

export default function CheckForm(props) {
  const context = useContext(Context);

  return (
    <FormControlLabel
      name={props.name}
      label={props.label}
      control={
        <Checkbox
          color={props.color}
          checked={context.inputs[props.name] || false}
          onChange={context.handleCheckChange}
        />
      }
    />
  );
}
