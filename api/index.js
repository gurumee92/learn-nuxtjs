import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

function fetchProductById(id) {
  return instance.get(`/products/${id}`);
}

function fetchProductsByKeyword(keyword) {
  return instance.get(`/products`, {
    params: {
      name_like: keyword,
    },
  })
}

function createCart(cart) {
  return instance.post('/carts', cart);
}

function fetchCarts() {
  return instance.get('/carts');
}

export {
  fetchProductById,
  fetchProductsByKeyword,
  createCart,
  fetchCarts,
}
