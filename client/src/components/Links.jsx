import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Collapse = styled.div.attrs({
  className: 'collpase navbar-collapse',
})``;

const List = styled.div.attrs({
  className: 'navbar-nav mr-auto',
})``;

const Item = styled.div.attrs({
  className: 'collpase navbar-collapse',
})``;

function Links() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Link to='/' className='navbar-brand'>
        Wallaclone App
      </Link>
      <Collapse>
        <List>
          <Item>
            <Link to='/products/list' className='nav-link'>
              {t('Ads List')}
            </Link>
          </Item>
          <Item>
            <Link to='/products/create' className='nav-link'>
              {t('Create Ad')}
            </Link>
          </Item>
        </List>
      </Collapse>
    </React.Fragment>
  );
}

export default Links;
