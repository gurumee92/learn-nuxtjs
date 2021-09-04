import { fetchCarts } from '@/api';

export const FETCH_CARTS = 'FETCH_CARTS';

export const state = () => ({
  carts: [],
})

export const mutations = {
  addCart(state, cart) {
    state.carts.push({
      ...cart,
      imageUrl: `${cart.imageUrl}?random=${Math.random()}`,
    });
  },

  fetchCarts(state, carts) {
    state.carts = carts;
  }
}

export const actions = {
  // async nuxtServerInit(storeContext, nuxtContext) {
  //   await storeContext.dispatch(FETCH_CARTS);
  // },

  async [FETCH_CARTS]({ commit }) {
    const response = await fetchCarts();
    const { data } = response;
    commit('fetchCarts', data.map(item => (
      {
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }
      )
    ));
  },
}
