<template>
  <div class="container mx-auto py-4">
    <h1 class="text-3xl font-bold mb-4">Shopping Cart</h1>

    <div v-if="cartItems.length > 0">
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="border-b py-2">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-lg font-semibold">{{ item.title }}</h2>
              <p class="text-gray-500">{{ item.price | currency }}</p>
              <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
            </div>
            <div>
              <button
                @click="removeFromCart(item.id)"
                class="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div class="mt-4">
        <p class="text-lg font-bold">Total: {{ total | currency }}</p>
        <button
          @click="clearCart"
          class="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
        >
          Clear Cart
        </button>
        <button class="bg-blue-500 text-white px-4 py-2 rounded mt-2 ml-2">
          Proceed to Checkout
        </button>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-gray-500">Your cart is empty.</p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useCartStore } from "../store/cart"; // Adjust the path if necessary

export default {
  setup() {
    const cartStore = useCartStore();

    const cartItems = computed(() => cartStore.cart);
    const total = computed(() =>
      cartStore.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );

    const removeFromCart = (itemId) => {
      cartStore.removeProduct(itemId);
    };

    const clearCart = () => {
      cartStore.clearCart();
    };

    return {
      cartItems,
      total,
      removeFromCart,
      clearCart,
    };
  },
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
