import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewListIcon from '@material-ui/icons/ViewList';
import imageLogo from '../../assets/images/logo.png';
import imageAvatar from '../../assets/images/user.jpg';
import './styles.css';

export default function NavBar(props) {
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);

  return (
    <AppBar title='Wallaclone' position='static' className='NavBar'>
      <Container>
        <Toolbar className='NavBar__Toolbar'>
          <Link to='/' className='NavBar__Brand'>
            <img src={imageLogo} alt='logo' className='NavBar__Brand' />
          </Link>

          <h1>Wallaclone App</h1>
          {props.session.email && (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-NavBar'
                aria-haspopup='true'
                onClick={(ev) => setAnchorUserMenu(ev.currentTarget)}
                color='inherit'
                className='NavBar__User'
              >
                <Avatar
                  className='Avatar'
                  alt={props.session.name}
                  src={imageAvatar}
                />
                <span className='NavBar__User--hiddenXS'>
                  {props.session.name}
                </span>
                <KeyboardArrowDownIcon />
              </IconButton>
              <Menu
                className='NavBar__Menu'
                id='menu-navbar'
                anchorEl={anchorUserMenu}
                keepMounted
                open={anchorUserMenu ? true : false}
                onClose={() => setAnchorUserMenu(null)}
              >
                <MenuItem
                  className='NavBar__MenuItem'
                  component={Link}
                  to='/product/create'
                  onClick={() => setAnchorUserMenu(null)}
                >
                  <ListItemIcon className='NavBar__MenuItemIcon'>
                    <PostAddIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText
                    className='NavBar__MenuItemText'
                    primary='Crear Anuncio'
                  />
                </MenuItem>
                <MenuItem
                  className='NavBar__MenuItem'
                  component={Link}
                  to='/catalog'
                  onClick={() => setAnchorUserMenu(null)}
                >
                  <ListItemIcon className='NavBar__MenuItemIcon'>
                    <ViewListIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText
                    className='NavBar__MenuItemText'
                    primary='Mis anuncios'
                  />
                </MenuItem>
                <MenuItem
                  className='NavBar__MenuItem'
                  component={Link}
                  to='/profile'
                  onClick={() => setAnchorUserMenu(null)}
                >
                  <ListItemIcon className='NavBar__MenuItemIcon'>
                    <AccountCircleIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText
                    className='NavBar__MenuItemText'
                    primary='Perfil'
                  />
                </MenuItem>
                <MenuItem
                  className='NavBar__MenuItem'
                  component={Link}
                  to='/login'
                  onClick={() => props.logout(props.session.jwt)}
                >
                  <ListItemIcon className='NavBar__MenuItemIcon'>
                    <ExitToAppIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText
                    className='NavBar__MenuItemText'
                    primary='Desconectar'
                  />
                </MenuItem>
              </Menu>
            </div>
          )}
          {!props.session && (
            <div>
              <IconButton color='inherit' className='NavBar__User'>
                <AccountCircleIcon />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
