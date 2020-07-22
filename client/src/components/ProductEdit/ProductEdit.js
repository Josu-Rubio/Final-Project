// NPM Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Material UI
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// Components
import NavBar from '../NavBar';
import Footer from '../Footer';
import Loading from '../Loading';
import Error from '../Error';
// Models
import Product from '../../models/Product';
// Assets
import imageImg from '../../assets/images/photo.png';
// CSS
import './styles.css';

/**
 * Main App
 */
export default class ProductEdit extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.inputFile = React.createRef();
    this.state = {
      imgTemp: '',
      submit: false,
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    // En caso de ser una modificación cargo el anuncio a editar (para tener la versión más actualizada posible desde el backend)
    if (this.props.mode === 'edit' && this.props.match.params) {
      const slug = this.props.match.params.slug;
      this.props.loadProduct(slug);
    } else {
      this.props.clearProduct();
    }
  }

  /**
   * Cuando el componente se actualiza
   */
  componentDidUpdate() {
    const { mode } = this.props;
    // Para solucionar el caso en el que estando ya en editar, el usuario navega a crear. Al estar ambas opciones en el mismo componente, el flujo
    // de react no pasa por el component did mount, y en ese caso el formulario aun estando en opción crear, mostraría los datos del anterior anuncio.
    // Con este if, y llamando al clear del store, consigo vaciar el anuncio del store, y con ello del form.
    if (mode === 'create' && this.props.product._id !== '') {
      this.props.clearProduct();
    }
    // Si se ha intentado guardar los cambios, y la operación ha concluido
    if (this.state.submit && this.props.ui.isUpdating === false) {
      if (!this.props.ui.error) {
        this.props.enqueueSnackbar(
          `OK. Anuncio ${mode === 'edit' ? 'editado' : 'creado'} con exito.`,
          { variant: 'success' }
        );
        this.props.history.push('/');
      } else if (this.props.ui.error)
        this.props.enqueueSnackbar(
          `Error ${mode === 'edit' ? 'editando' : 'creando'} anuncio: ${
            this.props.ui.error
          }`,
          { variant: 'error' }
        );
      // Evento reportado
      this.setState({ submit: false });
    }
  }

  /**
   * Open input file
   */
  openInputFile = () => {
    this.inputFile.current.click();
  };

  /**
   * Hanle close modal
   */
  changeInputFile = (ev) => {
    // Actualizo la imagen y cierro el modal
    ev.stopPropagation();
    ev.preventDefault();
    const aux = this.props.product;
    aux.file = ev.target.files[0];
    // Update state product
    this.setState({
      product: aux,
      imgTemp: URL.createObjectURL(aux.file),
    });
  };

  /**
   * Render
   */
  render() {
    const { isUpdating, isFetching, error } = this.props.ui;
    const { mode } = this.props;
    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <main className='Main__Section'>
            {this.props.product && (
              <form
                onSubmit={this.handleSubmit}
                noValidate
                autoComplete='off'
                className='ProductEdit__Form'
              >
                <input
                  type='file'
                  id='file'
                  ref={this.inputFile}
                  style={{ display: 'none' }}
                  onChange={this.changeInputFile}
                />
                <button
                  type='button'
                  className='ProductEdit_Picture'
                  onClick={this.openInputFile}
                >
                  <img
                    src={
                      this.props.product.img || this.state.imgTemp || imageImg
                    }
                    alt='dummy_img'
                  />
                </button>
                <FormControl fullWidth className='ProductEdit__FormControl'>
                  <InputLabel shrink htmlFor='type'>
                    Nombre
                  </InputLabel>
                  <Input
                    name='name'
                    value={this.props.product.name}
                    onChange={this.handleChange('name')}
                    type='text'
                    required
                  />
                </FormControl>
                <FormControl fullWidth className='ProductEdit__FormControl'>
                  <InputLabel shrink htmlFor='type'>
                    Tipo
                  </InputLabel>
                  <Select
                    name='type'
                    onChange={this.handleChange('type')}
                    className='SearchPanel__Type'
                    value={this.props.product.type}
                    displayEmpty
                  >
                    <MenuItem key='buy' value='buy'>
                      <Chip
                        size='small'
                        label='buy'
                        className='Ad__Tag Ad__Tag--small Ad__Tag--buy'
                      />
                    </MenuItem>
                    <MenuItem key='sell' value='sell'>
                      <Chip
                        size='small'
                        label='sell'
                        className='Ad__Tag Ad__Tag--small Ad__Tag--sell'
                      />
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth className='ProductEdit__FormControl'>
                  <InputLabel shrink htmlFor='tags'>
                    Tags
                  </InputLabel>
                  <Select
                    multiple
                    name='tags'
                    value={this.props.product.tags || ''}
                    onChange={this.handleChangeMultiple}
                    renderValue={() => (
                      <div>
                        {this.props.product.tags.map((value) => (
                          <Chip
                            key={value}
                            size='small'
                            label={value}
                            className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}
                          />
                        ))}
                      </div>
                    )}
                  >
                    {this.props.tags &&
                      this.props.tags.map((value, key) => {
                        return (
                          <MenuItem key={key} value={value}>
                            <Chip
                              key={key}
                              size='small'
                              label={value}
                              className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}
                            />
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl fullWidth className='ProductEdit__FormControl'>
                  <InputLabel htmlFor='price'>Price</InputLabel>
                  <Input
                    name='price'
                    type='number'
                    value={this.props.product.price}
                    onChange={this.handleChangeNumber('price')}
                    endAdornment={
                      <InputAdornment position='start'>€</InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl fullWidth className='ProductEdit__FormControl'>
                  <TextField
                    name='description'
                    label='Descripción'
                    value={this.props.product.description}
                    onChange={this.handleChange('description')}
                    multiline
                    rows={2}
                    helperText='Introduce una descripción para el anuncio'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
                {mode === 'edit' && (
                  <React.Fragment>
                    <FormControl fullWidth className='ProductEdit__FormControl'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.props.product.booked}
                            onChange={this.handleCheck('booked')}
                            value='booked'
                          />
                        }
                        label='Reservado'
                      />
                    </FormControl>
                    <FormControl fullWidth className='ProductEdit__FormControl'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.props.product.sold}
                            onChange={this.handleCheck('sold')}
                            value='sold'
                          />
                        }
                        label='Vendido'
                      />
                    </FormControl>
                  </React.Fragment>
                )}
                <div className='ProductEdit__Footer'>
                  <Button
                    type='submit'
                    variant='contained'
                    startIcon={<SaveIcon />}
                    className='ButtonWallakeep ButtonWallakeep__Green'
                  >
                    Guardar
                  </Button>
                  <Button
                    type='button'
                    variant='contained'
                    color='secondary'
                    startIcon={<CancelIcon />}
                    onClick={this.handleReset}
                    component={Link}
                    to='/'
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </main>
          {isFetching && <Loading text={'fetching product'} />}
          {isUpdating && (
            <Loading
              text={mode === 'edit' ? 'Editando anuncio' : 'Creando anuncio'}
            />
          )}
          {error && <Error error={error} />}
        </Container>
        <Footer />
      </React.Fragment>
    );
  }

  /**
   * Cambio en un input tipo texto
   */
  handleChange = (field) => (event) => {
    const aux = this.props.product;
    aux[field] = event.target.value;
    this.setState({
      product: aux,
    });
  };

  /**
   * Cambio en un input tipo check
   */
  handleCheck = (field) => (event) => {
    const aux = this.props.product;
    aux[field] = event.target.checked;
    this.setState({
      product: aux,
    });
  };

  /**
   * Cambio en un input tipo number
   */
  handleChangeNumber = (field) => (event) => {
    const aux = this.props.product;
    aux[field] = parseFloat(event.target.value);
    if (aux[field]) {
      this.setState({
        product: aux,
      });
    }
  };

  /**
   * Selectores de tipo multiple choice
   */
  handleChangeMultiple = (event) => {
    // Obtengo el estado, actualizo los tags seleccionados
    const aux = this.props.product;
    aux.tags = event.target.value;
    // Actualizo el estado
    this.setState({ product: aux });
  };

  /**
   * Manejador del submit del formulario
   */
  handleSubmit = (ev) => {
    const { mode } = this.props;
    ev.preventDefault();
    // Creo un anuncio con los datos del estado si es válido
    const product = new Product(this.props.product);
    product.file = this.props.product.file;
    if (mode === 'create') {
      product.img = product.file.name;
      product.thumbnail = product.file.name;
    }
    // Si los datos son completos continuo con la operación
    if (product.isValid()) {
      this.setState({ submit: true });
      if (mode === 'create')
        this.props.createProduct(product, this.props.session.jwt);
      else this.props.editProduct(product, this.props.session.jwt);
    } else {
      // El anuncio no es completo. Error
      this.props.enqueueSnackbar('Los datos del anuncio no están completos', {
        variant: 'error',
      });
    }
  };

  renderValue = () => {
    if (this.props.product.tags) {
      return (
        <div>
          {this.props.product.tags.map((value) => (
            <Chip
              key={value}
              size='small'
              label={value}
              className={`Ad__Tag Ad__Tag--small Ad__Tag--${value}`}
            />
          ))}
        </div>
      );
    }
    return <div></div>;
  };
}

ProductEdit.propTypes = {
  mode: PropTypes.oneOf(['edit', 'create']).isRequired,
};
