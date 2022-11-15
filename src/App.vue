<template>
  <nav>
    <router-link to="/">로테이션 챔프</router-link> |
    <router-link to="/record">소환사 조회</router-link> |
    <router-link to="/editor">Q&A</router-link>
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
  width: 88%;
  background: darkslateblue;
  padding: 15px;
  text-align: center;
  border-radius: 10px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
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
