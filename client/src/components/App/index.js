import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import App from './App';

export default connect(null, null)(withSnackbar(App));
