// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
// Material UI
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
import Container from '@material-ui/core/Container';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
// Own modules
// Assets
// CSS
import './styles.css';

/**
 * Component para el footer (functional component)
 */
export default function Footer() {
  return (
    <footer className='Footer'>
      <Container>
        <Grid container spacing={3} className='Footer__row'>
          <Grid item xs={12} sm={6} className='Footer-item mt-3 mt-lg-0'>
            <FooterAddress />
          </Grid>
          <Grid item xs={12} sm={6} className='Footer-item links mt-3 mt-lg-0'>
            <FooterLinks />
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

/**
 * Sección de dirección del footer
 */
function FooterAddress() {
  return (
    <div className='Footer__section'>
      <h2 className='Footer__title'>Contactar</h2>
      <div className='Footer__content'>
        <p>Contacta conmigo en el siguiente e-mail:</p>
        <div className='Footer__block'>
          <MailOutlineIcon className='Mail__Icon' />
          <span></span>
          <a href='mailto: ismaelbernal83@gmail.com'>
            ismaelbernal83@gmail.com
          </a>
        </div>
        <p>O través de redes sociales:</p>
        <div className='SocialLinks'>
          <a
            className='SocialLinks__link SocialLinks__link--facebook'
            href='https://laestanciaazul.com'
          >
            <HomeIcon />
          </a>
          <a
            className='SocialLinks__link SocialLinks__link--github'
            href='https://github.com/IsmaelB83'
          >
            <GitHubIcon />
          </a>
          <a
            className='SocialLinks__link SocialLinks__link--linkedin'
            href='https://www.linkedin.com/in/ismael-bernal-10497a51/'
          >
            <LinkedInIcon />
          </a>
          <a
            className='SocialLinks__link SocialLinks__link--instagram'
            href='https://www.instagram.com/isma83_/'
          >
            <InstagramIcon />
          </a>
          <a
            className='SocialLinks__link SocialLinks__link--twitter'
            href='https://twitter.com/Ismab83'
          >
            <TwitterIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Sección de links del footer
 */
function FooterLinks() {
  return (
    <div className='Footer__section'>
      <h2 className='Footer__title'>Links</h2>
      <div className='Footer__content Footer__content--center'>
        <Link className='Footer__link' to='/login'>
          Login
        </Link>
        <Link className='Footer__link' to='/'>
          Home
        </Link>
        <Link className='Footer__link' to='/product/create'>
          Crear anuncio
        </Link>
        <a className='Footer__link' href='https://www.laestanciaazul.com/'>
          La Estancia Azul
        </a>
        <a
          className='Footer__link'
          href='https://github.com/IsmaelB83/keepcoding-react-wallakeep'
        >
          Repositorio
        </a>
        <a
          className='Footer__link'
          href='https://keepcoding.io/es/nuestros-bootcamps/full-stack-web-bootcamp/'
        >
          Keepcoding Fullstack Bootcamp
        </a>
      </div>
    </div>
  );
}
