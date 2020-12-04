<template>
  <div>
    <h2 v-show="!showGenerator">Welcome to SDCIA raffle prize randomizer!</h2>

    <MeetingStatusSelector
      v-if="activePanel == 1"
      :current-status="meetingStatus"
      @change="setMeetingStatus"
    />

    <ParticipantStatusSelector
      v-if="showParticipantStatusSelector"
      :current-status="participantStatus"
      @change="setParticipantStatus"
    />

    <MeetingIdInput
      v-if="showMeetingIdInput"
      :current-id="meetingId"
      @change="setMeetingId"
    />

    <Generator
      v-if="showGenerator"
      :meeting-id="meetingId"
      :participant-status="participantStatus"
      :meeting-status="meetingStatus"
    />

    <div v-show="!showGenerator">
      <el-button
        v-show="activePanel > 1"
        @click="showPreviousPanel(), $event.currentTarget.blur()"
        type="primary"
        >Previous</el-button
      >
      <el-button
        @click="showNextPanel(), $event.currentTarget.blur()"
        type="primary"
        :disabled="disableNextBtn"
        >Next</el-button
      >
    </div>
  </div>
</template>

<script>
import MeetingStatusSelector from './MeetingStatusSelector';
import ParticipantStatusSelector from './ParticipantStatusSelector';
import MeetingIdInput from './MeetingIdInput';
import Generator from './Generator';

export default {
  components: {
    MeetingStatusSelector,
    ParticipantStatusSelector,
    MeetingIdInput,
    Generator,
  },
  data() {
    return {
      meetingStatus: 'current',
      participantStatus: 'all',
      meetingId: null,
      activePanel: 1,
    };
  },
  computed: {
    showParticipantStatusSelector() {
      return this.meetingStatus === 'current' && this.activePanel == 2;
    },
    showMeetingIdInput() {
      return (
        (this.meetingStatus === 'current' && this.activePanel == 3) ||
        (this.meetingStatus === 'past' && this.activePanel == 2)
      );
    },
    showGenerator() {
      return (
        (this.meetingStatus === 'current' && this.activePanel == 4) ||
        (this.meetingStatus === 'past' && this.activePanel == 3)
      );
    },
    disableNextBtn() {
      return this.showMeetingIdInput && !this.meetingId;
    },
  },
  methods: {
    showNextPanel() {
      this.activePanel++;
    },
    showPreviousPanel() {
      this.activePanel--;
    },
    setMeetingStatus(status) {
      this.meetingStatus = status;
    },
    setParticipantStatus(status) {
      this.participantStatus = status;
    },
    setMeetingId(id) {
      this.meetingId = id;
    },
  },
};
</script>

<style scoped>
.el-button {
  margin: 20px 0;
}
</style>
