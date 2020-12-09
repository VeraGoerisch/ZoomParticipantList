<template>
  <div>
    <p v-for="participant in participants" :key="participant.user_id">
      {{ participant.user_name }} {{ participant.email }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    participants: {
      type: Array,
      required: true,
    },
  },
};
</script>
