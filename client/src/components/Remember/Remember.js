import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Button from '@material-ui/core/Button';
import InputForm from '../Forms/InputForm';
import Form from '../Forms/Form';
import withForm from '../Forms/Form/withForm';
import LoadingSmall from '../LoadingSmall';
import AuthServices from '../../services/AuthServices';
import imageLogo from '../../assets/images/logo.png';
import './styles.css';

class Remember extends Component {
  render() {
    return (
      <div className='Login'>
        <div className='Login__Wrapper'>
          <Form className='Login__Form' onSubmit={this.requestReset}>
            <img
              src={imageLogo}
              className='Login__Logo'
              alt='wallaclone-logo'
            />
            <InputForm
              name='email'
              type='email'
              placeholder='type your email'
              required
              icon={<PermIdentityIcon />}
            />
            <p className='Login__Help'>
              enter your email to restart your password
            </p>
            <div className='Login__Buttons'>
              <Button
                className='button'
                type='submit'
                variant='contained'
                color='primary'
              >
                {' '}
                Restart password{' '}
              </Button>
              <Link className='Login__Link' to='/login'>
                Go to login
              </Link>
            </div>
            {this.props.isFetching && (
              <LoadingSmall text={'authenticating...'} />
            )}
          </Form>
        </div>
      </div>
    );
  }

  requestReset = async (inputs) => {
    const { email } = { ...inputs };
    try {
      const user = await AuthServices.resetRequest(email);
      if (user) {
        this.props.enqueueSnackbar('Check your email to reset password', {
          variant: 'success',
        });
        this.props.history.push('/login');
      } else {
        this.props.enqueueSnackbar(
          'Error changing password, please try again later.',
          {
            variant: 'error',
          }
        );
      }
    } catch (error) {
      this.props.enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
}

export default withForm(Remember);
