import React from 'react';
import imageSpinner from '../../assets/images/spinner.gif';
import './styles.css';

export default function Loading(props) {
  return (
    <div className='LoadingSmall'>
      <img src={imageSpinner} className='LoadingSmall__Spinner' alt='spinner' />
      <h2 className='LoadingSmall__Text'>{props.text}</h2>
    </div>
  );
}
