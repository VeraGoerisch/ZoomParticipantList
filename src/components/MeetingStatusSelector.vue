<template>
  <div>
    <p>
      Which list of participants would you like to generate?
    </p>
    <el-radio
      v-model="status"
      label="current"
      border
      @change="$emit('change', status)"
      >Current Meeting Participants</el-radio
    >
    <el-radio
      v-model="status"
      label="past"
      border
      @change="$emit('change', status)"
      >Past Meeting Participants</el-radio
    >
  </div>
</template>

<script>
export default {
  props: {
    currentStatus: {
      type: String,
      required: true,
      validator: function(value) {
        return ['current', 'past'].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      status: this.currentStatus,
    };
  },
};
</script>

<style scoped>
p {
  margin: 40px 0;
}
</style>
