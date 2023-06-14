<template>
  <div class="q-pa-md">
    <h2 class="game-title">Spelnaam: {{ game.name }}</h2>
    <h3 class="option-title">Options</h3>

    <h4 class="title">Naam van het spel</h4>
    <q-input filled type="text" v-model="game.name" placeholder="" />

    <h4 class="title">
      Kleur bowlingbal <q-btn :color="game.bowlingBall.color.toLowerCase()" />
    </h4>
    <div class="buttons">
      <q-btn color="red" @click="updateBall('RED')">Rood</q-btn>
      <q-btn color="green" @click="updateBall('GREEN')">Groen</q-btn>
      <q-btn color="blue" @click="updateBall('BLUE')">Blauw</q-btn>
      <q-btn color="yellow" text-color="dark" @click="updateBall('YELLOW')">
        Geel
      </q-btn>
    </div>

    <h4 class="title">
      Kleur bowlinglaan <q-btn :color="game.bowlingLane.color.toLowerCase()" />
    </h4>
    <div class="buttons">
      <q-btn color="red" @click="updateLane('RED')">Rood</q-btn>
      <q-btn color="green" @click="updateLane('GREEN')">Groen</q-btn>
      <q-btn color="blue" @click="updateLane('BLUE')">Blauw</q-btn>
      <q-btn color="yellow" text-color="dark" @click="updateLane('YELLOW')">
        Geel
      </q-btn>
    </div>

    <h4 class="title">
      Kleur bowlingpins <q-btn :color="game.bowlingPins.color.toLowerCase()" />
    </h4>
    <div class="buttons">
      <q-btn color="red" @click="updatePins('RED')">Rood</q-btn>
      <q-btn color="green" @click="updatePins('GREEN')">Groen</q-btn>
      <q-btn color="blue" @click="updatePins('BLUE')">Blauw</q-btn>
      <q-btn color="yellow" text-color="dark" @click="updatePins('YELLOW')">
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

    <q-btn class="q-mt-xl" color="primary" @click="saveGame">Opslaan</q-btn>
  </div>
</template>

<script lang="ts">
import { Ref, defineComponent, ref, watch } from 'vue';
import { useBowling } from 'src/services/bowling.service';
import { useRoute } from 'vue-router';
import { Game } from 'src/components/models';

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
      console.log(id);

      updateGame(id, game.value);
    };


    return {
      game,
      reclame,
      updateBall,
      updateLane,
      updatePins,
      saveGame,
    };
  },
});
</script>

<style lang="scss">
.option-title {
  display: flex;
  justify-content: center;
}

.game-title {
  display: flex;
  justify-content: center;
  font-style: italic;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.title {
  margin-bottom: 1rem;
}
</style>
