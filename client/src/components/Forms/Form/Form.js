import React from 'react';
import './styles.css';

import withForm from './withForm';

const Form = ({ children, ...props }) => <form {...props}>{children}</form>;

export default withForm(Form);
