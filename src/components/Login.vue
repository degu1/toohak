<template>
  <div v-if="isLoggedIn === null" class="login">
    <form v-on:submit="verifyLogin">
      <input type="text" v-model="username" placeholder="Username..">
      <input type="password" v-model="password" placeholder="Password..">
      <button>Login</button>
      <p>{{errorMessage}}</p>
    </form>
  </div>
</template>

<script>

export default {
  name: "Login",
  data: function (){
    return {
      username: '',
      password: '',
      isLoggedIn: localStorage.getItem("user_id"),
      errorMessage: ''
    }
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

            }else{
              this.errorMessage = "Wrong username or password, try again."
            }
          })
    }
  }
}
//console.log(document.querySelector("input[name=answer]:checked").value)
</script>

<style scoped>

</style>