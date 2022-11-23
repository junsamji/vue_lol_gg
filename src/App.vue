<template>
  <div class="nav">
    <router-link to="/">로테이션 챔프</router-link> |
    <router-link to="/record">소환사 조회</router-link> |
    <router-link to="/editor">Q&A</router-link>
  </div>
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

div.nav {
  width: 88%;
  background: darkslateblue;
  padding: 15px;
  text-align: center;
  border-radius: 10px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
}

div.nav a {
  font-weight: bold;
  color: white;
  padding: 10px;
}

div.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
