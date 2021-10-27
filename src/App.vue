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
        |
        <router-link to="/about">About</router-link>
        |
        <router-link to="/myQuizes">My quizes</router-link>
      </section>

    </nav>
    <router-view/>

  </div>
</template>

<style>

body {
  margin: 0;
  padding: 0;
}

h1 {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Ubuntu, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display: grid;
  position: fixed;
  grid-template-columns: 100px auto 50px;
  grid-template-rows: auto auto;
  grid-template-areas: "logo test burger-icon";
  width: 100vw;
  align-items: center;
}

.logo {
  display: block;
  left: 0;
  padding: 0;
  grid-area: logo;
  margin: 10px 15px;
  color: white;
  width: auto;
}

#logo span {
  color: black;
}

#burger-menu {
  grid-area: burger-icon;
  cursor: pointer;
}

.links {
  display: none;
  position: absolute;
  flex-direction: column;
  padding: 30px;
  background-color: white;
  height: 100vh;
  width: 40%;
  top: 0;
  right: 0;
  z-index: 1;
}

.links.open {
  display: flex;
}

.links.close {
  display: none;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.backgroundGradientLeft {
  top: 0;
  background: linear-gradient(#36AAA4 0%, #2B7A78 100%);
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
  z-index: -1;

}

.backgroundGradientRight {
  top: 0;
  background: #2B7A78;
  background: linear-gradient(#2B7A78 0%, rgba(0, 0, 0, 0) 100%);
  clip-path: polygon(0 100%, 100% 0, 100% 100%, 0 100%);
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;

}

#nav a.router-link-exact-active {
  color: #42b983;
}
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
