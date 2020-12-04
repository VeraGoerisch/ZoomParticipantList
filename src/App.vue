<template>
  <div id="app">
    <img alt="SDCIA logo" src="./assets/logo.png" />
    <MainContainer />
  </div>
</template>

<script>
import MainContainer from './components/MainContainer.vue';

export default {
  name: 'App',
  components: {
    MainContainer,
  },
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
