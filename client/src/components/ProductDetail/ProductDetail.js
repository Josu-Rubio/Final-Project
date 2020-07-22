import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Product from '../../models/Product';
import ModalConfirm from '../ModalConfirm';
import Loading from '../Loading';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Error from '../Error';
import imgReserved from '../../assets/images/reserved.png';
import imgSold from '../../assets/images/sold.png';
import './styles.css';

export default function ProductDetail(props) {
  const slug = props.match.params.slug;
  const { loadProduct } = props;

  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadProduct(slug);
  }, [slug, loadProduct]);

  useEffect(() => {
    if (deleting && !props.isDeleting && !props.error) {
      props.enqueueSnackbar('Anuncio borrado con éxito', {
        variant: 'success',
      });
      props.history.push('/');
    } else if (deleting && !props.isDeleting && props.error) {
      props.enqueueSnackbar(props.error, { variant: 'error' });
    }
  }, [props, deleting]);

  const bookProduct = () => {
    const product = new Product(props.product);
    product.booked = !product.booked;
    props.editProduct(product, props.session.jwt);
  };

  const sellProduct = () => {
    const product = new Product(props.product);
    product.sold = !product.sold;
    props.editProduct(product, props.session.jwt);
  };

  const deleteProduct = () => {
    setShowModal(false);
    setDeleting(true);
    props.deleteProduct(props.product.slug, props.session.jwt);
  };

  const showModalConfirmation = () => {
    setShowModal(true);
  };

  const hideModalConfirmation = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <main className='Main__Section'>
          {props.product && props.product._id && (
            <article className='ProductDetail'>
              <div className='ProductDetail__Main'>
                <header className='ProductDetail__Header'>
                  <Link to='/' className='ProductDetail__Back'>
                    <KeyboardBackspaceIcon />
                  </Link>
                  <h1>{props.product.name}</h1>
                  <img
                    className='Caption'
                    src={props.product.img}
                    alt='caption'
                  />
                  {props.product.booked && (
                    <img
                      src={imgReserved}
                      className='ProductCard__Status'
                      alt='reserved'
                    />
                  )}
                  {props.product.sold && (
                    <img
                      src={imgSold}
                      className='ProductCard__Status'
                      alt='sold'
                    />
                  )}
                </header>
                <div className='ProductDetail__Content'>
                  <h3 className='ProductDetail__Type'>
                    {props.product.type === 'buy' ? 'Compro' : 'Vendo'}
                  </h3>
                  <div className='ProductDetail__Description'>
                    <p>{props.product.desc}</p>
                  </div>
                  <div className='ProductDetail__Tags'>
                    {props.product.tags &&
                      props.product.tags.map((value, i) => {
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
                  {props.product.user._id === props.session.id && (
                    <div className='ProductDetail__Actions'>
                      <Link to={`/product/edit/${props.product.slug}`}>
                        <Button
                          type='button'
                          variant='contained'
                          color='secondary'
                          startIcon={<EditIcon />}
                          className='ButtonWallaclone ButtonWallaclone__Green'
                        >
                          Editar
                        </Button>
                      </Link>
                      <Button
                        type='button'
                        variant='contained'
                        className='ButtonWallaclone ButtonWallaclone__Blue'
                        disabled={props.product.sold}
                        onClick={bookProduct}
                      >
                        {!props.product.booked ? 'Reservar' : 'Anular reserva'}
                      </Button>
                      <Button
                        type='button'
                        variant='contained'
                        className='ButtonWallaclone ButtonWallaclone__Red'
                        onClick={sellProduct}
                      >
                        {!props.product.sold ? 'Vendido' : 'Anular venta'}
                      </Button>
                      <Button
                        type='button'
                        variant='contained'
                        className='ButtonWallaclone ButtonWallaclone__Red'
                        onClick={showModalConfirmation}
                      >
                        Borrar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className='ProductDetail__Footer'>
                <div className='ProductDetail__Price'>
                  <p className='Text'>Precio</p>
                  <p className='Price'>
                    {props.product.price} <span>€</span>
                  </p>
                </div>
                <Moment className='ProductDetail__Date' fromNow>
                  {props.product.createdAt}
                </Moment>
              </div>
            </article>
          )}
          {showModal && (
            <ModalConfirm
              onConfirm={deleteProduct}
              onCancel={hideModalConfirmation}
            />
          )}
          {props.isFetching && <Loading text={'fetching product'} />}
          {props.error && <Error error={props.error} />}
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.object,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
};
