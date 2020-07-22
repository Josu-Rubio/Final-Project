// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
// Components
import ProductCard from '../ProductCard';
// Own modules
// Models
import Product from '../../models/Product';
// Assets
// CSS
import './styles.css';

/**
 * Functional component to render a product card
 */
export default function ProductList(props) {
  return (
    <section className='ProductList'>
      {props.products.map((product, index) => (
        <ProductCard
          key={product._id}
          slug={product.slug}
          name={product.name}
          description={product.description}
          price={product.price}
          type={product.type}
          img={product.img}
          tags={product.tags}
          createdAt={product.createdAt}
          booked={product.booked}
          sold={product.sold}
          // user={product.user.name}
        />
      ))}
    </section>
  );
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(Product),
};
