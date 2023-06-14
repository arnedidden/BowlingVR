<template>
  <template v-if="user">
    <h1>Admin</h1>
    <p>
      User: <strong>{{ user.github.username }}</strong>
    </p>
    <GoToIndexPageButton></GoToIndexPageButton>
    <form @submit.prevent="submitGame">
      <div class="game-creation">
        <div class="game-creation-item">
          <h3 class="title">Kies de naam van het spel</h3>
          <input type="text" v-model="gameName" placeholder="" />
        </div>
        <div class="game-creation-item">
          <h3 class="title">Kies de kleuren van het spel</h3>
          <div class="choices-of-color">
            <div class="color-choice">
              <h5>Ball</h5>
              <select v-model="ball" >
                <option value="GREEN" class="green">GREEN</option>
                <option value="YELLLOW" class="yellow">YELLLOW</option>
                <option value="RED" class="red">RED</option>
                <option value="BLUE" class="blue">BLUE</option>
              </select>
              <div id="ball-color" class="color-div"></div>
            </div>
            <div class="color-choice">
              <h5>Pins</h5>
              <select v-model="pins" >
                <option value="GREEN" class="green">GREEN</option>
                <option value="YELLLOW" class="yellow">YELLLOW</option>
                <option value="RED" class="red">RED</option>
                <option value="BLUE" class="blue">BLUE</option>
              </select>
              <div id="pins-color" class="color-div"></div>
            </div>
            <div class="color-choice">
              <h5>Lane</h5>
              <select v-model="lane" >
                <option value="GREEN" class="green">GREEN</option>
                <option value="YELLLOW" class="yellow">YELLLOW</option>
                <option value="RED" class="red">RED</option>
                <option value="BLUE" class="blue">BLUE</option>
              </select>
              <div id="lane-color" class="color-div"></div>
            </div>
          </div>
        </div>
        <div class="game-creation-item">
          <h3 class="title">Upload je reclame</h3>
          <p>plak een image url in het vak</p>
          <input
            type="text"
            v-model="img"
          />
        </div>
      </div>
    </form>
    <div class="button-div">
      <button type="submit" @click="submitGame()">
        Creëer spel configuratie
      </button>
    </div>
  </template>
  <template v-else>
    <p>This page is only accessible to users that are logged in.</p>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuth } from 'src/services/auth.service';
import { useBowling } from 'src/services/bowling.service';
import GoToIndexPageButton from 'src/components/GoToIndexPageButton.vue';

export default defineComponent({
  components: {
    GoToIndexPageButton
  },
  setup() {
    
   
    const {createGame} = useBowling();
    const { user } = useAuth();
    const gameName = ref('');
    const ball = ref('');
    const pins = ref('');
    const lane = ref('');
    const img = ref('');
    const submitGame = () => {
      const title = gameName.value;
      const bowlingBalColor = ball.value;
      const pinsColor = pins.value;
      const laneColor = lane.value;
      const reclame = img.value;
      const game = {
        name: title,
        bowlingBall: {
          color: bowlingBalColor,
        },
        bowlingPins: {
          color: pinsColor,
        },
        bowlingLane: {
          color: laneColor,
        },
        leaderboard: [],
        reclame: [reclame],
      };
      createGame(game);
      gameName.value = '';
      ball.value  = '';
      pins.value  = '';
      lane.value  = '';
      img.value  = '';
    };
    return { user, submitGame, gameName, ball, pins, lane, img };
  },
});
</script>
<style scoped>
.game-creation {
  display: flex;
  justify-content: space-around;
}

.game-creation-item {
  width: 30%;
}
.choices-of-color {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.color-choice {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}
select {
  width: 50%;
  height: 50%;
  align-self: center;
}
.button-div {
  display: flex;
  justify-content: center;
}

.green{
  background-color: green;
  color: aliceblue;
}
.yellow{
  background-color: yellow;
  color: black;
}
.red{
  background-color: red;
  color: aliceblue;
}
.blue{
  background-color: blue;
  color: aliceblue;
}

.color-div{
  height: 100%;
  width: 100px;
}
</style>
