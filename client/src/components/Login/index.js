import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import Login from './Login';
import { login } from '../../store/actions';

const mapStateToProps = (state) => {
  return {
    session: state.session,
    isFetching: state.ui.isFetching,
    error: state.ui.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Login));
