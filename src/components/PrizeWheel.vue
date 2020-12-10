<template>
  <FortuneWheel
    class="prize-wheel"
    v-if="prizes.length"
    :canvas="canvasOptions"
    :prizes="prizes"
    :useWeight="true"
    @rotateStart="onRotateStart"
    @rotateEnd="onRotateEnd"
  />
</template>

<script>
import FortuneWheel from 'vue-fortune-wheel';
import 'vue-fortune-wheel/lib/vue-fortune-wheel.css';
export default {
  components: {
    FortuneWheel,
  },
  props: {
    participants: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      canvasOptions: {
        fontSize: 12,
        lineHeight: 12,
        textLength: 60,
        textRadius: 335,
        btnWidth: 100,
        radius: 350,
        borderWidth: 6,
        borderColor: '#008000',
        textDirection: 'vertical',
        btnText: 'GO',
      },
      prizes: [],
      colors: ['#ff0000', '#DE970B', '#008000', '#061D95'],
      winner: null,
    };
  },
  mounted() {
    this.prizes = this.mapParticipants();
  },
  methods: {
    onRotateStart(rotate) {
      this.canvasOptions.btnText = '?';
      rotate;
    },
    onRotateEnd(winner) {
      this.$confetti.start({
        defaultSize: 7,
        defaultDropRate: 15,
      });
      this.canvasOptions.btnText = 'GO';
      this.winner = winner;
      setTimeout(this.showWinnerMsg, 1000);
    },
    showWinnerMsg() {
      this.$msgbox({
        message: this.winner.value,
        title: 'Winner!',
        center: true,
        showConfirmButton: false,
        customClass: 'winner-message',
      })
        .then(() => {})
        .catch(() => {
          this.$confetti.stop();
        });
    },
    mapParticipants() {
      return this.participants.map((participant, index) => ({
        id: participant.user_id,
        name: participant.user_name.toUpperCase(),
        value: `${participant.user_name} - ${participant.email}`,
        bgColor: this.getColor(index),
        color: '#ffffff',
        weight: 1,
      }));
    },
    getColor(i) {
      return this.colors[i % this.colors.length];
    },
  },
};
</script>

<style>
.prize-wheel {
  margin-top: 30px;
}
.prize-wheel .fw-btn__btn {
  background-color: #008000;
  cursor: default;
}
.prize-wheel .fw-btn__btn::before {
  border-bottom: 18px solid #008000;
}
.winner-message.el-message-box {
  font-family: Helvetica, Arial, sans-serif;
  height: 200px;
  width: 850px;
}
.winner-message .el-message-box__title {
  font-size: 30px;
  margin-top: 25px;
}
.winner-message .el-message-box__content {
  font-size: 30px;
  font-weight: bold;
  margin-top: 25px;
}
</style>
