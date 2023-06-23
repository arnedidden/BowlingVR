<template>
  <GoBackButton @click="goBack">Back</GoBackButton>
  <template v-if="user">
    <div class="usericon">
      <img src="../../public/img/pngwing.com.png" alt="user icon" />
      <strong>{{ user.github.username }}</strong>
    </div>
    <PageTitle>Admin</PageTitle>
    <form @submit.prevent="submitGame">
      <div class="game-creation">
        <div class="game-creation-item">
          <h3 class="title">Game name:</h3>
          <input class="input" type="text" v-model="gameName" placeholder=" " />
        </div>
        <div class="game-creation-item">
          <h3 class="title">Game colors:</h3>
          <div class="choices-of-color">
            <div class="color-choice">
              <h5>Ball</h5>
              <select class="input" v-model="ball">
                <option value="GREEN" class="green">GREEN</option>
                <option value="YELLOW" class="yellow">YELLOW</option>
                <option value="RED" class="red">RED</option>
                <option value="BLUE" class="blue">BLUE</option>
              </select>
              <div id="ball-color" class="color-div"></div>
            </div>
            <div class="color-choice">
              <h5>Pins</h5>
              <select class="input" v-model="pins">
                <option value="GREEN" class="green">GREEN</option>
                <option value="YELLOW" class="yellow">YELLOW</option>
                <option value="RED" class="red">RED</option>
                <option value="BLUE" class="blue">BLUE</option>
              </select>
              <div id="pins-color" class="color-div"></div>
            </div>
            <div class="color-choice">
              <h5>Lane</h5>
              <select class="input" v-model="lane">
                <option value="GREEN" class="green">GREEN</option>
                <option value="YELLOW" class="yellow">YELLOW</option>
                <option value="RED" class="red">RED</option>
                <option value="BLUE" class="blue">BLUE</option>
              </select>
              <div id="lane-color" class="color-div"></div>
            </div>
          </div>
        </div>
        <div class="game-creation-item">
          <h3 class="title">Upload adds</h3>
          <p>Paste an image url in the box</p>
          <input class="input" type="text" v-model="img" />
        </div>
      </div>
    </form>
    <div class="button-div">
      <button
        type="submit"
        class="btn"
        @click="
          submitGame();
          icon = true;
        "
      >
        Creëer spel configuratie
      </button>
      <q-dialog v-model="icon">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Enjoy your game!</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            Your game has successfully been made.
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>
  <template v-else>
    <p>Deze pagina is enkel beschikbaar indien je ingelogd bent.</p>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuth } from 'src/services/auth.service';
import { useBowling } from 'src/services/bowling.service';
import GoBackButton from 'src/components/goBackButton.vue';
import PageTitle from 'src/components/PageTitle.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    GoBackButton,
    PageTitle
  },
  setup() {
    const router = useRouter();
    const { createGame } = useBowling();
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
      ball.value = '';
      pins.value = '';
      lane.value = '';
      img.value = '';
    };

    function goBack() {
      window.history.length > 1 ? router.go(-1) : router.push('/');
    }

    return {
      user,
      submitGame,
      gameName,
      ball,
      pins,
      lane,
      img,
      icon: ref(false),
      goBack  
    };
  },
});
</script>

<style lang="scss" scoped>

@font-face {
  src: url('https://www.axis-praxis.org/fonts/webfonts/MetaVariableDemo-Set.woff2')
    format('woff2');
  font-family: 'Meta';
  font-style: normal;
  font-weight: normal;
}
.usericon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
img {
  height: 20px;
  width: inherit;
}

.game-creation {
  display: flex;
  justify-content: space-around;
}

.game-creation-item {
  width: 30%;
  display: flex;
  flex-direction: column;
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
  margin-bottom: 40px;
}

.returnbtn {
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  padding-top: 40px;
}

.green {
  background-color: rgba(0, 128, 0, 0.432);
  color: aliceblue;
}
.yellow {
  background-color: rgba(255, 255, 0, 0.425);
  color: black;
}
.red {
  background-color: rgba(255, 0, 0, 0.5);
  color: aliceblue;
}
.blue {
  background-color: rgba(0, 0, 255, 0.466);
  color: aliceblue;
}
.color-div {
  height: 100%;
  width: 100px;
}

.title {
  font-size: 35px;
  margin-bottom: 1rem;
  margin-top: 0px;
  background-image: linear-gradient(to right, #54b3d6, #54b3d6 50%, #000 50%);
  background-size: 200% 100%;
  background-position: -100%;
  display: inline-block;
  padding: 5px 0;
  position: relative;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease-in-out;
}

.title::before {
  content: '';
  background: #000000;
  display: block;
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 3px;
  transition: all 0.3s ease-in-out;
}

.title:hover {
  background-position: 0;
}

.title:hover::before {
  width: 100%;
}
.btn {
  font-weight: bold;
  background-color: #482896;
  margin-left: 25px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
    5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.btn:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
}

.btn:hover {
  scale: 1.1;
}

@media only screen and (max-width: 1200px) {
  .game-creation {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .game-creation-item {
    width: 80%;
  }
}

body {
  background-color: #866bca;
  background-position: center;
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  font-family: 'Noto Sans', sans-serif;
}

.input {
  background-color: #47289688;
  color: white;
  font-weight: bold;
  height: 30px;
}
</style>
