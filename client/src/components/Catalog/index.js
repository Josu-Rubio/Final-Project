import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import Catalog from './Catalog';
import { PRODUCT_CONSTANTS } from '../../models/Product';
import { fetchProducts } from '../../store/actions';
import { getOwnProducts } from '../../store/selectors';

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

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Catalog));
