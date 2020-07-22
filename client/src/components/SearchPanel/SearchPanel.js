// NPM Modules
import React, { useState } from 'react';
// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
// Own modules
// Models
import { PRODUCT_CONSTANTS } from '../../models/Product';
// Assets
// CSS
import './styles.css';

/**
 * Main App
 */
export default function SearchPanel(props) {
  // Initial state del componente
  const initialState = {
    name: '',
    type: PRODUCT_CONSTANTS.TYPE.ALL,
    tag: PRODUCT_CONSTANTS.TAG.ALL,
    priceFrom: 0,
    priceTo: 0,
  };

  // Uso del hook useState
  const [inputs, setInputs] = useState(initialState);

  // Cambio en alguno de los campo del formulario
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const formInputs = { ...inputs, [name]: value };
    setInputs(formInputs);
    // Los campos numérico NO lanzan busqueda automática (salvo que estén en blanco). El resto de campos lanzan búsqueda en tiempo real
    if (
      !name.startsWith('price') ||
      (name.startsWith('price') && inputs[name] === '')
    ) {
      props.setFilters(formInputs);
    }
  };

  // Reseteo el estado a los valores originales de búsqueda
  const handleInputReset = () => {
    const formInputs = initialState;
    formInputs.tag = PRODUCT_CONSTANTS.TAG.ALL;
    setInputs(formInputs);
    props.setFilters(formInputs);
    props.handleAPISearch();
  };

  /**
   * Reseteo el estado a los valores originales de búsqueda
   */
  const handleSubmit = (ev) => {
    ev.preventDefault();
    props.handleAPISearch(inputs);
  };

  // Render del componente
  return (
    <form className='SearchPanel' onSubmit={handleSubmit}>
      <h2>Criterios de búsqueda</h2>
      <div className='InputSearch'>
        <SearchIcon className='InputSearch__Icon InputSearch__Icon--start' />
        <input
          id='filter_name'
          name='name'
          type='text'
          value={inputs.name}
          onChange={handleInputChange}
          className='InputSearch__Input'
          autoComplete='off'
          placeholder='Buscar productos por nombre'
        />
      </div>
      <div className='SearchPanel__Filters'>
        <FormControl>
          <InputLabel shrink htmlFor='type'>
            Tipo
          </InputLabel>
          <Select
            id='filter_type'
            name='type'
            onChange={handleInputChange}
            className='SearchPanel__Type'
            value={inputs.type}
            displayEmpty
          >
            <MenuItem
              key={PRODUCT_CONSTANTS.TYPE.ALL}
              value={PRODUCT_CONSTANTS.TYPE.ALL}
            >
              <Chip
                size='small'
                label={PRODUCT_CONSTANTS.TYPE.ALL}
                className='Ad__Tag Ad__Tag--small'
              />
            </MenuItem>
            <MenuItem
              key={PRODUCT_CONSTANTS.TYPE.BUY}
              value={PRODUCT_CONSTANTS.TYPE.BUY}
            >
              <Chip
                size='small'
                label={PRODUCT_CONSTANTS.TYPE.BUY}
                className='Ad__Tag Ad__Tag--small Ad__Tag--buy'
              />
            </MenuItem>
            <MenuItem
              key={PRODUCT_CONSTANTS.TYPE.SELL}
              value={PRODUCT_CONSTANTS.TYPE.SELL}
            >
              <Chip
                size='small'
                label={PRODUCT_CONSTANTS.TYPE.SELL}
                className='Ad__Tag Ad__Tag--small Ad__Tag--sell'
              />
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel shrink htmlFor='tag'>
            Tag
          </InputLabel>
          <Select
            id='filter_tag'
            name='tag'
            value={inputs.tag}
            onChange={handleInputChange}
            displayEmpty
          >
            <MenuItem
              key={PRODUCT_CONSTANTS.TAG.ALL}
              value={PRODUCT_CONSTANTS.TAG.ALL}
            >
              <Chip
                key={PRODUCT_CONSTANTS.TAG.ALL}
                label={PRODUCT_CONSTANTS.TAG.ALL}
                size='small'
                className='Ad__Tag Ad__Tag--small'
              />
            </MenuItem>
            {props.tags &&
              props.tags.map((value, key) => {
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
        <FormControl>
          <InputLabel htmlFor='minPrice'>Precio desde</InputLabel>
          <Input
            id='filter_minPrice'
            name='minPrice'
            type='number'
            value={parseFloat(inputs.minPrice) || 0}
            onChange={handleInputChange}
            endAdornment={<InputAdornment position='start'>€</InputAdornment>}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='maxPrice'>Precio hasta</InputLabel>
          <Input
            id='filter_maxPrice'
            name='maxPrice'
            type='number'
            value={parseFloat(inputs.maxPrice) || 0}
            onChange={handleInputChange}
            endAdornment={<InputAdornment position='start'>€</InputAdornment>}
          />
        </FormControl>
      </div>
      <div className='SearchPanel__Footer'>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          startIcon={<SearchIcon />}
        >
          {' '}
          Search API{' '}
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleInputReset}
          startIcon={<ClearIcon />}
        >
          {' '}
          Reset{' '}
        </Button>
      </div>
    </form>
  );
}
