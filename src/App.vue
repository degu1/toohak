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
          <router-link to="/">Home</router-link>
          <router-link to="/addQuiz">Add quiz</router-link>
          <router-link to="/myQuizes">My quizes</router-link>
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
    }
  },
}
</script>
