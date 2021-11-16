<template>
  <main v-if="isLoggedIn === null">

    <form class="itemContainer" v-if="!registerActive" v-on:submit.prevent="verifyLogin">
      <h1>Login</h1>
      <input type="text" v-model="username" placeholder="Username..">
      <input type="password" v-model="password" placeholder="Password..">
      <button>Login</button>
      <p style="font-weight: 300">Not registered yet? Sign up <span
          v-on:click="registerActive = true, errorMessage = ''"
          style="color: white; font-weight: 300">here!</span>
      </p>
    </form>

    <form class="itemContainer" v-if="registerActive" v-on:submit.prevent="registerUser">
      <h1>Register</h1>
      <input type="text" v-model="registerUsername" placeholder="Write your name..">
      <input type="password" v-model="registerPassword" placeholder="Write your password..">
      <input type="password" v-model="confirmPassword" placeholder="Confirm your password..">

      <section>
        <label for="teacher">Teacher</label>
        <input type="radio" v-model="registerUserRole" value="teacher" id="teacher" name="userRole">
        <label for="Student">Student</label>
        <input type="radio" v-model="registerUserRole" value="student" id="Student" name="userRole">
      </section>

      <button>Register</button>
      <p>{{ message }}</p>
      <p style="font-weight: 300">Have an account? Login <span v-on:click="registerActive = false, errorMessage = ''"
                                                               style="color: white; font-weight: 300">here!</span></p>
    </form>
    <p style="color: red">{{ errorMessage }}</p>
  </main>
</template>

<script>


export default {
  name: "LoginOrRegister",
  data() {
    return {
      username: '',
      password: '',
      isLoggedIn: undefined,
      errorMessage: '',
      registerActive: false,
      registerUsername: '',
      registerPassword: '',
      confirmPassword: '',
      registerUserRole: '',
      message: '',
      get loggedInRole() {
        return localStorage.getItem('role') || '';
      }
    }
  },
  mounted() {
    this.isLoggedIn = localStorage.getItem("role")
    if(this.loggedInRole !== '')
      this.$router.push({name: 'My Quizes'})
  },
  methods: {
    verifyLogin: function () {

      if (this.username === '') {
        this.errorMessage = "Please type in your username."
      } else if (this.password === '') {
        this.errorMessage = "Please type in your password."
      } else {
        let loginBody = JSON.stringify({username: this.username, password: this.password})
        fetch('http://127.0.0.1:3000/login/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: loginBody
        }).then((response) => {
          return response.json();
        })
            .then((data) => {
              if (data.answers[0] !== undefined) {
                localStorage.setItem("user_id", data.answers[0].user_id)
                localStorage.setItem("role", data.answers[0].user_role)
                localStorage.setItem("username", data.answers[0].user_username)
                this.isLoggedIn = data.answers[0].user_role
                console.log('The id is: ' + this.$route.params);
                this.$router.push({name: 'My Quizes'})
              } else {
                this.errorMessage = "Wrong username or password, try again."
              }
            })
      }
    },
    registerUser: function () {
      if (this.registerUsername === '') {
        this.errorMessage = "Please type in your username."
      } else if (this.registerPassword === '') {
        this.errorMessage = "Please type in your password."
      } else if (this.registerPassword !== this.confirmPassword) {
        this.errorMessage = "Please type in matching password."
      } else if (this.registerUserRole === '') {
        this.errorMessage = "Please choose a role."
      } else {
        let registerBody = JSON.stringify({
          username: this.registerUsername,
          password: this.registerPassword,
          role: this.registerUserRole
        })
        fetch('http://127.0.0.1:3000/sign-up/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: registerBody
        })
        this.message = "You have successfully created your account!"
        this.errorMessage = ''
      }

    }
  }
}

</script>


<style>
@import '../assets/css/toohak.css';
</style>
