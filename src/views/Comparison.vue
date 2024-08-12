<template>
  <div class="container mx-auto py-4">
    <h1 class="text-3xl font-bold mb-4">Comparison</h1>
    <div v-if="comparison.length === 0" class="text-center">
      No items to compare
    </div>
    <div v-else>
      <table class="min-w-full bg-white border">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b">Title</th>
            <th class="px-6 py-3 border-b">Image</th>
            <th class="px-6 py-3 border-b">Description</th>
            <th class="px-6 py-3 border-b">Price</th>
            <th class="px-6 py-3 border-b">Rating</th>
            <th class="px-6 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in comparison" :key="item.id" class="text-center">
            <td class="px-6 py-4 border-b">{{ item.title }}</td>
            <td class="px-6 py-4 border-b">
              <img
                :src="item.image"
                alt=""
                class="w-16 h-16 object-cover mx-auto"
              />
            </td>
            <td class="px-6 py-4 border-b">{{ item.description }}</td>
            <td class="px-6 py-4 border-b">{{ item.price }}</td>
            <td class="px-6 py-4 border-b">{{ item.rating.rate }}</td>
            <td class="px-6 py-4 border-b">
              <button
                @click="removeFromComparison(item.id)"
                class="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useProductStore } from "../store/products"; // Adjust the path as needed

export default {
  setup() {
    const productStore = useProductStore();

    const comparison = computed(() => productStore.comparison);

    const removeFromComparison = (id) => {
      const newComparison = productStore.comparison.filter(
        (item) => item.id !== id
      );
      productStore.setComparison(newComparison);
    };

    return {
      comparison,
      removeFromComparison,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
