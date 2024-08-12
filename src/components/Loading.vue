<!-- src/components/Loading.vue -->

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75"
  >
    <div class="text-center py-8 bg-white p-4 rounded shadow-md">
      <svg
        class="w-16 h-16 mx-auto animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"
        ></path>
      </svg>
      <p class="mt-4">Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

/** * The loading component. * * @component */

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
