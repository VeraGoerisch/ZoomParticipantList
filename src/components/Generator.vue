<template>
  <div v-loading="loading" element-loading-spinner="el-icon-loading">
    <el-button v-show="!loading" type="primary" round @click="generateList"
      >Generate List</el-button
    >
  </div>
</template>

<script>
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
    };
  },
  methods: {
    generateList() {
      this.loading = true;
      console.log(this.meetingId);
      console.log(this.participantStatus);
      console.log(this.meetingStatus);
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
</style>
