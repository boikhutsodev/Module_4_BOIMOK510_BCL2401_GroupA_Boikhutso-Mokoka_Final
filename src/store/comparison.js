import { defineStore } from "pinia";
import { ref } from "vue";

export const useComparisonStore = defineStore("comparison", () => {
  const comparedProducts = ref([]);

  const addProductToCompare = (product) => {
    if (
      comparedProducts.value.length < 4 &&
      !isProductInComparison(product.id)
    ) {
      comparedProducts.value.push(product);
    }
  };

  const removeProductFromCompare = (productId) => {
    comparedProducts.value = comparedProducts.value.filter(
      (product) => product.id !== productId
    );
  };

  const clearComparison = () => {
    comparedProducts.value = [];
  };

  const isProductInComparison = (productId) => {
    return comparedProducts.value.some((product) => product.id === productId);
  };

  return {
    comparedProducts,
    addProductToCompare,
    removeProductFromCompare,
    clearComparison,
    isProductInComparison,
  };
});
