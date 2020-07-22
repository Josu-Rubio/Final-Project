// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
// Components
import ProductCardSmall from '../ProductCardSmall';
// Own modules
// Models
// Assets
// CSS
import './styles.css';

/**
 * Functional component to render an product card
 */
export default function ProductListSmall(props) {
  return (
    <section className='ProductListSmall'>
      {props.products.map((product, index) => (
        <ProductCardSmall
          key={product._id}
          slug={product.slug}
          name={product.name}
          price={product.price}
          type={product.type}
          img={product.img}
          tags={product.tags}
          createdAt={product.createdAt}
          updatedAt={product.updatedAt}
          booked={product.booked}
          sold={product.sold}
          user={product.user.name}
          history={props.history}
        />
      ))}
    </section>
  );
}

ProductListSmall.propTypes = {
  products: PropTypes.arrayOf(Object),
};
