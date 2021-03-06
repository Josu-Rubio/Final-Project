import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import InputForm from '../Forms/InputForm';
import Form from '../Forms/Form';
import withForm from '../Forms/Form/withForm';
import UserServices from '../../services/UserServices';
import imageLogo from '../../assets/images/logo.png';
import './styles.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      created: false,
    };
  }

  render() {
    return (
      <div className='Login'>
        <div className='Login__Wrapper'>
          <Form className='Login__Form' onSubmit={this.createUser}>
            <img
              src={imageLogo}
              className='Login__Logo'
              alt='wallaclone-logo'
            />
            <InputForm
              name='name'
              type='name'
              placeholder='type your name'
              required
              icon={<PermIdentityIcon />}
            />
            <InputForm
              name='email'
              type='email'
              placeholder='type your email'
              required
              icon={<MailOutlineIcon />}
            />
            <InputForm
              name='password'
              type='password'
              placeholder='type your password'
              autocomplete='on'
              required
              icon={<LockOpenIcon />}
            />
            <InputForm
              name='password_2'
              type='password'
              placeholder='repeat your password'
              autocomplete='on'
              required
              icon={<LockOpenIcon />}
            />
            <p className='Login__Help'>enter your user information</p>
            <div className='Login__Buttons'>
              <Button
                className='button'
                type='submit'
                variant='contained'
                color='primary'
              >
                {' '}
                Create user{' '}
              </Button>
              <Link className='Login__Link' to='/login'>
                Go to login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }

  createUser = async (inputs) => {
    const { name, email, password, password_2 } = { ...inputs };
    if (password !== password_2) {
      this.props.enqueueSnackbar(`Password doesn't match`, {
        variant: 'error',
      });
    } else {
      try {
        const user = await UserServices.create(name, email, password);
        if (user) {
          this.props.enqueueSnackbar('User created successfully.', {
            // So far, is not necesary to check the email (doesn't work)
            variant: 'success',
          });
          this.props.history.push('/login');
        } else {
          this.props.enqueueSnackbar('Error creating user. Please try again.', {
            variant: 'error',
          });
        }
      } catch (error) {
        this.props.enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  };
}

export default withForm(Register);
