<template>
  <div id="app">
    <el-link type="primary" class="logout-link" @click="signOut"
      >Sign Out</el-link
    >
    <img v-if="!showPrizeWheel" alt="SDCIA logo" src="./assets/logo.png" />
    <PrizeWheel v-if="showPrizeWheel" :participants="participants" />
    <ParticipantList v-if="showParticipantList" :participants="participants" />
    <InputPage
      v-if="!participants.length"
      @results="setResults"
      @live-results="setLiveResults"
    />
  </div>
</template>

<script>
import axios from 'axios';
import InputPage from './components/InputPage.vue';
import ParticipantList from './components/ParticipantList';
import PrizeWheel from './components/PrizeWheel';

export default {
  name: 'App',
  components: {
    InputPage,
    ParticipantList,
    PrizeWheel,
  },
  data() {
    return {
      participants: [],
      showPrizeWheel: false,
      showParticipantList: false,
    };
  },
  methods: {
    setLiveResults(results) {
      this.participants = results;
      this.showPrizeWheel = true;
    },
    setResults(results) {
      this.participants = results;
      this.showParticipantList = true;
    },
    signOut() {
      axios
        .get('/logout')
        .then(() => {})
        .catch(() => {
          location.reload();
        });
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
  position: relative;
}
.logout-link {
  position: absolute !important;
  top: 0;
  right: 0;
  margin-right: 15px;
}
</style>
