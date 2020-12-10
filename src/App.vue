<template>
  <div id="app">
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
