import { PRODUCT_CONSTANTS } from '../models/Product';

export function getVisibleProducts(products, filters) {
  let visibleProducts = products;
  if (filters.name && filters.name !== '') {
    filters.name = filters.name.toLowerCase();
    visibleProducts = visibleProducts.filter((product) =>
      product.name.toLowerCase().includes(filters.name)
    );
  }
  if (filters.tag && filters.tag !== PRODUCT_CONSTANTS.TAG.ALL)
    visibleProducts = visibleProducts.filter(
      (product) => product.tags.indexOf(filters.tag) > -1
    );
  if (filters.type && filters.type !== PRODUCT_CONSTANTS.TYPE.ALL)
    visibleProducts = visibleProducts.filter(
      (product) => product.type === filters.type
    );
  if (filters.minPrice && filters.minPrice > 0)
    visibleProducts = visibleProducts.filter(
      (product) => product.price >= filters.minPrice
    );
  if (filters.maxPrice && filters.maxPrice > 0)
    visibleProducts = visibleProducts.filter(
      (product) => product.price <= filters.maxPrice
    );
  return visibleProducts;
}

export function getOwnProducts(products, session, type) {
  return products.filter(
    (product) => product.user._id === session.id && product.type === type
  );
}
