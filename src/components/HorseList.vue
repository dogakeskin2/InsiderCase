<template>
  <div class="horse-list">
    <h2>Horse List</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Condition</th>
        </tr>
      </thead>
      <tbody>
      <!-- special for each horse -->
        <tr v-for="horse in horses" :key="horse.id">
          <td>{{ horse.name }}</td>
          <td>{{ horse.condition }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HorseList',
  props: ['horses']
}
</script>

<style scoped>
.horse-list {
  background: #fff;
  padding: 10px;
  border-right: 2px solid #ccc;
  width: 220px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 5px;
  border: 1px solid #ccc;
  font-size: 13px;
  text-align: left;
}
</style>
