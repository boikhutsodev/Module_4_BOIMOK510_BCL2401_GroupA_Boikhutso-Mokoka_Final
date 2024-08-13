<template>
  <div class="container mx-auto py-4">
    <h1 class="text-3xl font-bold mb-4">Comparison List</h1>
    <div v-if="comparisonList.length === 0" class="text-center text-gray-500">
      No items in the comparison list.
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="product in comparisonList"
        :key="product.id"
        class="product-comparison-card border rounded-lg p-4"
      >
        <img
          :src="product.image"
          alt=""
          class="w-full h-48 object-cover mb-2"
        />
        <h2 class="text-lg font-semibold">{{ product.title }}</h2>
        <p class="text-gray-500">{{ product.price }}</p>
        <p class="text-gray-400 text-sm">{{ product.category }}</p>
        <p>{{ product.description }}</p>
        <div class="flex items-center mb-2">
          <span class="text-yellow-500">{{ product.rating.rate }}</span>
          <span class="ml-1 text-gray-500"
            >({{ product.rating.count }} reviews)</span
          >
        </div>
        <button
          @click="removeFromComparison(product.id)"
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove from Comparison
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useProductStore } from "../store/products"; // Adjust the path to your store

export default {
  name: "Comparison",
  setup() {
    const store = useProductStore();

    // Computed property to get the comparison list from the store
    const comparisonList = computed(() =>
      store.products.filter((product) => store.isInComparisonList(product.id))
    );

    // Method to remove an item from the comparison list
    const removeFromComparison = (productId) => {
      store.removeFromComparisonList(productId);
    };

    return {
      comparisonList,
      removeFromComparison,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 60px; /* Adjust this if needed based on your Navbar */
}
.product-comparison-card {
  max-width: 100%;
}
</style>
