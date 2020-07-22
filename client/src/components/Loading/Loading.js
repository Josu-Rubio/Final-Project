import React from 'react';
import imageSpinner from '../../assets/images/spinner.gif';
import './styles.css';

export default function Loading(props) {
  return (
    <div className='Loading'>
      <img src={imageSpinner} className='Loading__Spinner' alt='spinner' />
      <h2 className='Loading__Text'>{props.text}</h2>
    </div>
  );
}
