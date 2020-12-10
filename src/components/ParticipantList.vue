<template>
  <div>
    <h3>Total participants: {{ participants.length }}</h3>
    <p v-for="participant in participants" :key="participant.user_id">
      {{ participant.user_name }} - {{ participant.email }}
    </p>
    <JsonCSV
      id="download"
      :data="participants"
      :fields="csvFields"
      name="participants.csv"
    >
      <el-button type="primary" @click="$event.target.blur()"
        >Download .csv</el-button
      >
    </JsonCSV>
  </div>
</template>

<script>
import JsonCSV from 'vue-json-csv';
export default {
  components: {
    JsonCSV,
  },
  props: {
    participants: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      csvFields: [
        'user_id',
        'user_name',
        'email',
        'join_time',
        'leave_time',
        'leave_reason',
        'location',
        'pc_name',
        'recording',
        'share_application',
        'share_desktop',
        'share_whiteboard',
      ],
    };
  },
};
</script>

<style scoped>
h3 {
  margin-bottom: 30px;
}
#download {
  display: inline-block;
}
.el-button {
  margin: 10px 0 20px;
}
</style>
