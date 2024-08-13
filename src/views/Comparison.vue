<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6">Comparison List</h1>
    <div v-if="comparedProducts.length === 0" class="text-center">
      <p>No products to compare.</p>
    </div>
    <div v-else class="overflow-x-auto">
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-4">Image</th>
            <th class="p-4">Title</th>
            <th class="p-4">Price</th>
            <th class="p-4">Rating</th>
            <th class="p-4">Category</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in comparedProducts" :key="product.id">
            <td class="p-4">
              <img :src="product.image" alt="" class="w-20 h-20 object-cover" />
            </td>
            <td class="p-4">{{ product.title }}</td>
            <td class="p-4">{{ product.price }}</td>
            <td class="p-4">{{ product.rating.rate }}</td>
            <td class="p-4">{{ product.category }}</td>
            <td class="p-4">
              <button
                @click="removeProduct(product.id)"
                class="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-6 flex justify-end">
        <button
          @click="clearComparison"
          class="bg-gray-700 text-white px-6 py-2 rounded"
        >
          Clear All
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useComparisonStore } from "../store/comparison";

export default {
  setup() {
    const comparisonStore = useComparisonStore();
    const comparedProducts = comparisonStore.comparedProducts;

    const removeProduct = (productId) => {
      comparisonStore.removeProductFromCompare(productId);
    };

    const clearComparison = () => {
      comparisonStore.clearComparison();
    };

    return {
      comparedProducts,
      removeProduct,
      clearComparison,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.table-auto {
  width: 100%;
  border-collapse: collapse;
}
.table-auto th,
.table-auto td {
  border: 1px solid #ddd;
  padding: 8px;
}
.table-auto th {
  background-color: #f4f4f4;
}
</style>
