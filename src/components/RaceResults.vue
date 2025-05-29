<template>
  <div class="results">
    <h2>Race Results</h2>
    <ul>
      <li v-for="(result, index) in results" :key="index">{{ result }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RaceResults',
  props: ['results']
}
</script>

<style scoped>
.results {
  margin-top: 20px;
}
</style>

