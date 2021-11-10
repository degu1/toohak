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
<!--          <button v-if="!test.isEmpty()" v-on:click="console.log()">log out</button>-->
          <p>{{this.role}}</p>
          <router-link to="/">Home</router-link>
          <router-link to="/myQuizes">My quizes</router-link>

<!--          <div v-if="this.role === 'student'">-->

            <router-link to="/quiz_setup">Quiz setup</router-link>

<!--          </div>-->

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
  data: function() {
    return {
      role: ''
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
    }
  },
}
</script>
