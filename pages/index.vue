<template>
  <div class="app">
    <main>
      <SearchInput v-model="searchKeyword" @search="searchProducts"/>
      <ul>
        <li v-for="product in products"
            :key="product.id"
            class="item flex"
            @click="routeToProductsDetailPage(product.id)"
        >
          <img :src="product.imageUrl"
               :alt="product.name"
               class="product-image"
          />
          <p>{{product.name}}</p>
          <span>{{product.price}}</span>
        </li>
      </ul>
      <div class="cart-wrapper">
        <button class="btn" @click="routeToCartsPage">장바구니 바로가기</button>
      </div>
    </main>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput';
import {fetchProductsByKeyword} from "@/api";

export default  {
  components: {
    SearchInput,
  },

  async asyncData() {
    const response = await fetchProductsByKeyword("");
    const products = response.data.map(item => {
      return {
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      };
    });

    return { products };
  },

  data() {
    return {
      searchKeyword: '',
    }
  },

  methods: {
    routeToProductsDetailPage(id) {
      this.$router.push(`/products/${id}`);
    },

    routeToCartsPage() {
      this.$router.push("/carts");
    },

    async searchProducts() {
      const response = await fetchProductsByKeyword(this.searchKeyword);
      this.products = response.data.map(item => {
        return {
          ...item,
          imageUrl: `${item.imageUrl}?random=${Math.random()}`,
        };
      });
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}
.product-image {
  width: 400px;
  height: 250px;
}
.app {
  position: relative;
}
.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 3%;
  right: 1%;
}
.cart-wrapper .btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}
</style>

