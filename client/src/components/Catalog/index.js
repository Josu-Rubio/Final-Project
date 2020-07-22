// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own Components
import Catalog from './Catalog';
// Model
import { PRODUCT_CONSTANTS } from '../../models/Product';
// Own modules
import { fetchProducts } from '../../store/actions';
import { getOwnProducts } from '../../store/selectors';

/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
  return {
    productsSelling: getOwnProducts(
      state.products,
      state.session,
      PRODUCT_CONSTANTS.TYPE.SELL
    ),
    productsBuying: getOwnProducts(
      state.products,
      state.session,
      PRODUCT_CONSTANTS.TYPE.BUY
    ),
    ui: state.ui,
  };
};

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => dispatch(fetchProducts()),
  };
};

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Catalog));
