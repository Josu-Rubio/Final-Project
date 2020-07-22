// API
import AdvertServices from '../services/AdvertServices';
import AuthServices from '../services/AuthServices';
// Own modules
import LocalStorage from '../utils/Storage';
// Actions
import {
  // Tags
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_FAILURE,
  FETCH_TAGS_SUCCESS,
  // Adverts
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
      const tags = await AdvertServices.getTags();
      dispatch(fetchTagsSuccess(tags));
    } catch (error) {
      dispatch(fetchTagsFailure(error.message));
    }
  };
};

export const fetchAdvert = (slug) => {
  return async function (dispatch, getState) {
    dispatch(fetchAdvertRequest());
    try {
      const product = await AdvertServices.getAdvert(slug);
      dispatch(fetchAdvertSuccess(product));
    } catch (error) {
      dispatch(fetchAdvertFailure(error.message));
    }
  };
};

export const fetchAdverts = () => {
  return async function (dispatch, getState) {
    dispatch(fetchAdvertsRequest());
    try {
      const products = await AdvertServices.getAdverts();
      dispatch(fetchAdvertsSuccess(products));
    } catch (error) {
      dispatch(fetchAdvertsFailure(error.message));
    }
  };
};

export const searchAdverts = (filters) => {
  return async function (dispatch, getState) {
    dispatch(fetchAdvertsRequest());
    try {
      const products = await AdvertServices.searchAdverts(filters);
      dispatch(fetchAdvertsSuccess(products));
    } catch (error) {
      dispatch(fetchAdvertsFailure(error.message));
    }
  };
};

export const editAdvert = (product, jwt) => {
  return async function (dispatch, getState) {
    dispatch(editAdvertRequest());
    try {
      const response = await AdvertServices.editAdvert(product, jwt);
      dispatch(editAdvertSuccess(response));
    } catch (error) {
      dispatch(editAdvertFailure(error.message));
    }
  };
};

export const createAdvert = (product, jwt) => {
  return async function (dispatch, getState) {
    dispatch(createAdvertRequest());
    try {
      delete product._id;
      const response = await AdvertServices.postAdvert(product, jwt);
      dispatch(createAdvertSuccess(response));
    } catch (error) {
      dispatch(createAdvertFailure(error.message));
    }
  };
};

export const deleteAdvert = (slug, jwt) => {
  return async function (dispatch, getState) {
    dispatch(deleteAdvertRequest());
    try {
      const response = await AdvertServices.deleteAdvert(slug, jwt);
      dispatch(deleteAdvertSuccess(response));
    } catch (error) {
      dispatch(deleteAdvertFailure(error.message));
    }
  };
};

export const clearAdvert = () => ({
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

const fetchAdvertRequest = () => ({
  type: FETCH_PRODUCT_REQUEST,
});

const fetchAdvertFailure = (error) => ({
  type: FETCH_PRODUCT_FAILURE,
  error,
});

const fetchAdvertSuccess = (product) => ({
  type: FETCH_PRODUCT_SUCCESS,
  product,
});

const fetchAdvertsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

const fetchAdvertsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  error,
});

const fetchAdvertsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  products,
});

const editAdvertRequest = () => ({
  type: EDIT_PRODUCT_REQUEST,
});

const editAdvertFailure = (error) => ({
  type: EDIT_PRODUCT_FAILURE,
  error,
});

const editAdvertSuccess = (product) => ({
  type: EDIT_PRODUCT_SUCCESS,
  product,
});

const deleteAdvertRequest = () => ({
  type: DELETE_PRODUCT_REQUEST,
});

const deleteAdvertFailure = (error) => ({
  type: DELETE_PRODUCT_FAILURE,
  error,
});

const deleteAdvertSuccess = (product) => ({
  type: DELETE_PRODUCT_SUCCESS,
  product,
});

const createAdvertRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

const createAdvertFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  error,
});

const createAdvertSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  product,
});
