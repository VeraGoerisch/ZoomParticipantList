<template>
  <div>
    <p>
      Which participants would you like to include?
    </p>
    <el-radio
      v-model="status"
      label="all"
      border
      @change="$emit('change', status)"
      >All Participants</el-radio
    >
    <el-radio
      v-model="status"
      label="active"
      border
      @change="$emit('change', status)"
      >Currently Active Participants</el-radio
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
        return ['all', 'active'].indexOf(value) !== -1;
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
