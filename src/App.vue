<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background: darkslateblue;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  position: fixed;
  top: 0;
}

nav a {
  font-weight: bold;
  color: white;
  padding: 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
