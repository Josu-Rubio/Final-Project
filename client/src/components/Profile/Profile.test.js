import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Session from '../../models/Session';
import Profile from './Profile';

configure({ adapter: new Adapter() });

const defaultProps = {
  tags: ['lifestyle', 'motor', 'work'],
  session: new Session('ismaelbernal83@gmail.com', 'Ismael', 'Bernal', 4),
  editSession: jest.fn(),
  logout: jest.fn(),
};

describe('PROFILE', () => {
  describe('PROFILE RENDER', () => {
    const render = (props) => shallow(<Profile {...defaultProps} {...props} />);
    let wrapper;

    beforeEach(() => {
      wrapper = render();
    });

    it('should render', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('delete session data', () => {
      const button = wrapper.find('.Profile__Footer').childAt(1);
      const { onClick } = button.props();
      onClick();
      expect(defaultProps.logout).toHaveBeenCalled();
    });
  });
});
