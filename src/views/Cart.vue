<template>
  <div>
    <h1>Shopping Cart</h1>
    <div v-if="cart.length === 0">Your cart is empty</div>
    <div v-else>
      <div v-for="item in cart" :key="item.id">
        <h2>{{ item.title }}</h2>
        <p>{{ item.price }}</p>
        <input type="number" v-model.number="item.quantity" />
        <button @click="removeFromCart(item.id)">Remove</button>
      </div>
      <p>Total: {{ total }}</p>
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
