// Node modules
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
// Own modules
import ProductDetail from './ProductDetail';
import { products } from '../../assets/tests/data';
import Product from '../../models/Product';

configure({ adapter: new Adapter() });

const defaultProps = {
  product: new Product(products[0]),
  isFetching: false,
  error: null,
  match: {
    params: {
      id: '1',
    },
  },
};
const render = (props) =>
  shallow(<ProductDetail {...defaultProps} {...props} />);

describe('PRODUCT DETAIL TESTS', () => {
  describe('Snapshot test', () => {
    it('should match snapshot', () => {
      const wrapper = render();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
