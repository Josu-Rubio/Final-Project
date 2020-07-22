// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own components
import ProductEdit from './ProductEdit';
// Own modules
import {
  fetchProduct,
  editProduct,
  createProduct,
  clearProduct,
} from '../../store/actions';

/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
  return {
    session: state.session,
    tags: state.tags,
    product: state.product,
    products: state.products,
    ui: state.ui,
  };
};

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
  return {
    loadProduct: (slug) => dispatch(fetchProduct(slug)),
    clearProduct: () => dispatch(clearProduct()),
    editProduct: (product, jwt) => dispatch(editProduct(product, jwt)),
    createProduct: (product, jwt) => dispatch(createProduct(product, jwt)),
  };
};

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ProductEdit));

/*  Lo anterior es equivalente a esto. Porque uso exactamente el mismo nombre de función que en el dispatch.
    Y además uso exactamente los mismos parámetros:
    ----------------------------------------------------
    const mapDispatchToProps = {
        editProduct,
        createProduct
    }

    O incluso más reducido aun:
    ----------------------------------------------------
    import * as actions from '../../store/actions';
    const mapDispatchToProps = actions;
*/
