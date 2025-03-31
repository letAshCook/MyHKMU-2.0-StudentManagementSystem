<template>
  <div class="login">
    <img src="../../assets/images/HKMU.jpg" alt="HKMU Logo" class="hkmu-logo" />
    <div class="login-container">
      <img
        src="../../assets/images/MyHKMU.gif"
        alt="MyHKMU Logo"
        class="myhkmu-logo"
      />
      <h2>Please Log in</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Email</label>
          <input type="email" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <a href="#" class="forgot-password">Forgot password?</a>
        <button type="submit" class="login-button">Sign In</button>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      message: "",
      // Mock user credentials
      mockUser: {
        username: "student@example.com",
        password: "password123",
        role: "student", // Role for the mock user
      },
    };
  },
  methods: {
    login() {
      // Validate the entered credentials
      if (
        this.username === this.mockUser.username &&
        this.password === this.mockUser.password
      ) {
        // Store mock authentication token and role in localStorage
        localStorage.setItem("access_token", "mock_token");
        localStorage.setItem("user_role", this.mockUser.role);

        // Redirect to the StudentDashboard
        this.$router.push("/student-dashboard");
      } else {
        // Show an error message
        this.message = "Invalid username or password.";
      }
    },
  },
};
</script>


<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.hkmu-logo {
  width: 280px;
  height: 68px;
  position: absolute;
  top: 20px;
  left: 20px;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 1440px;
  height: 1080px;
}

.myhkmu-logo {
  position: absolute;
  width: 261px;
  height: 73px;
  left: calc(50% - 261px / 2 + 0.5px);
  top: 102px;
}

h2 {
  position: absolute;
  width: 259px;
  height: 29px;
  left: calc(50% - 259px / 2 + 0.5px);
  top: 198px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  text-align: center;
  text-decoration-line: underline;
  color: #000000;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 272px;
  height: 70px;
  position: absolute;
}

.form-group:nth-child(1) {
  left: calc(50% - 272px / 2);
  top: 268px;
}

.form-group:nth-child(2) {
  left: calc(50% - 272px / 2);
  top: 350px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  height: 40px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.forgot-password {
  display: block;
  margin-bottom: 1rem;
  color: #007bff;
  text-decoration: none;
  position: absolute;
  width: 138px;
  height: 22px;
  left: calc(50% - 138px / 2);
  top: 443px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 290px;
  height: 40px;
  padding: 0.75rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  left: calc(50% - 272px / 2);
  top: 484px;
}

.login-button:hover {
  background-color: #218838;
}

.message {
  margin-top: 1rem;
  color: red;
}
</style>
