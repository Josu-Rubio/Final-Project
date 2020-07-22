import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import InputForm from '../Forms/InputForm';
import Form from '../Forms/Form';
import withForm from '../Forms/Form/withForm';
import LoadingSmall from '../LoadingSmall';
import LocalStorage from '../../utils/Storage';
import AuthServices from '../../services/AuthServices';
import imageLogo from '../../assets/images/logo2.png';
import './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    if (this.props.match.params.token) {
      AuthServices.activate(this.props.match.params.token)
        .then((result) => {
          this.props.enqueueSnackbar(result.data.description, {
            variant: 'success',
          });
        })
        .catch((error) => {
          this.props.enqueueSnackbar(error.response.data.data, {
            variant: 'error',
          });
        });
    }
  }

  render() {
    return (
      <div className='Login'>
        <div className='Login__Wrapper'>
          <Form className='Login__Form' onSubmit={this.login}>
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
            <p className='Login__Help'>enter your credentials to login</p>
            <div className='Login__Buttons'>
              <Button
                className='button'
                type='submit'
                variant='contained'
                color='primary'
              >
                {' '}
                Login{' '}
              </Button>
              <Button
                className='button'
                variant='contained'
                color='secondary'
                onClick={() => this.props.history.push('/remember')}
              >
                {' '}
                Remember password
              </Button>
              <Link className='Login__Link' to='/register'>
                Create an account
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

  componentDidUpdate() {
    if (this.props.error) {
      this.props.enqueueSnackbar(this.props.error, { variant: 'error' });
    } else if (this.props.session) {
      LocalStorage.saveLocalStorage(this.props.session);
      this.props.history.push('/');
    }
  }

  login = (inputs) => {
    const { email, password } = { ...inputs };
    if (!email || !password) {
      this.props.enqueueSnackbar('Rellene todos los campos del formulario', {
        variant: 'error',
      });
      return;
    }
    this.props.login(email, password);
  };
}

export default withForm(Login);
