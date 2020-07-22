// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own Components
import Home from './Home';
// Own modules
import {
  fetchTags,
  fetchProducts,
  searchProducts,
  setPage,
} from '../../store/actions';
import { getVisibleProducts } from '../../store/selectors';

/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
  return {
    session: state.session,
    tags: state.tags,
    products: getVisibleProducts(state.products, state.filters),
    ui: state.ui,
  };
};

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    loadProducts: () => dispatch(fetchProducts()),
    searchProducts: (filters) => dispatch(searchProducts(filters)),
    setCurrentPage: (pageNumber) => dispatch(setPage(pageNumber)),
  };
};

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Home));
