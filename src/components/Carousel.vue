<template>
  <div class="carousel-container mb-8">
    <div class="relative">
      <div class="carousel flex overflow-hidden">
        <div
          v-for="(product, index) in discountedProducts"
          :key="index"
          class="carousel-item flex-shrink-0 w-full sm:w-1/3 lg:w-1/5 p-4"
        >
          <div
            class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <router-link :to="`/product/${product.id}`">
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-48 object-cover rounded-t-lg"
              />
            </router-link>
            <div class="px-5 py-3">
              <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ product.title }}
              </h5>
              <p class="text-red-500 text-xl font-bold mt-2">
                ${{ discountedPrice(product.price, product.discount) }}
              </p>
              <p class="text-gray-500 line-through">${{ product.price }}</p>
              <p class="text-green-600 font-medium mt-1">
                {{ product.discount }}% OFF
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  props: {
    products: Array,
  },
  setup(props) {
    const discountedProducts = ref([]);

    const getRandomDiscount = () => {
      return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    };

    const discountedPrice = (price, discount) => {
      return (price - (price * discount) / 100).toFixed(2);
    };

    const selectRandomProducts = () => {
      const selectedProducts = [];
      const productsCopy = [...props.products];
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * productsCopy.length);
        const product = productsCopy.splice(randomIndex, 1)[0];
        product.discount = getRandomDiscount();
        selectedProducts.push(product);
      }
      discountedProducts.value = selectedProducts;
    };

    onMounted(() => {
      selectRandomProducts();
    });

    return {
      discountedProducts,
      discountedPrice,
    };
  },
};
</script>

<style scoped>
.carousel {
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
}

.carousel-item {
  scroll-snap-align: start;
}

.carousel-container {
  width: 100%;
  overflow: hidden;
}
</style>
