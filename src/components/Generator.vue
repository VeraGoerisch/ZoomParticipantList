<template>
  <div>
    <div
      v-if="showGenerateBtn"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
    >
      <el-button v-show="!loading" type="primary" @click="generateList"
        >Generate List</el-button
      >
    </div>
    <div v-if="participants.length">
      <p v-for="participant in participants" :key="participant.id">
        {{ participant.name }}
      </p>
    </div>
    <div v-if="error">
      <p class="error"><strong>Error:</strong> {{ error }}</p>
      <el-button type="primary" @click="startOver">Start Over</el-button>
    </div>
    <div v-if="noParticipantsFound">
      <p class="not-found">No participants were found.</p>
      <el-button type="primary" @click="startOver">Start Over</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    meetingStatus: {
      type: String,
      required: true,
      validator: function(value) {
        return ['current', 'past'].indexOf(value) !== -1;
      },
    },
    participantStatus: {
      type: String,
      required: true,
      validator: function(value) {
        return ['all', 'active'].indexOf(value) !== -1;
      },
    },
    meetingId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      participants: [],
      error: null,
      noParticipantsFound: false,
    };
  },
  computed: {
    showGenerateBtn() {
      return (
        !this.participants.length && !this.error && !this.noParticipantsFound
      );
    },
  },
  methods: {
    generateList() {
      this.loading = true;
      axios
        .get('/api/participants', {
          params: {
            meetingStatus: this.meetingStatus,
            participantStatus: this.participantStatus,
            meetingId: this.meetingId,
            //meetingId: '94461688864', //TODO: remove
          },
        })
        .then(response => {
          this.participants = response.data;
          if (!this.participants.length) {
            this.noParticipantsFound = true;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          this.error = error.response.data;
        });
    },
    startOver() {
      location.reload();
    },
  },
};
</script>

<style scoped>
.el-button {
  margin: 40px;
}
::v-deep .el-loading-spinner {
  font-size: 80px;
  margin: 30px 0;
}
.not-found {
  margin: 20px 0 0;
}
.error {
  margin: 20px 0 0;
  color: #d81219;
}
</style>
