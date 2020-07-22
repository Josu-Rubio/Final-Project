import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard';
import Product from '../../models/Product';
import './styles.css';

export default function ProductList(props) {
  return (
    <section className='ProductList'>
      {props.products.map((product, index) => (
        <ProductCard
          key={product._id}
          slug={product.slug}
          name={product.name}
          desc={product.desc}
          price={product.price}
          type={product.type}
          img={product.img}
          tags={product.tags}
          createdAt={product.createdAt}
          booked={product.booked}
          sold={product.sold}
          user={product.user.name}
        />
      ))}
    </section>
  );
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(Product),
};
