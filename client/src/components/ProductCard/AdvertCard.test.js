import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import ProductCard from './ProductCard';
import { PRODUCT_CONSTANTS } from '../../models/Product';

configure({ adapter: new Adapter() });

const defaultProps = {
  id: '1',
  name: 'PS4Pro',
  description: 'Compro PS4 Pro con menos de 1 año de uso',
  price: 200.99,
  type: 'buy',
  tags: ['lifestyle'],
  createdAt: new Date('12/15/2019').toString(),
  img: 'dummy.png',
};

describe('PRODUCT CARD TESTS', () => {
  describe('PRODUCT BUY', () => {
    const render = (props) =>
      shallow(<ProductCard {...defaultProps} {...props} />);
    let wrapper;

    beforeEach(() => {
      wrapper = render();
    });

    it('should render', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('should render an article', () => {
      expect(wrapper.find('article').exists()).toBe(true);
    });

    it('check props of display link', () => {
      expect(
        wrapper.find('.ProductCard__FooterActions').childAt(0).props().to ===
          '/product/display/1'
      );
    });

    it('check type of product', () => {
      expect(wrapper.find('.ProductCard__Header img').prop('src')).toEqual(
        'buy.png'
      );
    });

    it('check img of product', () => {
      expect(wrapper.find('.ProductCard__Media img').prop('src')).toEqual(
        'dummy.png'
      );
    });
  });

  describe('PRODUCT SELL', () => {
    const render = (props) =>
      shallow(<ProductCard {...defaultProps} {...props} />);
    let wrapper;

    beforeEach(() => {
      defaultProps.type = PRODUCT_CONSTANTS.TYPE.SELL;
      wrapper = render();
    });

    it('check type of product', () => {
      expect(wrapper.find('.ProductCard__Header img').prop('src')).toEqual(
        'sell.png'
      );
    });
  });
});
