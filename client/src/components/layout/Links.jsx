import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Translate from 'react-translate-component';

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
  return (
    <React.Fragment>
      <Link to='/' className='navbar-brand'>
        Wallaclone App
      </Link>
      <Collapse>
        <List>
          <Item>
            <Link to='/products/list' className='nav-link'>
              <Translate content='title.list' />
            </Link>
          </Item>
          <Item>
            <Link to='/products/create' className='nav-link'>
              <Translate content='title.create' />
            </Link>
          </Item>
        </List>
      </Collapse>
      <Collapse>
        <Item>
          <Link to='/register' className='nav-link'>
            <Translate content='register' />
          </Link>
        </Item>
        <Item>
          <Link to='/login' className='nav-link'>
            <Translate content='login' />
          </Link>
        </Item>
      </Collapse>
    </React.Fragment>
  );
}

export default Links;
