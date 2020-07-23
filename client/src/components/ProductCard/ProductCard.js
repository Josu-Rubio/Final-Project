import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Chip from '@material-ui/core/Chip';
import { PRODUCT_CONSTANTS } from '../../models/Product';
import imgBuy from '../../assets/images/buy.png';
import imgSell from '../../assets/images/sell.png';
import imgReserved from '../../assets/images/reserved.png';
import imgSold from '../../assets/images/sold.png';
import Translate from 'react-translate-component';
import './styles.css';

export default function ProductCard(props) {
  return (
    <article className='ProductCard'>
      <header className='ProductCard__Header'>
        <img src={`${props.type === 'buy' ? imgBuy : imgSell}`} alt='avatar' />
        <div className='ProductCard__HeaderTitle'>
          <Link
            to={`/product/display/${props.slug}`}
            className='ProductCard__Link'
          >
            <h2>{props.name}</h2>
          </Link>
          <Moment className='ProductCard__Date' fromNow>
            {props.createdAt}
          </Moment>
        </div>
      </header>
      <div className='ProductCard__Media'>
        <Link
          to={`/product/display/${props.slug}`}
          className='ProductCard__Link'
        >
          <img src={props.img} alt='caption' />
        </Link>
        {props.booked && (
          <img
            src={imgReserved}
            className='ProductCard__Status'
            alt='reserved'
          />
        )}
        {props.sold && (
          <img src={imgSold} className='ProductCard__Status' alt='sold' />
        )}
        <p className='ProductCard__Price'>
          {props.price}
          <span className='ProductCard__Currency'>€</span>
        </p>
        <p>Created by: {props.user}</p>
      </div>
      <div className='ProductCard__Footer'>
        <div className='Ad__Tags'>
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
    </article>
  );
}

ProductCard.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string,
  price: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.oneOf([
    PRODUCT_CONSTANTS.TYPE.BUY,
    PRODUCT_CONSTANTS.TYPE.SELL,
  ]).isRequired,
};
