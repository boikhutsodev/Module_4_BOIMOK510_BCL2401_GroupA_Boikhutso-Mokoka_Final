import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref(null);
  const token = ref(localStorage.getItem("token") || "");
  const loading = ref(false);
  const error = ref("");

  // Actions
  const login = async (username, password) => {
    loading.value = true;
    error.value = "";
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });
      token.value = response.data.token;
      localStorage.setItem("token", token.value);
      user.value = response.data.user;
    } catch (err) {
      error.value = "Login failed. Please check your credentials.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = "";
    localStorage.removeItem("token");
    user.value = null;
  };

  // Getters
  const isAuthenticated = computed(() => !!token.value);

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
  };
});
