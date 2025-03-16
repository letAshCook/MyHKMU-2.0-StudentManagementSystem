<template>
  <div class="login">
    <h1>Login Page</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          username: this.username,
          password: this.password,
        });
        this.message = response.data.message;
      } catch (error) {
        this.message = error.response.data.message;
      }
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
