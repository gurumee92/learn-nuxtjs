<template>
  <div>
    <div class="container">
      <div class="main-panel">
        <img
          class="product-image"
          :src="product.imageUrl"
          :alt="product.name"
        />
      </div>
      <div class="side-panel">
        <p class="name">{{ product.name }}</p>
        <p class="price">{{ product.price }}</p>
        <button type="button" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchProductById, createCart } from '@/api';

export default {
  async asyncData({ params }) {
    const response = await fetchProductById(params.id);
    const product = response.data;
    return { product };
  },

  methods: {
    async addToCart() {
      const response = await createCart(this.product);
      const { data } = response;
      this.$store.commit('addCart', data);
      await this.$router.push("/carts");
    }
  },

  head() {
    return {
      title: `Shopping Item Detail - ${this.product.name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `이 상품은 ${this.product.name}입니다.`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `nuxt shopping - ${this.product.name}`,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `이름: ${this.product.name}, 가격: ${this.product.price}`,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: this.product.imageUrl,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.product.imageUrl,
        },
      ],
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
.product-image {
  width: 500px;
  height: 375px;
}
.side-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  text-align: center;
  padding: 0 1rem;
}
</style>
