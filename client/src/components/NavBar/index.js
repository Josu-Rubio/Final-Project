import { connect } from 'react-redux';
import NavBar from './NavBar';
import { logout } from '../../store/actions';

const mapStateToProps = (state) => {
  return {
    session: state.session,
    isFetching: state.ui.isFetching,
    error: state.ui.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (jwt) => dispatch(logout(jwt)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
