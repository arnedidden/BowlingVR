<template>
  <template v-if="user">
    User: <strong>{{ user.github.username }}</strong>
    <div class="q-pa-md">
      <h2 class="game-title">{{ game.name }}</h2>
      <div class="text">
        <div class="wrapper">
          <div id="O" class="letter">O</div>
        </div>
        <div class="wrapper">
          <div id="P" class="letter">P</div>
        </div>
        <div class="wrapper">
          <div id="T" class="letter">T</div>
        </div>
        <div class="wrapper">
          <div id="I" class="letter">I</div>
        </div>
        <div class="wrapper">
          <div id="O" class="letter">O</div>
        </div>
        <div class="wrapper">
          <div id="N" class="letter">N</div>
        </div>
        <div class="wrapper">
          <div id="S" class="letter">S</div>
        </div>
      </div>

      <h4 class="title">Naam van het spel</h4>
      <q-input filled type="text" v-model="game.name" placeholder="" />

      <h4 class="title">
        Kleur bowlingbal
        <q-btn
          class="btncolor"
          text-color="dark"
          :color="game.bowlingBall.color.toLowerCase()"
        />
      </h4>
      <div class="buttons">
        <q-btn
          class="btn"
          color="red"
          text-color="dark"
          @click="updateBall('RED')"
          >Rood</q-btn
        >
        <q-btn
          class="btn"
          color="green"
          text-color="dark"
          @click="updateBall('GREEN')"
          >Groen</q-btn
        >
        <q-btn
          class="btn"
          color="blue"
          text-color="dark"
          @click="updateBall('BLUE')"
          >Blauw</q-btn
        >
        <q-btn
          class="btn"
          color="yellow"
          text-color="dark"
          @click="updateBall('YELLOW')"
        >
          Geel
        </q-btn>
      </div>

      <h4 class="title">
        Kleur bowlinglaan
        <q-btn
          class="btncolor"
          text-color="dark"
          :color="game.bowlingLane.color.toLowerCase()"
        />
      </h4>
      <div class="buttons">
        <q-btn
          class="btn"
          color="red"
          text-color="dark"
          @click="updateLane('RED')"
          >Rood</q-btn
        >
        <q-btn
          class="btn"
          color="green"
          text-color="dark"
          @click="updateLane('GREEN')"
          >Groen</q-btn
        >
        <q-btn
          class="btn"
          color="blue"
          text-color="dark"
          @click="updateLane('BLUE')"
          >Blauw</q-btn
        >
        <q-btn
          class="btn"
          color="yellow"
          text-color="dark"
          @click="updateLane('YELLOW')"
        >
          Geel
        </q-btn>
      </div>

      <h4 class="title">
        Kleur bowlingpins
        <q-btn
          class="btncolor"
          text-color="dark"
          :color="game.bowlingPins.color.toLowerCase()"
        />
      </h4>
      <div class="buttons">
        <q-btn
          class="btn"
          color="red"
          text-color="dark"
          @click="updatePins('RED')"
          >Rood</q-btn
        >
        <q-btn
          class="btn"
          color="green"
          text-color="dark"
          @click="updatePins('GREEN')"
          >Groen</q-btn
        >
        <q-btn
          class="btn"
          color="blue"
          text-color="dark"
          @click="updatePins('BLUE')"
          >Blauw</q-btn
        >
        <q-btn
          class="btn"
          color="yellow"
          text-color="dark"
          @click="updatePins('YELLOW')"
        >
          Geel
        </q-btn>
      </div>

      <h4 class="title">Reclame</h4>
      <q-input
        filled
        type="text"
        v-model="reclame"
        placeholder="e.g. https://vuetiful.dev/img/john-duck.png"
      />

      <q-btn class="btnSave" text-color="dark" color="primary" @click="saveGame"
        >Opslaan</q-btn
      >
    </div>
  </template>
  <template v-else>
    <p>Deze pagina is enkel beschikbaar indien je ingelogd bent.</p>
  </template>
</template>

<script lang="ts" scoped>
import { Ref, defineComponent, ref, watch } from 'vue';
import { useBowling } from 'src/services/bowling.service';
import { useRoute } from 'vue-router';
import { Game } from 'src/components/models';
import { useAuth } from 'src/services/auth.service';

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute();
    const { getLeaderBoardForGame, updateGame } = useBowling();
    const reclame = ref('');

    watch(
      route,
      async () => {
        const id = route.params.id;
        const leaderboard = await getLeaderBoardForGame(`${id}`);
        game.value = leaderboard.game;
        const gameReclame = game.value.reclame;
        if (gameReclame && gameReclame.length > 0) {
          reclame.value = gameReclame[0];
        }
      },
      { immediate: true }
    );

    const game = ref({
      name: '',
      bowlingBall: { color: '' },
      bowlingLane: { color: '' },
      bowlingPins: { color: '' },
      leaderboard: [],
      reclame: [],
    }) as Ref<Game>;

    const updateBall = (color: string) => {
      game.value.bowlingBall.color = color;
    };

    const updateLane = (color: string) => {
      game.value.bowlingLane.color = color;
    };

    const updatePins = (color: string) => {
      game.value.bowlingPins.color = color;
    };

    const saveGame = () => {
      game.value.reclame = [reclame.value];
      const id = route.params.id.toString();
      updateGame(id, game.value);
    };
    const { user } = useAuth();
    return {
      game,
      reclame,
      updateBall,
      updateLane,
      updatePins,
      saveGame,
      user,
    };
  },
});
</script>

<style lang="scss">
body {
  background-color: #866bca;
  user-select: none;
}
.option-title {
  display: flex;
  justify-content: center;
}
@font-face {
  src: url('https://www.axis-praxis.org/fonts/webfonts/MetaVariableDemo-Set.woff2')
    format('woff2');
  font-family: 'Meta';
  font-style: normal;
  font-weight: normal;
}
.game-title {
  transition: all 0.5s;
  text-align: center;
  -webkit-text-stroke: 4px #d6f4f4;
  font-variation-settings: 'wght' 900, 'ital' 1;
  color: transparent;
  font-family: 'Meta', sans-serif;
  text-shadow: 10px 10px 0px #07bccc, 15px 15px 0px #e601c0,
    20px 20px 0px #e9019a, 25px 25px 0px #f40468, 45px 45px 10px #482896;
  cursor: pointer;
  padding-bottom: 20px;
}
.game-title:hover {
  font-variation-settings: 'wght' 100, 'ital' 0;
  text-shadow: none;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.btncolor {
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 2px 2px 0px 0px, 2px 2px 0px 0px,
    3px 3px 0px 0px;
  color: #000;
}

.title {
  font-family: 'Meta', sans-serif;
  margin-bottom: 1rem;
  background-image: linear-gradient(to right, #54b3d6, #54b3d6 50%, #000 50%);
  background-size: 200% 100%;
  background-position: -100%;
  display: inline-block;
  padding: 5px 0;
  position: relative;
  -webkit-background-clip: text;
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
.text {
  font-family: 'Yanone Kaffeesatz';
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  width: 50%;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
  .wrapper {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 20px;
    .letter {
      transition: ease-out 1s;
      transform: translateY(40%);
    }
    &:hover {
      .letter {
        transform: translateY(-20%);
      }
    }
  }
}

.btn {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  border: 1px solid;
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

.btnSave {
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  border: 1px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
    5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.btnSave:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
}

.btnSave:hover {
  scale: 1.1;
}
</style>
