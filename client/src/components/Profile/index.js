import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import Profile from './Profile';
import { editSession, logout } from '../../store/actions';

const mapStateToProps = (state) => {
  return {
    tags: state.tags,
    session: state.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editSession: (session) => dispatch(editSession(session)),
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Profile));
