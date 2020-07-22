import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Session from '../../models/Session';
import LocalStorage from '../../utils/Storage';
import imageImg from '../../assets/images/user.png';
import './styles.css';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.session.email,
      name: this.props.session.name,
      surname: this.props.session.surname,
      maxProducts: this.props.session.maxProducts,
    };
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <main className='Main__Section'>
            <div className='Section__Title'>
              <h2>Perfil de usuario</h2>
            </div>
            <form
              onSubmit={this.handleSubmit}
              noValidate
              autoComplete='off'
              className='Profile__Form'
            >
              <div className='Profile_Picture'>
                <img src={imageImg} alt='user_avatar' />
              </div>
              <FormControl fullWidth className='Profile__FormControl'>
                <InputLabel shrink htmlFor='type'>
                  Nombre
                </InputLabel>
                <Input
                  name='name'
                  value={this.state.name}
                  onChange={this.handleChange}
                  type='text'
                  required
                />
              </FormControl>
              <FormControl fullWidth className='Profile__FormControl'>
                <InputLabel shrink htmlFor='type'>
                  Apellido
                </InputLabel>
                <Input
                  name='surname'
                  value={this.state.surname}
                  onChange={this.handleChange}
                  type='text'
                  required
                />
              </FormControl>
              <FormControl fullWidth className='Profile__FormControl'>
                <InputLabel shrink htmlFor='type'>
                  Email
                </InputLabel>
                <Input
                  name='email'
                  value={this.state.email}
                  onChange={this.handleChange}
                  type='email'
                  required
                />
              </FormControl>
              <FormControl fullWidth className='Profile__FormControl'>
                <InputLabel htmlFor='maxProducts'>
                  Anuncios por página (Home)
                </InputLabel>
                <Input
                  name='maxProducts'
                  type='number'
                  value={this.state.maxProducts}
                  onChange={this.handleChange}
                  min={1}
                  max={20}
                  required
                />
              </FormControl>
              <div className='Profile__Footer'>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  startIcon={<SaveIcon />}
                  className='ButtonWallaclone ButtonWallaclone__Green'
                >
                  Guardar
                </Button>
                <Button
                  type='button'
                  variant='contained'
                  color='secondary'
                  onClick={this.handleReset}
                  startIcon={<DeleteIcon />}
                  to='/login'
                  component={Link}
                >
                  Borrar
                </Button>
              </div>
            </form>
          </main>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { email, name, surname, maxProducts } = this.state;
    const session = new Session(email, name, surname, maxProducts);
    LocalStorage.saveLocalStorage(session);
    this.props.enqueueSnackbar('Local storage updated.', {
      variant: 'success',
    });
    this.props.history.push('/');
    this.props.editSession(session);
  };

  handleReset = () => {
    LocalStorage.cleanLocalStorage();
    this.props.logout();
  };
}

Profile.propTypes = {
  tags: PropTypes.array,
  session: PropTypes.object,
  editSession: PropTypes.func,
  logout: PropTypes.func,
};
