<template>
  <GoButtons @click="goBack">Back</GoButtons>
  <template v-if="user">
    <div class="usericon">
      <img src="../../public/img/pngwing.com.png" alt="user icon" />
      <strong>{{ user.github.username }}</strong>
    </div>
<PageTitle>Create a game</PageTitle>
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
              <q-select
                ref="ballRef"
                v-model="ball"
                :options="options"
                class="select"
                filled
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Kies een kleur om verder te gaan.',
                ]"
              >

              </q-select>
            </div>
            <div class="color-choice">
              <h5>Pins</h5>
              <q-select
                ref="pinsRef"
                v-model="pins"
                :options="options"
                class="select"
                lazy-rules
                filled
                :rules="[
                  (val) =>
                  (val && val.length > 0) ||
                    'Kies een kleur om verder te gaan.',
                ]"
              >

              </q-select>
            </div>
            <div class="color-choice">
              <h5>Lane</h5>
              <q-select
                ref="laneRef"
                class="select"
                filled
                v-model="lane"
                :options="options"
                lazy-rules
                :rules="[
                  (val) =>
                  (val && val.length > 0) ||
                    'Kies een kleur om verder te gaan.',
                ]"
              >

              </q-select>
            </div>
          </div>
        </div>
        <div class="game-creation-item">
          <h3 class="title">Upload je reclame*</h3>
          <q-input
            type="text"
            filled
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
        class="btn"
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
import { useQuasar } from 'quasar';
import GoButtons from 'src/components/GoButtons.vue';
import PageTitle from 'src/components/PageTitle.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    GoButtons,
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
        })
        .catch((error) => {
          $q.notify({
            icon: 'warning',
            color: 'negative',
            message: error.message,
          });
        });
    };
    function goBack() {
      window.history.length > 1 ? router.go(-1) : router.push('/');
    }
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
      options: ['GREEN', 'YELLOW', 'RED', 'BLUE'],
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
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

h5{
  width: 20%;
}
.select{
  width: 100%;
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
.GREEN {
  background-color: rgba(0, 128, 0, 0.432);
  color: aliceblue;
}
.YELLOW {
  background-color: rgba(255, 255, 0, 0.425);
  color: black;
}
.RED {
  background-color: rgba(255, 0, 0, 0.5);
  color: aliceblue;
}
.BLUE {
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
.input {
  background-color: #47289688;
  color: rgb(192, 190, 190);
  font-weight: bold;
  height: 30px;
  width: 100%;
  &::placeholder{
    color: rgb(192, 190, 190);
  }
}
@media only screen and (max-width: 1200px) {
  .game-creation {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1rem;
    margin-bottom: 2rem;
    width: 100%;
  }
  .game-creation-item{
    width: 50%;
  }

}

</style>
