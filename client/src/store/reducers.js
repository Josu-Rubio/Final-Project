import * as TYPES from './types';
import Product, { PRODUCT_CONSTANTS } from '../models/Product';

export const initialState = {
  session: {},
  product: Product.emptyProduct(),
  products: [],
  tags: [],
  filters: {
    name: '',
    type: PRODUCT_CONSTANTS.TYPE.ALL,
    tag: PRODUCT_CONSTANTS.TAG.ALL,
    minPrice: 0,
    maxPrice: 0,
  },
  ui: {
    apiConnected: false,
    error: null,
    isDeleting: false,
    isFetching: false,
    isUpdating: false,
    lastProductsUpdated: null,
    totalProductsReturned: 0,
    currentPage: 0,
  },
};

export function tags(state = initialState.tags, action) {
  switch (action.type) {
    case TYPES.FETCH_TAGS_SUCCESS:
      return action.tags;
    default:
      return state;
  }
}

export function product(state = initialState.product, action) {
  switch (action.type) {
    case TYPES.FETCH_PRODUCT_REQUEST:
      return initialState.product;
    case TYPES.FETCH_PRODUCT_FAILURE:
      return initialState.product;
    case TYPES.FETCH_PRODUCT_SUCCESS:
      return action.product;
    case TYPES.EDIT_PRODUCT_SUCCESS:
      return action.product;
    case TYPES.EDIT_PRODUCT_FAILURE:
      return initialState.product;
    case TYPES.CREATE_PRODUCT_SUCCESS:
      return initialState.product;
    case TYPES.CREATE_PRODUCT_FAILURE:
      return initialState.product;
    case TYPES.DELETE_PRODUCT_SUCCESS:
      return initialState.product;
    case TYPES.DELETE_PRODUCT_FAILURE:
      return initialState.product;
    case TYPES.CLEAR_PRODUCT:
      return initialState.product;
    default:
      return state;
  }
}

export function products(state = initialState.products, action) {
  switch (action.type) {
    case TYPES.FETCH_PRODUCTS_REQUEST:
      return initialState.products;
    case TYPES.FETCH_PRODUCTS_FAILURE:
      return initialState.products;
    case TYPES.FETCH_PRODUCTS_SUCCESS:
      return action.products;
    case TYPES.EDIT_PRODUCT_SUCCESS:
      return state.map((product) => {
        if (product._id === action.product._id) {
          return { ...action.product };
        }
        return product;
      });
    case TYPES.DELETE_PRODUCT_SUCCESS:
      const i = state.findIndex(
        (product) => product._id === action.product._id
      );
      return [...state.slice(0, i), ...state.slice(i + 1)];
    case TYPES.CREATE_PRODUCT_SUCCESS:
      return state.concat(action.product);
    default:
      return state;
  }
}

export function filters(state = initialState.filters, action) {
  switch (action.type) {
    case TYPES.SET_FILTERS:
      const newState = { ...action.filters };
      newState.name = action.filters.name.toLowerCase();
      newState.minPrice = parseFloat(action.filters.minPrice);
      newState.maxPrice = parseFloat(action.filters.maxPrice);
      return newState;
    default:
      return state;
  }
}

export function session(state = initialState.session, action) {
  switch (action.type) {
    case TYPES.EDIT_SESSION:
      return { ...action.session };
    case TYPES.LOGIN_FAILURE:
      return initialState.session;
    case TYPES.LOGIN_SUCCESS:
      return { ...action.session };
    case TYPES.SET_SESSION:
      return { ...action.session };
    case TYPES.LOGOUT_SUCCESS:
      return initialState.session;
    default:
      return state;
  }
}

export function ui(state = initialState.ui, action) {
  switch (action.type) {
    case TYPES.SET_FILTERS:
      return { ...state, currentPage: 0 };
    case TYPES.FETCH_PRODUCT_REQUEST:
      return { ...state, isFetching: true, error: null };
    case TYPES.FETCH_PRODUCT_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    case TYPES.FETCH_PRODUCT_SUCCESS:
      return { ...state, isFetching: false, error: null };
    case TYPES.FETCH_PRODUCTS_REQUEST:
      return { ...state, isFetching: true, error: null };
    case TYPES.FETCH_PRODUCTS_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    case TYPES.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        lastProductsUpdated: Date.now(),
        totalProductsReturned: action.products.length,
        currentPage: 0,
      };
    case TYPES.EDIT_PRODUCT_REQUEST:
      return { ...state, isUpdating: true, error: null };
    case TYPES.EDIT_PRODUCT_FAILURE:
      return { ...state, isUpdating: false, error: action.error };
    case TYPES.EDIT_PRODUCT_SUCCESS:
      return { ...state, isUpdating: false, error: null };
    case TYPES.DELETE_PRODUCT_REQUEST:
      return { ...state, isDeleting: true, error: null };
    case TYPES.DELETE_PRODUCT_FAILURE:
      return { ...state, isDeleting: false, error: action.error };
    case TYPES.DELETE_PRODUCT_SUCCESS:
      return { ...state, isDeleting: false, error: null };
    case TYPES.CREATE_PRODUCT_REQUEST:
      return { ...state, isUpdating: true, error: null };
    case TYPES.CREATE_PRODUCT_FAILURE:
      return { ...state, isUpdating: false, error: action.error };
    case TYPES.CREATE_PRODUCT_SUCCESS:
      return { ...state, isUpdating: false, error: null };
    case TYPES.FETCH_TAGS_REQUEST:
      return { ...state, error: null, isFetching: true, apiConnected: false };
    case TYPES.FETCH_TAGS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
        apiConnected:
          action.error === 'Request failed with status code 401' ? true : false,
      };
    case TYPES.FETCH_TAGS_SUCCESS:
      return { ...state, error: null, isFetching: false, apiConnected: true };
    case TYPES.LOGIN_REQUEST:
      return { ...state, error: null, isFetching: true };
    case TYPES.LOGIN_FAILURE:
      return { ...state, error: action.error, isFetching: false };
    case TYPES.LOGIN_WITH_TOKEN_FAILURE:
      return { ...state, error: null, isFetching: false };
    case TYPES.LOGIN_SUCCESS:
      return { ...state, error: null, isFetching: false };
    case TYPES.SET_PAGE:
      return { ...state, currentPage: action.pageNumber };
    case TYPES.LOGOUT_REQUEST:
      return { ...state, error: null, isFetching: true };
    case TYPES.LOGOUT_FAILURE:
      return { ...state, error: action.error, isFetching: false };
    case TYPES.LOGOUT_SUCCESS:
      return { ...state, error: null, isFetching: false };
    default:
      return state;
  }
}
