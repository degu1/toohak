<template>
  <div id="app" >
    <div class="backgroundGradientLeft" v-on:click="burgerMenuClose"></div>
    <div class="backgroundGradientRight" v-on:click="burgerMenuClose"></div>
    <div id="backgroundFading"></div>
    <nav id="nav">
      <h1 class="logo">!<span>toohak</span></h1>
      <img src="./assets/burgerMenu.png" id="burger-menu" v-on:click="burgerMenuOpen">
      <section class="links">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/myQuizes">My quizes</router-link>
      </section>

    </nav>
    <router-view/>

  </div>
</template>

<style>

@import './assets/css/app.css';

</style>

<script>
export default {
  methods: {
    burgerMenuOpen: function () {
      const links = document.querySelector('.links');
      links.classList.add('open');
    },
    burgerMenuClose: function () {
      const links = document.querySelector('.links');
      links.classList.remove('open');
    }
  },
}
</script>
