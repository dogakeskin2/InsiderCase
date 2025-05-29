<template>
  <div class="race-track">
    <div class="lap-title">🏁 {{ lapText }}</div>
    <!-- places each horse to the track -->
    <div class="lane" v-for="horse in horses" :key="horse.id">
      <HorseCard :id="horse.id" :color="horse.color" :condition="horse.condition" :started="started" />
    </div>
    <div class="finish-line"></div>
  </div>
</template>

<script>
import HorseCard from './HorseCard.vue';

export default {
  name: 'RaceTrack',
  props: ['horses', 'started', 'lap'],
  components: {
    HorseCard
  },
  //computes lap
  computed: {
    lapText() {
      return `${this.lap + 1}. Lap`;
    }
  }
};
</script>

<style scoped>
.race-track {
  position: relative;
  background: #f4f4f4;
  border: 3px dashed #bbb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
  overflow: hidden;
  height: 630px;
}

.lap-title {
  font-weight: bold;
  font-size: 20px;
  color: #d32f2f;
  text-align: center;
  margin-bottom: 15px;
}

.lane {
  height: 50px;
  position: relative;
  border-bottom: 1px dashed #ccc;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.finish-line {
  position: absolute;
  right: 20px;
  top: 60px;
  width: 4px;
  height: calc(100% - 60px);
  background: repeating-linear-gradient(
    to bottom,
    #d32f2f,
    #d32f2f 6px,
    white 6px,
    white 12px
  );
  z-index: 1;
}
</style>
