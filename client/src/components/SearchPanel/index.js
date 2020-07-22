import { connect } from 'react-redux';
import SearchPanel from './SearchPanel';
import { setFilters } from '../../store/actions';

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilters: (filters) => dispatch(setFilters(filters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
