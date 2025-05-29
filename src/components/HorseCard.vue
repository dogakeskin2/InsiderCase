<!-- defining the horse as html -->
<template>
  <div
    class="horse"
    :style="{
      backgroundColor: color,
      transform: `translateX(${position}px)`,
      transition: `transform ${duration}s linear`
    }"
  >
    🐎 {{ id }}
  </div>
</template>

<script>
export default {
// props coming fom racetrack 
  name: 'HorseCard',
  props: ['id', 'color', 'condition', 'started'],
  data() {
  // where they should start 
    return {
      position: 0,
      duration: 0,
      finished: false
    };
  },

  //looks if its finished andstarts the run function
  watch: {
    started(val) {
      if (val) {
        this.finished = false;
        this.run();
      }
    },

    //when lap is over horses come back to start line
    '$store.state.resetSignal'() {
      this.reset();
    }
  },
  methods: {
    reset() {
      this.position = 0;
      this.duration = 0;
    },
    run() {
      const length = this.$store.state.races[this.$store.state.currentRaceIndex]?.length || 1500;
      const pixelLength = (length - 1000) * 0.64 + 400; // 1200m = ~528px, 2200m = ~960px

      this.duration = 2 + (8 * (100 - this.condition) / 99);
      this.position = pixelLength;

      setTimeout(() => {
        if (!this.finished) {
          this.finished = true;
          this.$store.commit('incrementFinishedCount');

          //helps to count the horses which finish the race to send them to start
          if (this.$store.state.finishedCount === 10) {
            setTimeout(() => {
              this.$store.commit('resetFinishedCount');
              this.$store.commit('triggerReset');
            }, 300);
          }
        }
      }, this.duration * 1000);
    }
  }
};
</script>

<style scoped>
.horse {
  width: 50px;
  height: 40px;
  color: white;
  text-align: center;
  line-height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 5px;
  font-weight: bold;
  z-index: 2;
}
</style>
