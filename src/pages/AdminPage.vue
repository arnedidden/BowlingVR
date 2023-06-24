<template>
  <template v-if="user">
    <div class="usericon">
      <img src="../../public/img/pngwing.com.png" alt="user icon" />
      <strong>{{ user.github.username }}</strong>
    </div>
    <h1>Admin</h1>
    <GoToIndexPageButton></GoToIndexPageButton>
    <form @submit.prevent.stop="submitGame">
      <div class="game-creation">
        <div class="game-creation-item">
          <h3 class="title">Kies de naam van het spel*</h3>
          <q-input
            ref="nameRef"
            filled
            v-model="gameName"
            label=""
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Vul een spelnaam in om verder te gaan.',
            ]"
          ></q-input>
        </div>
        <div class="game-creation-item">
          <h3 class="title">Kies de kleuren van het spel*</h3>
          <div class="choices-of-color">
            <div class="color-choice">
              <h5>Ball</h5>
              <select
                ref="ballRef"
                v-model="ball"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Kies een kleur om verder te gaan.',
                ]"
              >
                <option value="GREEN" class="green">GREEN</option>
                <option value="YELLOW" class="yellow">YELLOW</option>
                <option value="RED" class="red">RED</option>
                <option value="BLUE" class="blue">BLUE</option>
              </select>
              <div id="ball-color" class="color-div"></div>
            </div>
            <div class="color-choice">
              <h5>Pins</h5>
              <select
                ref="pinsRef"
                v-model="pins"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Kies een kleur om verder te gaan.',
                ]"
              >
                <option value="GREEN" class="green">GREEN</option>
                <option value="YELLOW" class="yellow">YELLOW</option>
                <option value="RED" class="red">RED</option>
                <option value="BLUE" class="blue">BLUE</option>
              </select>
              <div id="pins-color" class="color-div"></div>
            </div>
            <div class="color-choice">
              <h5>Lane</h5>
              <select
                ref="laneRef"
                v-model="lane"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Kies een kleur om verder te gaan.',
                ]"
              >
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
          <h3 class="title">Upload je reclame*</h3>
          <q-input
            type="text"
            ref="imgRef"
            v-model="img"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Upload een afbeelding om verder te gaan.',
            ]"
          ></q-input>
        </div>
      </div>
    </form>

    <div class="button-div">
      <button
        type="submit"
        @click="
          submitGame();
          icon = true;
        "
      >
        Creëer spel
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
import GoToIndexPageButton from 'src/components/GoToIndexPageButton.vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  components: {
    GoToIndexPageButton,
  },
  setup() {
    const { createGame } = useBowling();
    const { user } = useAuth();
    const gameName = ref('');
    const ball = ref('');
    const pins = ref('');
    const lane = ref('');
    const img = ref('');
    const $q = useQuasar();
    const nameRef = ref<any>();
    const ballRef = ref<any>();
    const pinsRef = ref<any>();
    const laneRef = ref<any>();
    const imgRef = ref<any>();

    const submitGame = (): void => {
      const fields = [
        {
          ref: nameRef,
          val: gameName.value,
          message: 'Please enter a game name.',
        },
        {
          ref: ballRef,
          val: ball.value,
          message: 'Please select a ball color.',
        },
        {
          ref: pinsRef,
          val: pins.value,
          message: 'Please select a pins color.',
        },
        {
          ref: laneRef,
          val: lane.value,
          message: 'Please select a lane color.',
        },
        { ref: imgRef,
          val: img.value,
          message: 'Please enter an image URL.' },
      ];

      for (const field of fields) {
        if (!field.val) {
          field.ref.value?.validate();
          $q.notify({
            icon: 'warning',
            color: 'negative',
            message: field.message,
          });
          return;
        }
      }
      nameRef.value.resetValidation();

      const game = {
        name: gameName.value,
        bowlingBall: {
          color: ball.value,
        },
        bowlingPins: {
          color: pins.value,
        },
        bowlingLane: {
          color: lane.value,
        },
        leaderboard: [],
        reclame: [img.value],
      };

      createGame(game)
        .then(() => {
          $q.notify({
            icon: 'done',
            color: 'positive',
            message: 'Game created successfully.',
          });
          gameName.value = '';
          ball.value = '';
          pins.value = '';
          lane.value = '';
          img.value = '';
          nameRef.value.validate();
          ballRef.value.validate();
          pinsRef.value.validate();
          laneRef.value.validate();
          imgRef.value.validate();
        })
        .catch((error) => {
          $q.notify({
            icon: 'warning',
            color: 'negative',
            message: error.message,
          });
        });
    };
    return {
      nameRef,
      imgRef,
      user,
      submitGame,
      gameName,
      ball,
      pins,
      lane,
      img,
      icon: ref(false),
    };
  },
});
</script>
<style scoped>
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

.green {
  background-color: green;
  color: aliceblue;
}
.yellow {
  background-color: yellow;
  color: black;
}
.red {
  background-color: red;
  color: aliceblue;
}
.blue {
  background-color: blue;
  color: aliceblue;
}

.color-div {
  height: 100%;
  width: 100px;
}
</style>
