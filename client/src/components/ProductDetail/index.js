import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import ProductDetail from './ProductDetail';
import { fetchProduct, editProduct, deleteProduct } from '../../store/actions';

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
    loadProduct: (slug) => dispatch(fetchProduct(slug)),
    editProduct: (product, jwt) => dispatch(editProduct(product, jwt)),
    deleteProduct: (slug, jwt) => dispatch(deleteProduct(slug, jwt)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ProductDetail));
