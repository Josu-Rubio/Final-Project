import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import image404 from '../../assets/images/404.jpg';
import './styles.css';

export default function Error404() {
  return (
    <React.Fragment>
      <NavBar />
      <section className='Error404'>
        <img src={image404} alt='404 not found...' />
        <h1>The page you are looking for couldn't be found.</h1>
      </section>
      <Footer />
    </React.Fragment>
  );
}
