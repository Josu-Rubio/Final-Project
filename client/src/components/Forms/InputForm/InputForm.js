import React, { useContext } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { Context } from '../Form';

export default function InputForm(props) {
  const context = useContext(Context);

  return (
    <FormControl>
      <Input
        name={props.name}
        value={context.inputs[props.name] || ''}
        onChange={context.handleInputChange}
        type={props.type}
        placeholder={props.placeholder}
        startAdornment={
          <InputAdornment position='start' className='InputIcon__Icon'>
            {props.icon}
          </InputAdornment>
        }
        endAdornment={props.endAdornment}
        required={props.required}
      />
    </FormControl>
  );
}
