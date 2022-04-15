<template>
  <div class="login">
    <form @submit.prevent="submit">
      <div>
        <label for="username">Username:</label>
        <input type="text" name="username" v-model="form.username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="form.password" />
      </div>
      <div class="login">
        <v-btn @click="submit">Iniciar</v-btn>
      </div>
    </form>
    <p v-if="showError" id="error">Username or Password is incorrect</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showError: false
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("username", this.form.username);
      User.append("password", this.form.password);
      try {
          await this.LogIn(User);
          this.$router.push("/");
          this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  },
};
</script>

<style scoped>
.login{
    display: flex;
    align-items: center;
    justify-content: center;
}

* {
  box-sizing: border-box;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

.v-btn{
  margin-top: 1rem;
  color: #45a049;
  border-radius: 30px;
}

input {
  margin: 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}
#error {
  color: red;
}
</style>

 
