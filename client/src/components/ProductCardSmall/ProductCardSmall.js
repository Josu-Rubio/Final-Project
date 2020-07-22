// NPM Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// Material UI
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
// Own components
import ModalConfirm from '../ModalConfirm';
// Own modules
// Models
import { PRODUCT_CONSTANTS } from '../../models/Product';
import Product from '../../models/Product';
// Assets
import imgReserved from '../../assets/images/reserved.png';
import imgSold from '../../assets/images/sold.png';
// CSS
import './styles.css';

/**
 * Functional component to render an product card
 */
export default function ProductCardSmall(props) {
  // Use state to show/hide modal
  const [showModal, setShowModal] = useState(false);

  // Reservar producto
  const bookProduct = () => {
    const product = new Product({ ...props });
    product.booked = !product.booked;
    props.editProduct(product, props.session.jwt);
  };

  // Sell product
  const sellProduct = () => {
    const product = new Product({ ...props });
    product.sold = !product.sold;
    props.editProduct(product, props.session.jwt);
  };

  // Go to edit
  const toEdit = () => {
    props.history.push(`/product/edit/${props.slug}`);
  };

  // Delete product
  const deleteProduct = () => {
    setShowModal(false);
    props.deleteProduct(props.slug, props.session.jwt);
  };

  // Show modal
  const showModalConfirmation = () => {
    setShowModal(true);
  };
  // Hide modal
  const hideModalConfirmation = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <article className='ProductCardSmall'>
        <header className='ProductCardSmall__Caption'>
          <Link to={`/product/edit/${props.slug}`}>
            <img
              className='ProductCardSmall__Img'
              src={props.img}
              alt='caption'
            />
          </Link>
          {(props.booked || props.sold) && (
            <div className='ProductCardSmall__Status'>
              {props.booked && <img src={imgReserved} alt='reserved' />}
              {props.sold && <img src={imgSold} alt='sold' />}
            </div>
          )}
        </header>
        <div className='ProductCardSmall__Body'>
          <div className='ProductCardSmall__Date'>
            <p className='Title'>Publicado</p>
            <Moment format='DD/MM/YYYY' className='SubTitle'>
              {props.createdAt}
            </Moment>
          </div>
          <div className='ProductCardSmall__Date'>
            <p className='Title'>Actualizado</p>
            <Moment format='DD/MM/YYYY' className='SubTitle'>
              {props.updatedAt}
            </Moment>
          </div>
          <div className='ProductCardSmall__Main'>
            <div className='ProductCardSmall__Title'>
              <p>{props.price} €</p>
              <Link to={`/product/edit/${props.slug}`}>
                <h2>{props.name}</h2>
              </Link>
            </div>
            <div className='ProductCardSmall__Tags'>
              {props.tags &&
                props.tags.map((value, i) => {
                  return (
                    <Chip
                      key={i}
                      size='small'
                      label={value}
                      className={`Ad__Tag Ad__Tag--${value}`}
                    />
                  );
                })}
            </div>
          </div>

          <div className='ProductCardSmall__Actions'>
            <Button
              type='button'
              className={`ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToBlue ${
                props.booked && 'ButtonWallakeep__ClearToBlue--active'
              }`}
              disabled={props.sold}
              variant='contained'
              onClick={bookProduct}
            >
              <BookmarkBorderOutlinedIcon />
            </Button>
            <Button
              type='button'
              className={`ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToRed 
                                ${
                                  props.sold &&
                                  'ButtonWallakeep__ClearToRed--active'
                                }`}
              variant='contained'
              onClick={sellProduct}
            >
              <AttachMoneyOutlinedIcon />
            </Button>
            <Button
              type='button'
              className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGreen'
              disabled={props.sold}
              variant='contained'
              onClick={toEdit}
            >
              <EditOutlinedIcon />
            </Button>
            <Button
              type='button'
              className='ButtonWallakeep ButtonWallakeep__Clear ButtonWallakeep__ClearToGray'
              disabled={props.sold}
              variant='contained'
              onClick={showModalConfirmation}
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
          </div>
        </div>
      </article>
      {showModal && (
        <ModalConfirm
          onConfirm={deleteProduct}
          onCancel={hideModalConfirmation}
        />
      )}
    </React.Fragment>
  );
}

ProductCardSmall.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string,
  price: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.oneOf([
    PRODUCT_CONSTANTS.TYPE.BUY,
    PRODUCT_CONSTANTS.TYPE.SELL,
  ]).isRequired,
};
