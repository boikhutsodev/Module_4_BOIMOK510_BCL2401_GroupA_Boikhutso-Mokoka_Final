<template>
  <div class="container mx-auto py-4">
    <h1 class="text-3xl font-bold mb-4">Shopping Cart</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="cartItems.length === 0" class="text-center">
      Your cart is empty.
    </div>
    <div v-else>
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="border rounded-lg p-4 mb-4"
      >
        <img :src="item.image" alt="" class="w-24 h-24 object-cover mb-2" />
        <h2 class="text-lg font-semibold">{{ item.title }}</h2>
        <p class="text-gray-500">{{ item.price }}</p>
        <div class="flex items-center mt-2">
          <button
            @click="removeFromCart(item)"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      </div>
      <div class="text-right font-bold mt-4">Total: {{ totalCost }}</div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useCartStore } from "../store/cart"; // Adjust the path to your store

export default {
  setup() {
    const cartStore = useCartStore();
    const cartItems = computed(() => cartStore.cartItems);
    const loading = computed(() => cartStore.loading);

    const totalCost = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.price, 0);
    });

    const removeFromCart = (item) => {
      cartStore.removeProduct(item);
    };

    return {
      cartItems,
      loading,
      totalCost,
      removeFromCart,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
