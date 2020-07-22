import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import NavBar from '../NavBar';
import Footer from '../Footer';
import Loading from '../Loading';
import Error from '../Error';
import Product from '../../models/Product';
import imageImg from '../../assets/images/photo.png';
import './styles.css';

export default class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.inputFile = React.createRef();
    this.state = {
      imgTemp: '',
      submit: false,
    };
  }

  componentDidMount() {
    if (this.props.mode === 'edit' && this.props.match.params) {
      const slug = this.props.match.params.slug;
      this.props.loadProduct(slug);
    } else {
      this.props.clearProduct();
    }
  }

  componentDidUpdate() {
    const { mode } = this.props;
    if (mode === 'create' && this.props.product._id !== '') {
      this.props.clearProduct();
    }
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
      this.setState({ submit: false });
    }
  }

  openInputFile = () => {
    this.inputFile.current.click();
  };

  changeInputFile = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    const aux = this.props.product;
    aux.file = ev.target.files[0];
    this.setState({
      product: aux,
      imgTemp: URL.createObjectURL(aux.file),
    });
  };

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
                    value={this.props.product.desc}
                    onChange={this.handleChange('desc')}
                    multiline
                    rows={2}
                    helperText='Add a description'
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
                        label='Booked'
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
                    className='ButtonWallaclone ButtonWallaclone__Green'
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
          {isFetching && <Loading text={'Fetching Product'} />}
          {isUpdating && (
            <Loading
              text={mode === 'edit' ? 'Updating Product' : 'Creating Product'}
            />
          )}
          {error && <Error error={error} />}
        </Container>
        <Footer />
      </React.Fragment>
    );
  }

  handleChange = (field) => (event) => {
    const aux = this.props.product;
    aux[field] = event.target.value;
    this.setState({
      product: aux,
    });
  };

  handleCheck = (field) => (event) => {
    const aux = this.props.product;
    aux[field] = event.target.checked;
    this.setState({
      product: aux,
    });
  };

  handleChangeNumber = (field) => (event) => {
    const aux = this.props.product;
    aux[field] = parseFloat(event.target.value);
    if (aux[field]) {
      this.setState({
        product: aux,
      });
    }
  };

  handleChangeMultiple = (event) => {
    const aux = this.props.product;
    aux.tags = event.target.value;
    this.setState({ product: aux });
  };

  handleSubmit = (ev) => {
    const { mode } = this.props;
    ev.preventDefault();
    const product = new Product(this.props.product);
    product.file = this.props.product.file;
    if (mode === 'create') {
      product.img = product.file.name;
      product.thumbnail = product.file.name;
    }
    if (product.isValid()) {
      this.setState({ submit: true });
      if (mode === 'create')
        this.props.createProduct(product, this.props.session.jwt);
      else this.props.editProduct(product, this.props.session.jwt);
    } else {
      this.props.enqueueSnackbar('You must fulfill all the forms', {
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
