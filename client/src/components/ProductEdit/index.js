import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import ProductEdit from './ProductEdit';
import {
  fetchProduct,
  editProduct,
  createProduct,
  clearProduct,
} from '../../store/actions';

const mapStateToProps = (state) => {
  return {
    session: state.session,
    tags: state.tags,
    product: state.product,
    products: state.products,
    ui: state.ui,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProduct: (slug) => dispatch(fetchProduct(slug)),
    clearProduct: () => dispatch(clearProduct()),
    editProduct: (product, jwt) => dispatch(editProduct(product, jwt)),
    createProduct: (product, jwt) => dispatch(createProduct(product, jwt)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ProductEdit));
