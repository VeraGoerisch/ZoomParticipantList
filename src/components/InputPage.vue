<template>
  <div>
    <div v-if="error">
      <p class="error"><strong>Error:</strong> {{ error }}</p>
      <el-button type="primary" @click="startOver">Start Over</el-button>
    </div>
    <div v-else v-loading="loading" element-loading-spinner="el-icon-loading">
      <h2>Welcome to SDCIA participant list generator!</h2>
      <el-button id="live-btn" type="primary" @click="generateLiveList"
        >LIVE Drawing</el-button
      >
      <el-tooltip effect="light" placement="right" popper-class="help">
        <div slot="content">
          <p>
            Generate a list of participants currently present in a live meeting
            and automatically enter them into a drawing.
          </p>
          <p>CAUTION: do not use if you have more than one meeting running.</p>
        </div>
        <span class="help-icon"><i class="el-icon-info"></i></span>
      </el-tooltip>
      <el-divider>OR</el-divider>
      <p>
        Generate a list of past meeting participants:
      </p>
      <el-input
        v-validate.disable="{ required: true, regex: /^[\d\s]+$/ }"
        placeholder="Enter Meeting Id"
        v-model="meetingId"
        id="id"
        name="id"
        clearable
        data-lpignore="true"
      ></el-input>
      <p v-if="errors.first('id')" class="error">
        {{ errors.first('id') }}
      </p>
      <el-button type="primary" @click="validateMeetingId">Generate</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      meetingId: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    generateLiveList() {
      this.loading = true;
      axios
        .get('api/live-participants')
        .then(response => {
          this.$emit('live-results', response.data);
        })
        .catch(error => {
          this.loading = false;
          this.error = error.response.data;
        });
    },
    generatePastList() {
      this.loading = true;
      axios
        .get('api/participants', {
          params: {
            meetingType: 'past',
            participantStatus: 'all',
            meetingId: this.meetingId.replace(/\s/g, ''),
          },
        })
        .then(response => {
          this.$emit('results', response.data);
        })
        .catch(error => {
          this.loading = false;
          this.error = error.response.data;
        });
    },
    validateMeetingId() {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.generatePastList();
        }
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
  margin: 20px 0;
}
.help-icon {
  display: inline-block;
  width: 10px;
  margin-left: 10px;
  color: #a9a9a9;
}
#live-btn {
  margin-left: 20px;
}
p {
  margin: 40px 0 20px;
}
.el-input {
  display: block;
  width: 230px;
  margin: 0 auto 10px;
}
.error {
  margin: 20px 0 0;
  font-size: 14px;
  color: #d81219;
}
::v-deep .el-loading-spinner {
  font-size: 80px;
  margin-top: -135px;
}
</style>

<style>
.help {
  font-family: Helvetica, Arial, sans-serif;
  color: #2c3e50;
  font-size: 14px;
  border-color: #a9a9a9 !important;
}
.help p {
  margin: 10px 0;
}
</style>
