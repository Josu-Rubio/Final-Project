import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import ProductList from './ProductList';
import { products } from '../../assets/tests/data';

configure({ adapter: new Adapter() });

const defaultProps = { products };
const render = (props) => shallow(<ProductList {...defaultProps} {...props} />);
let wrapper;

describe('PRODUCT LILST TESTS (using enzyme with a NON-redux component)', () => {
  beforeEach(() => {
    wrapper = render();
  });

  it('should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render an ProductList', () => {
    expect(wrapper.find('.ProductList').exists()).toBe(true);
  });

  it('should render 4 ProductCards', () => {
    expect(wrapper.find('ProductCard')).toHaveLength(4);
  });

  it('check props of the 4th ProductCard', () => {
    expect(wrapper.find('.ProductList').childAt(3).props().id === '4');
  });
});
