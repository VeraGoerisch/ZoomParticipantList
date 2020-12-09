<template>
  <div id="app">
    <img alt="SDCIA logo" src="./assets/logo.png" />
    <ParticipantList v-if="participants.length" :participants="participants" />
    <InputPage v-else @results="updateList" />
  </div>
</template>

<script>
import InputPage from './components/InputPage.vue';
import ParticipantList from './components/ParticipantList';

export default {
  name: 'App',
  components: {
    InputPage,
    ParticipantList,
  },
  data() {
    return {
      participants: [],
    };
  },
  methods: {
    updateList(results) {
      this.participants = results;
    },
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
