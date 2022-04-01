<template>
  <!--<nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />-->

  <div>
    <div>
      <HelloWorld />
      <NavBar />
      <!--<UsersView />-->
      <router-view />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #eeeeee;
}

.container {
  margin: 0 auto;
}

.body{
  margin-left: 15%;
}

.navigation{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.p {
  display: inline-block;
  float: right;
  margin: 10px 10px 20px 20px;
}

.h2 {
  display: inline-block;
  margin: 10px 0 20px 20px;
}

.a {
  text-decoration: underline;
}
</style>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import NavBar from "./components/NavBar.vue";
import UsersView from "./views/UsersView.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
    NavBar,
    UsersView,
  },
};
</script>
