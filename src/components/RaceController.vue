<template>
  <div class="controller">
    <button @click="$emit('generate')">Generate</button>
    <button @click="$emit('start')">Start</button>
  </div>
</template>

<script>
export default {
  name: 'RaceController'
}
</script>

<style scoped>
.controller {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
button {
  padding: 10px 20px;
  font-weight: bold;
}
</style>