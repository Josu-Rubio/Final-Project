// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own components
import ProductCardSmall from './ProductCardSmall';
// Own modules
import { editProduct, deleteProduct } from '../../store/actions';

/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
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

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (product, jwt) => dispatch(editProduct(product, jwt)),
    deleteProduct: (slug, jwt) => dispatch(deleteProduct(slug, jwt)),
  };
};

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ProductCardSmall));
