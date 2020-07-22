import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import ProductCardSmall from './ProductCardSmall';
import { editProduct, deleteProduct } from '../../store/actions';

const mapStateToProps = (state) => {
  return {
    session: state.session,
    product: state.product,
    isFetching: state.ui.isFetching,
    isDeleting: state.ui.isDeleting,
    isUpdating: state.ui.isUpdating,
    error: state.ui.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (product, jwt) => dispatch(editProduct(product, jwt)),
    deleteProduct: (slug, jwt) => dispatch(deleteProduct(slug, jwt)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ProductCardSmall));
