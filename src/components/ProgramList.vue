<template>
  <div class="program-list">
    <h2>Race Program</h2>

    <!--managing the race program list -->
    <div v-for="(race, index) in races" :key="index">
      <h3>Race {{ index + 1 }} – {{ race.distance }}m</h3>
      <ul>
        <li v-for="horse in race.horses" :key="horse.id">
          {{ horse.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramList',
  props: ['races']
}
</script>

<style scoped>
.program-list {
  padding: 10px;
  width: 250px;
  border-left: 2px solid #ccc;
  background: #fcfcfc;
}
h3 {
  margin-bottom: 5px;
  margin-top: 15px;
}
</style>