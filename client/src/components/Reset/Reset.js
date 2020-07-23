import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import InputForm from '../Forms/InputForm';
import Form from '../Forms/Form';
import withForm from '../Forms/Form/withForm';
import AuthServices from '../../services/AuthServices';
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
          <Form className='Login__Form' onSubmit={this.resetPassword}>
            <img
              src={imageLogo}
              className='Login__Logo'
              alt='wallaclone-logo'
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
            <p className='Login__Help'>enter your new password</p>
            <div className='Login__Buttons'>
              <Button
                className='button'
                type='submit'
                variant='contained'
                color='primary'
              >
                {' '}
                Reset password{' '}
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

  resetPassword = async (inputs) => {
    const { password, password_2 } = { ...inputs };
    if (password !== password_2) {
      this.props.enqueueSnackbar('Password does not match.', {
        variant: 'error',
      });
    } else {
      try {
        const user = await AuthServices.reset(
          this.props.match.params.token,
          password
        );
        if (user) {
          this.props.enqueueSnackbar('Reset password success.', {
            variant: 'success',
          });
        } else {
          this.props.enqueueSnackbar(
            'Error reseting password, please try again later.',
            { variant: 'error' }
          );
        }
      } catch (error) {
        this.props.enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        this.props.history.push('/login');
      }
    }
  };
}

export default withForm(Register);
