import React from 'react';
import './styles.css';

export default function Error(props) {
  return (
    <div className='Error'>
      <h2>Oooops! Something went wrong: </h2>
      <p>{props.error}</p>
      <h3>Please, reload page. Or contact the admin.</h3>
    </div>
  );
}
