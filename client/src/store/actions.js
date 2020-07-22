// API
import ProductServices from '../services/ProductServices';
import AuthServices from '../services/AuthServices';
// Own modules
import LocalStorage from '../utils/Storage';
// Actions
import {
  // Tags
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_FAILURE,
  FETCH_TAGS_SUCCESS,
  // Products
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_FAILURE,
  EDIT_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  CLEAR_PRODUCT,
  // Navigation
  SET_FILTERS,
  SET_PAGE,
  // User
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_WITH_TOKEN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  SET_SESSION,
  EDIT_SESSION,
} from './types';

export const login = (email, password, jwt) => {
  return async function (dispatch, getState) {
    dispatch(loginRequest());
    try {
      // Authenticate trough user/password
      const user = await AuthServices.login(email, password);
      dispatch(loginSuccess(user));
    } catch (error) {
      let message = error.message;
      if (error.response && error.response.data) {
        message = error.response.data.data;
      }
      dispatch(loginFailure(message));
    }
  };
};

export const loginWithToken = (jwt) => {
  return async function (dispatch, getState) {
    dispatch(loginRequest());
    try {
      // Authenticate (validation when login from Local storage) trough JWT
      const user = await AuthServices.loginWithToken(jwt);
      dispatch(loginSuccess(user));
    } catch (error) {
      // In case login from JWT in Local storage fails --> clean local storage
      LocalStorage.cleanLocalStorage();
      let message = error.message;
      if (error.response && error.response.data) {
        message = error.response.data.data;
      }
      dispatch(loginWithTokenFailure(message));
    }
  };
};

export const logout = (jwt) => {
  return async function (dispatch, getState) {
    dispatch(logoutRequest());
    try {
      await AuthServices.logout(jwt);
      LocalStorage.cleanLocalStorage();
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };
};

export const fetchTags = () => {
  return async function (dispatch, getState) {
    dispatch(fetchTagsRequest());
    try {
      const tags = await ProductServices.getTags();
      dispatch(fetchTagsSuccess(tags));
    } catch (error) {
      dispatch(fetchTagsFailure(error.message));
    }
  };
};

export const fetchProduct = (slug) => {
  return async function (dispatch, getState) {
    dispatch(fetchProductRequest());
    try {
      const product = await ProductServices.getProduct(slug);
      dispatch(fetchProductSuccess(product));
    } catch (error) {
      dispatch(fetchProductFailure(error.message));
    }
  };
};

export const fetchProducts = () => {
  return async function (dispatch, getState) {
    dispatch(fetchProductsRequest());
    try {
      const products = await ProductServices.getProducts();
      dispatch(fetchProductsSuccess(products));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};

export const searchProducts = (filters) => {
  return async function (dispatch, getState) {
    dispatch(fetchProductsRequest());
    try {
      const products = await ProductServices.searchProducts(filters);
      dispatch(fetchProductsSuccess(products));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};

export const editProduct = (product, jwt) => {
  return async function (dispatch, getState) {
    dispatch(editProductRequest());
    try {
      const response = await ProductServices.editProduct(product, jwt);
      dispatch(editProductSuccess(response));
    } catch (error) {
      dispatch(editProductFailure(error.message));
    }
  };
};

export const createProduct = (product, jwt) => {
  return async function (dispatch, getState) {
    dispatch(createProductRequest());
    try {
      delete product._id;
      const response = await ProductServices.postProduct(product, jwt);
      dispatch(createProductSuccess(response));
    } catch (error) {
      dispatch(createProductFailure(error.message));
    }
  };
};

export const deleteProduct = (slug, jwt) => {
  return async function (dispatch, getState) {
    dispatch(deleteProductRequest());
    try {
      const response = await ProductServices.deleteProduct(slug, jwt);
      dispatch(deleteProductSuccess(response));
    } catch (error) {
      dispatch(deleteProductFailure(error.message));
    }
  };
};

export const clearProduct = () => ({
  type: CLEAR_PRODUCT,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  filters,
});

export const setSession = (session) => ({
  type: SET_SESSION,
  session,
});

export const editSession = (session) => ({
  type: EDIT_SESSION,
  session,
});

export const setPage = (pageNumber) => ({
  type: SET_PAGE,
  pageNumber,
});

/**
 * Action creators
 */
const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (session) => ({
  type: LOGIN_SUCCESS,
  session,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

const loginWithTokenFailure = (error) => ({
  type: LOGIN_WITH_TOKEN_FAILURE,
  error,
});

const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  error,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const fetchTagsRequest = () => ({
  type: FETCH_TAGS_REQUEST,
});

const fetchTagsFailure = (error) => ({
  type: FETCH_TAGS_FAILURE,
  error,
});

const fetchTagsSuccess = (tags) => ({
  type: FETCH_TAGS_SUCCESS,
  tags,
});

const fetchProductRequest = () => ({
  type: FETCH_PRODUCT_REQUEST,
});

const fetchProductFailure = (error) => ({
  type: FETCH_PRODUCT_FAILURE,
  error,
});

const fetchProductSuccess = (product) => ({
  type: FETCH_PRODUCT_SUCCESS,
  product,
});

const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  error,
});

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  products,
});

const editProductRequest = () => ({
  type: EDIT_PRODUCT_REQUEST,
});

const editProductFailure = (error) => ({
  type: EDIT_PRODUCT_FAILURE,
  error,
});

const editProductSuccess = (product) => ({
  type: EDIT_PRODUCT_SUCCESS,
  product,
});

const deleteProductRequest = () => ({
  type: DELETE_PRODUCT_REQUEST,
});

const deleteProductFailure = (error) => ({
  type: DELETE_PRODUCT_FAILURE,
  error,
});

const deleteProductSuccess = (product) => ({
  type: DELETE_PRODUCT_SUCCESS,
  product,
});

const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

const createProductFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  error,
});

const createProductSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  product,
});
