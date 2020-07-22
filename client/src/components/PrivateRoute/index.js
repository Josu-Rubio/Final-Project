import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';

const mapStateToProps = (state) => {
  return {
    session: state.session,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
