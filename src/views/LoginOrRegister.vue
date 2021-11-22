<template>

  <main v-if="isLoggedIn === null">

    <transition name="error">
      <ErrorMessage v-if="showError" v-bind:error-message="this.message"></ErrorMessage>
    </transition>
    <transition name="success">
      <SuccessMessage v-if="showSuccess" v-bind:success-message="this.message"></SuccessMessage>
    </transition>

    <form class="itemContainer" v-if="!registerActive" v-on:submit.prevent="verifyLogin">
      <h1>Login</h1>
      <input type="text" v-model="username" placeholder="Username..">
      <input type="password" v-model="password" placeholder="Password..">
      <button>Login</button>
      <p style="font-weight: 300">Not registered yet? Sign up <span
          v-on:click="registerActive = true, errorMessage = ''"
          style="color: white; font-weight: 300; cursor: pointer">here!</span>
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
      <p style="font-weight: 300">Have an account? Login <span v-on:click="registerActive = false, errorMessage = ''"
                                                               style="color: white; font-weight: 300; cursor: pointer">here!</span></p>
    </form>
  </main>
</template>

<script>


import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";

export default {
  name: "LoginOrRegister",
  components: {SuccessMessage, ErrorMessage},
  data() {
    return {
      username: '',
      password: '',
      isLoggedIn: undefined,
      message: '',
      registerActive: false,
      registerUsername: '',
      registerPassword: '',
      confirmPassword: '',
      registerUserRole: '',
      showError: false,
      showSuccess: false,
      get loggedInRole() {
        return localStorage.getItem('role') || '';
      }
    }
  },
  mounted() {
    this.isLoggedIn = localStorage.getItem("role")
    if (this.loggedInRole !== '')
      this.$router.push({name: 'My Quizes'})
  },
  methods: {
    verifyLogin: function () {

      if (this.username === '') {
        this.triggerErrorMessage("Please type in your username.")
      } else if (this.password === '') {
        this.triggerErrorMessage("Please type in your password.")
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
                this.triggerErrorMessage("Wrong username or password, try again.")
              }
            })
      }
    },
    registerUser: function () {
      if (this.registerUsername === '') {
        this.triggerErrorMessage( "Please type in your username.")
      } else if (this.registerPassword === '') {
        this.triggerErrorMessage("Please type in your password.")
      } else if (this.registerPassword !== this.confirmPassword) {
        this.triggerErrorMessage("Please type in matching password.")
      } else if (this.registerUserRole === '') {
        this.triggerErrorMessage("Please choose a role.")
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
        }).then((response) => {
          if (response.status === 200) {
            this.triggerSuccessMessage("You have successfully created an account!")
            this.showSuccess = true;
          } else if (response.status === 403) {
            this.triggerErrorMessage("Username already exists.")
          } else {
            this.triggerErrorMessage("Something went wrong.")
          }
        })
      }
    },
    triggerErrorMessage: function (message) {
      this.showError = true;
      this.message = message
      setTimeout(() => this.showError = false, 3000)
    },
    triggerSuccessMessage: function (message) {
      this.showSuccess = true;
      this.message = message
      setTimeout(() => this.showSuccess = false, 3000)
    }
  }
}

</script>


<style>

.error-enter-active {
  animation: error-fade-show 0.5s ease;
}

.error-leave-active {
  animation: fade-leave 0.5s ease;
}

.success-enter-active {
  animation: success-fade-show 0.5s ease;
}

.success-leave-active {
  animation: fade-leave 0.5s ease;
}

@keyframes error-fade-show {
  0% {
    transform: translateY(-100px);
    opacity: 0
  }
  50% {
    transform: translateY(0);
    opacity: 1
  }
  60% {
    transform: translateX(8px);
  }
  70% {
    transform: translateX(-8px);
  }
  80% {
    transform: translateX(4px);
  }
  90% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes success-fade-show {
  0% {
    transform: translateY(-100px);
    opacity: 0
  }
  100% {
    transform: translateY(0);
    opacity: 1
  }
}

@keyframes fade-leave {
  0% {
    transform: translateY(0);
    opacity: 1
  }
  100% {
    transform: translateY(-100px);
    opacity: 0
  }
}

@import '../assets/css/toohak.css';
</style>
