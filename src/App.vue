<template>
  <div id="app">
    <div class="backgroundGradientLeft"></div>
    <div class="backgroundGradientRight"></div>
    <div id="nav">
      <h1 id="logo">!<span>toohak</span></h1>
      <img src="./assets/burgerMenu.png" id="burger-menu">
      <section class="links">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        |
        <router-link to="/myQuizes">My quizes</router-link>
      </section>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
}

#nav {
  display: grid;
  position: fixed;
  /*grid-template-columns: 50% 50%;*/
  grid-template-areas: "logo burger-icon";
  width: 100%;
  background-color: grey;
}

#logo {
  left: 0;
  margin: 0;
  grid-area: logo;
  color: white;
}

#logo span {
  color: black;
}

#burger-menu {
  display: inline-block;
  position: relative;
  right: 0;
  grid-area: burger-icon;
  background-color: #2B7A78;
}

.links {
  display: none;
  position: absolute;
  flex-direction: column;
  padding: 30px;
  background-color: white;
  height: 100vh;
  width: 40%;
  right: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.backgroundGradientLeft {
  top: 0;
  background: linear-gradient(#36AAA4 0%, #2B7A78 100%);
  width: 100vw;
  height: 100vh;
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
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
