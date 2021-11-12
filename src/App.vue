<template>
  <div id="app">
    <div class="backgroundGradientLeft"></div>
    <div class="backgroundGradientRight"></div>
    <div id="backgroundFading" v-on:click="burgerMenuClose"></div>
    <nav id="nav">
      <h1 class="logo">!<span>toohak</span></h1>
      <img src="./assets/burgerMenu.png" id="burger-menu" v-on:click="burgerMenuOpen">
      <div class="linksContainer">
        <section class="links">
          <!--          Log in and log out-->
          <section v-if="this.userId !== ''">
            <span>Welcome, {{username}}</span>
            <button  v-on:click="logOut">log out</button>
          </section>

          <router-link v-if="this.userId === ''" to="/">Login/register</router-link>

          <div v-if="this.userId !== ''">
            <router-link to="/myQuizes">My quizes</router-link>
            <router-link to="/statistics">Statistics</router-link>

            <div v-if="this.role === 'teacher'">
              <router-link to="/quiz_setup">Quiz setup</router-link>
            </div>
          </div>

        </section>
      </div>

    </nav>
    <router-view/>

  </div>
</template>

<style>

@import './assets/css/app.css';

</style>

<script>
export default {
  data: function () {
    return {
      get role() {
        return localStorage.getItem('role') || '';
      },
      get userId() {
        return localStorage.getItem('user_id') || '';
      },
      get username() {
        return localStorage.getItem('username') || '';
      }
    }
  },
  methods: {
    burgerMenuOpen: function () {
      const links = document.querySelector('.links');
      const backgroundFading = document.querySelector('#backgroundFading');
      links.classList.add('open');
      backgroundFading.classList.add('onClick');
    },
    burgerMenuClose: function () {
      const links = document.querySelector('.links');
      const backgroundFading = document.querySelector('#backgroundFading');
      links.classList.remove('open');
      backgroundFading.classList.remove('onClick');
    },
    logOut: function () {
      this.role = ''
      localStorage.clear();
      this.$router.push({name: 'Login/Register'})
    }
  },
}
</script>
