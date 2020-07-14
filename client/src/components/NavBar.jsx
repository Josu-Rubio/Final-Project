import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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

function NavBar() {
  const { t, i18n } = useTranslation();

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <Container>
      <Nav>
        <Logo />
        <Links />
        <div>
          <button onClick={() => changeLanguage('en')}>{t('English')}</button>
          <button onClick={() => changeLanguage('es')}>{t('Spanish')}</button>
        </div>
      </Nav>
    </Container>
  );
}

export default NavBar;
