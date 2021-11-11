<template>
  <div v-if="isLoggedIn === null" class="login">

    <form v-on:submit="verifyLogin">
      <input type="text" v-model="username" placeholder="Username..">
      <input type="password" v-model="password" placeholder="Password..">
      <button>Login</button>
      <p>{{errorMessage}}</p>
    </form>
    <p>{{this.isLoggedIn}}</p>
  </div>
</template>

<script>


export default {
  name: "LoginOrRegister",
  data() {
    return {
      username: '',
      password: '',
      isLoggedIn: undefined,
      errorMessage: ''
    }
  },
  mounted() {
    this.isLoggedIn = localStorage.getItem("role")
  },
  methods: {
    verifyLogin: function () {
      let loginBody = JSON.stringify({username: this.username, password: this.password})
      fetch('http://127.0.0.1:3000/login/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: loginBody
      }).then((response) => {return response.json();})
          .then((data) => {
            if(data.answers[0] !== undefined){
              localStorage.setItem("user_id", data.answers[0].user_id)
              localStorage.setItem("role", data.answers[0].user_ROLE)
              this.isLoggedIn = data.answers[0].user_ROLE
              console.log('The id is: ' + this.$route.params);
              this.$router.push({name: 'My Quizes'})
            }else{
              this.errorMessage = "Wrong username or password, try again."
            }
          })


    },
    test: function () {

    }
  }
}

</script>

<style>
.login {
  padding-top: 100px;
}
</style>
