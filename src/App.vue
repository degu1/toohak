<template>
  <main>
    <div class="backgroundGradientLeft"></div>
    <div class="backgroundGradientRight"></div>
    <div id="backgroundFading" v-on:click="burgerMenuClose"></div>
    <nav id="nav">
      <h1 class="logo">!<span>toohak</span></h1>
      <img src="./assets/burgerMenu.png" id="burger-menu" v-on:click="burgerMenuOpen">

        <section class="sideMenu">
          <section class="welcomeContainer" v-if="this.userId !== ''">
            <p>Welcome, {{ username }}</p>
            <button v-on:click="logOut">log out</button>
          </section>

          <router-link v-if="this.userId === ''" to="/">Login/register</router-link>

          <router-link v-if="this.userId !== ''" to="/myQuizes">My quizes</router-link>

          <router-link v-if="this.userId !== ''" to="/statistics">Statistics</router-link>

          <router-link v-if="this.role === 'teacher'" to="/quiz_setup">Quiz setup</router-link>

          <router-link v-if="this.role === 'teacher'" to="/class_setup">Class setup</router-link>

        </section>

    </nav>
    <router-view/>

  </main>
</template>

<style>

@import 'assets/css/toohak.css';

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
      const links = document.querySelector('.sideMenu');
      const backgroundFading = document.querySelector('#backgroundFading');
      links.classList.add('open');
      backgroundFading.classList.add('onClick');
    },
    burgerMenuClose: function () {
      const links = document.querySelector('.sideMenu');
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
