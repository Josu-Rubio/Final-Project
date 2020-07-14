import React, { Component } from 'react';
import styled from 'styled-components';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import en from '../../lang/en';
import es from '../../lang/es';

import Logo from './Logo';
import Links from './Links';

const Container = styled.div.attrs({
  className: 'container',
})`
  height: 150px;
`;

const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
  margin-bottom: 20 px;
`;

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('es', es);
counterpart.setLocale('en');

class NavBar extends Component {
  state = {
    lang: 'en',
  };

  onLangChange = (e) => {
    this.setState({ lang: e.target.value });
    counterpart.setLocale(e.target.value);
  };

  render() {
    return (
      <Container>
        <Nav>
          <Logo />
          <Links />
          <select value={this.state.lang} onChange={this.onLangChange}>
            <Translate content='Language.en' component='option' value='en' />
            <Translate content='Language.es' component='option' value='es' />
          </select>
        </Nav>
      </Container>
    );
  }
}

export default NavBar;
