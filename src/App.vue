<template>
  <div id="app">
    <!-- main title -->
    <div class="header-bar">
      <h1>🏇 Horse Racing</h1>
      <div class="header-buttons">
        <button @click="onGenerate">Generate Program</button>
        <button @click="onStart">Start</button>
      </div>
    </div>

    <!--main grid-->
    <div class="main-grid">

    <!-- left panel containing the horselist -->
      <div class="panel">
        <div class="panel-title">Horse List</div>
        <HorseList :horses="horses" />
      </div>

    <!-- part for race track in the middle where the 10 horses get in line-->
<RaceTrack
  :horses="currentRace ? currentRace.horses : []"
  :started="raceStarted"
  :lap="currentRaceIndex"
/>

      <!-- right panel showing program and winners -->
      <div class="side-column">
        <div class="program-box scrollable panel">
          <div class="panel-title">Program</div>
          <ProgramList :races="races" />
        </div>
        <div class="results-box panel">
          <div class="panel-title">Results</div>
          <RaceResults :results="results" />
        </div>
      </div>
    </div>
  </div>
</template>
 
 <!--to use vuex states and import other vue's -->
<script>
import { mapState } from 'vuex';
import RaceTrack from './components/RaceTrack.vue';
import RaceResults from './components/RaceResults.vue';
import HorseList from './components/HorseList.vue';
import ProgramList from './components/ProgramList.vue';

//opening components for use and naming the file
export default {
  name: 'App',
  components: {  RaceTrack, RaceResults, HorseList, ProgramList },
  data() {
    return {
      raceStarted: false
    }
  },

  //retargeting stages from vuex to components also turns the horses
  computed: {
    ...mapState(['races', 'results', 'horses', 'currentRaceIndex']),
    currentRace() {
      return this.races[this.currentRaceIndex] || null;
    }
  },
  methods: {

  //generates necessary stuff horses etc.
    onGenerate() {
      this.$store.commit('generateHorses');
      this.$store.commit('generateRaces');
      this.$store.commit('setCurrentRaceIndex', 0);
      this.$store.commit('clearResults');
      this.raceStarted = false;
    },

    //makes it possible for user to start each lap
    onStart() {
      this.raceStarted = false;
      this.$nextTick(() => {
        this.raceStarted = true;
        this.$store.dispatch('runSingleRace');
      });
    }
  }
}
</script>


//süsleme :)
<style>

#app {
  padding: 0px;
  max-width: 1400px;
  margin: auto;
}


.header-bar {
  background-color: #00897b;
  color: white;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 20px;
}

.header-bar h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.header-buttons button {
  background-color: #004d40;
  color: white;
  border: none;
  padding: 10px 16px;
  margin-left: 10px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.header-buttons button:hover {
  background-color: #00695c;
}


.main-grid {
  display: grid;
  grid-template-columns: 220px 700px 450px;
  gap: 20px;
  align-items: start;
}


.side-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 500px;
}

.program-box,
.results-box {
  flex: 1;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
}

.scrollable {
  overflow-y: auto;
}

.panel {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

.panel-title {
  background-color:rgb(231, 132, 199);
  color: white;
  padding: 6px 10px;
  font-weight: bold;
  font-size: 15px;
  border-radius: 8px 8px 0 0;
}
.program-box {
  flex: 1;
  min-height: 200px;
  max-height: 300px;
  overflow-y: auto;
}

</style>
