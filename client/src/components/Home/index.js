import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import Home from './Home';
import {
  fetchTags,
  fetchProducts,
  searchProducts,
  setPage,
} from '../../store/actions';
import { getVisibleProducts } from '../../store/selectors';

const mapStateToProps = (state) => {
  return {
    session: state.session,
    tags: state.tags,
    products: getVisibleProducts(state.products, state.filters),
    ui: state.ui,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    loadProducts: () => dispatch(fetchProducts()),
    searchProducts: (filters) => dispatch(searchProducts(filters)),
    setCurrentPage: (pageNumber) => dispatch(setPage(pageNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Home));
