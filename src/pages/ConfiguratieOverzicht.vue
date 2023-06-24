<template>
  <div>
    <GoBackButton @click="goBack">Back</GoBackButton>
  </div>

  <template v-if="user">
    <div class="usericon">
      <img src="../../public/img/pngwing.com.png" alt="user icon" />
      <strong>{{ user.github.username }}</strong>
    </div>

    <div class="q-pa-md">
      <PageTitle>{{ game.name }}</PageTitle>
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
      <form @submit.prevent.stop="saveGame">
        <h4 class="title">Naam van het spel</h4>
        <q-input
            ref="nameRef"
            filled
            v-model="game.name"
            label=""
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Vul een spelnaam in om verder te gaan.',
            ]"
          ></q-input>

          <div>
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
      </div>
        <h4 class="title">Reclame</h4>
        <q-input
          filled
          type="text"
          v-model="reclame"
          placeholder="e.g. https://vuetiful.dev/img/john-duck.png"
        />
      </form>
      <div>
        <q-btn
          class="btnSave"
          text-color="dark"
          color="primary"
          type="submit"
          @click="
            saveGame();
            icon = true;
          "
          >Opslaan</q-btn
        >

        <q-dialog v-model="icon">
          <q-card>
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Have fun!</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
              Your game has successfully been updated.
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </template>
  <template v-if="!user">
    <div class="logindiv">
      <h1 class="notloggedin">
        Deze pagina is enkel beschikbaar indien je ingelogd bent
      </h1>
      <q-btn class="btnSave" text-color="dark" color="primary" @click="logIn"
        >Log In</q-btn
      >
    </div>
  </template>
</template>

<script lang="ts" scoped>
import { Ref, defineComponent, ref, watch } from 'vue';
import { useBowling } from 'src/services/bowling.service';
import { useRoute, useRouter } from 'vue-router';
import { Game } from 'src/components/models';
import GoBackButton from 'src/components/goBackButton.vue';
import PageTitle from 'src/components/PageTitle.vue';
import { useAuth } from 'src/services/auth.service';
import { ROUTE_NAMES } from 'src/router/routes';
import { useQuasar } from 'quasar';

export default defineComponent({
  components: {
    GoBackButton,
    PageTitle
  },
  setup() {
    const route = useRoute();
    const { getLeaderBoardForGame, updateGame } = useBowling();
    const reclame = ref('');
    const router = useRouter();
    const $q = useQuasar();
    const nameRef = ref<any>();


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

    const logIn = (): void => {
      void router.push({
        name: ROUTE_NAMES.LOGIN,
      });
    };

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
    const saveGame = (): void => {
     
      nameRef.value.resetValidation();
      nameRef.value.validate();
      if (!nameRef.value.hasError) {
      } else {
        $q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted',
        });
      }

      game.value.reclame = [reclame.value];
      const id = route.params.id.toString();
      updateGame(id, game.value);
    };

    function goBack() {
      window.history.length > 1 ? router.go(-1) : router.push('/');
    }
    const { user } = useAuth();

    return {
      game,
      reclame,
      updateBall,
      updateLane,
      updatePins,
      saveGame,
      goBack,
      icon: ref(false),
      user,
      logIn,
      nameRef
    };
  },
});
</script>

<style lang="scss" scoped>

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
.logindiv {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}
.notloggedin {
  font-family: 'Open Sans', sans-serif;
  font-size: 50px;
}
</style>
