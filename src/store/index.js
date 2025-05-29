/*to start vuex in vue 3 */
import { createStore } from 'vuex';

const names = [
  'Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton', 'Joan Clarke',
  'Katherine Johnson', 'Hedy Lamarr', 'Mary Jackson', 'Radia Perlman',
  'Sister Mary Keller', 'Jean Bartik', 'Barbara Liskov', 'Frances Allen',
  'Marissa Mayer', 'Karen Spärck Jones', 'Adele Goldberg',
  'Betty Holberton', 'Anita Borg', 'Dorothy Vaughan', 'Doga Keskin', 'Kiara Neumann'
];
//generating horse 
function generateHorse(id) {
    const hue = Math.floor((360 / 20) * id);
  return {
    id,
    name: names[id - 1],
    color: `hsl(${hue}, 70%, 85%)`, // pastel renk tonu
    condition: Math.floor(Math.random() * 100) + 1,
  };
}



const store = createStore({
  state: {
    horses: [],
    races: [],
    results: [],
    currentRaceIndex: 0,
    isRunning: false, //if race is active
    finishedCount: 0,
    resetSignal: false //to reset horse's places
  },
  //synchron 
  mutations: {
    generateHorses(state) {
      state.horses = [];
      for (let i = 1; i <= 20; i++) {
        state.horses.push(generateHorse(i));
      }
    },
    generateRaces(state) {
      const distances = [1200, 1400, 1600, 1800, 2000, 2200];
      state.races = [];
      for (let i = 0; i < 6; i++) {
        const shuffled = [...state.horses].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        state.races.push({ distance: distances[i], horses: selected });
      }
    },
    clearResults(state) {
      state.results = [];
    },
    addResult(state, result) {
      state.results.push(result);
    },
    setCurrentRaceIndex(state, index) {
      state.currentRaceIndex = index;
    },
    setRunning(state, val) {
      state.isRunning = val;
    },
    incrementFinishedCount(state) {
      state.finishedCount++;
    },
    resetFinishedCount(state) {
      state.finishedCount = 0;
    },
    triggerReset(state) {
      state.resetSignal = !state.resetSignal;
    }
  },
  //asynchron
  actions: {
    //loos at the winner and finishes the race
    runSingleRace({ commit, state }) {
      const index = state.currentRaceIndex;
      if (index >= state.races.length) {
        commit('setRunning', false);
        return;
      }

      const race = state.races[index];
      const winner = [...race.horses].sort((a, b) => b.condition - a.condition)[0];

      setTimeout(() => {
        commit('addResult', `Race ${index + 1}: ${winner.name}`);
        commit('setCurrentRaceIndex', index + 1);
      }, 10000);
    }
  }
});

export default store;