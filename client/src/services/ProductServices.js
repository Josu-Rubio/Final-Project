import Axios from 'axios';

import Product from '../models/Product';

const API_URL = 'http://127.0.0.1:8000/apiv1';

export default {
  getTags: () => {
    let baseURL = `${API_URL}/products/tags`;
    return Axios.get(baseURL).then((res) => res.data.results);
  },

  getProducts: () => {
    let baseURL = `${API_URL}/products`;
    return Axios.get(baseURL).then((res) =>
      res.data.results.map((product) => new Product(product, API_URL))
    );
  },

  getProduct: (slug) => {
    let baseURL = `${API_URL}/products/${slug}`;
    return Axios.get(baseURL).then(
      (res) => new Product(res.data.result, API_URL)
    );
  },

  searchProducts: (filters) => {
    let baseURL = `${API_URL}/products?`;
    if (filters.name) baseURL = `${baseURL}name=${filters.name}&`;
    if (filters.type && filters.type !== 'all')
      baseURL = `${baseURL}venta=${filters.type === 'sell' ? true : false}&`;
    if (filters.tag && filters.tag !== 'all')
      baseURL = `${baseURL}tag=${filters.tag}&`;
    const priceFrom = parseInt(filters.priceFrom);
    const priceTo = parseInt(filters.priceTo);
    if (priceFrom && !priceTo) {
      baseURL = `${baseURL}price=${priceFrom}-`;
    } else if (!priceFrom && priceTo) {
      baseURL = `${baseURL}price=-${priceTo}&`;
    } else if (priceFrom && priceTo) {
      baseURL = `${baseURL}price=${priceFrom}-${priceTo}&`;
    }
    return Axios.get(baseURL).then((res) =>
      res.data.results.map((product) => new Product(product, API_URL))
    );
  },

  postProduct: (product, jwt) => {
    const baseURL = `${API_URL}/products`;
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('desc', product.desc);
    formData.append('price', product.price);
    formData.append('type', product.type);
    formData.append('tags', product.tags);
    formData.append('img', product.file);
    const config = {
      headers: {
        Authorization: `Monolowana ${jwt}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    return Axios.post(baseURL, formData, config).then(
      (res) => new Product(res.data.result, API_URL)
    );
  },

  editProduct: (product, jwt) => {
    const baseURL = `${API_URL}/products/${product.slug}`;
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('desc', product.desc);
    formData.append('price', product.price);
    formData.append('type', product.type);
    formData.append('tags', product.tags);
    formData.append('booked', product.booked);
    formData.append('sold', product.sold);
    formData.append('img', product.file || product.img);
    const config = {
      headers: {
        Authorization: `Monolowana ${jwt}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    return Axios.put(baseURL, formData, config).then(
      (res) => new Product(res.data.result, API_URL)
    );
  },

  deleteProduct: (slug, jwt) => {
    const baseURL = `${API_URL}/products/${slug}`;
    console.log(baseURL);
    return Axios.delete(baseURL, {
      headers: { Authorization: `Monolowana ${jwt}` },
    }).then((res) => new Product(res.data.result, API_URL));
  },
};
