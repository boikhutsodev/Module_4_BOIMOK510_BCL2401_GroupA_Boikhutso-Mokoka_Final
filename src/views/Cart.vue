<template>
  <div class="container mx-auto py-4">
    <h1 class="text-3xl font-bold mb-4">Shopping Cart</h1>
    <div v-if="cart.length === 0" class="text-center">Your cart is empty</div>
    <div v-else>
      <div v-for="item in cart" :key="item.id" class="border-b py-4">
        <h2 class="text-lg font-semibold">{{ item.title }}</h2>
        <p class="text-gray-500 mb-2">{{ item.price }}</p>
        <input
          type="number"
          v-model.number="item.quantity"
          class="border p-2 mb-2"
        />
        <button
          @click="removeFromCart(item.id)"
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove
        </button>
      </div>
      <p class="text-xl font-bold">Total: {{ total }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["cart"]),
    total() {
      return this.cart
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
  methods: {
    ...mapMutations(["setCart"]),
    removeFromCart(id) {
      const newCart = this.cart.filter((item) => item.id !== id);
      this.setCart(newCart);
    },
  },
};
</script>
