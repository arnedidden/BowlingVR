<template>
  <template v-if="game">
    <div class="overlay"></div>

    <div class="text">
      <div class="wrapper">
        <div id="G" class="letter">G</div>
        <div class="shadow">G</div>
      </div>
      <div class="wrapper">
        <div id="A" class="letter">A</div>
        <div class="shadow">A</div>
      </div>
      <div class="wrapper">
        <div id="M" class="letter">M</div>
        <div class="shadow">M</div>
      </div>
      <div class="wrapper">
        <div id="E" class="letter">E</div>
        <div class="shadow">E</div>
      </div>
      <div class="wrapper">
        <div id="S" class="letter">S</div>
        <div class="shadow">S</div>
      </div>
    </div>
    <div class="nextGame"><GoToAdminPageButton></GoToAdminPageButton></div>
    <div class="games">
      <div class="game" v-for="(item, index) in game.data" :key="index">
        <div class="linkTitle">{{ item.name }}</div>
        <div class="links">
          <div @click="goToLeaderboard(item._id)" class="link">Leaderboard</div>
          <div @click="goToConfig(item._id)" class="link">Configuratie</div>
          <div @click="icon = true" class="link">Delete game</div>
          <q-dialog v-model="icon">
            <q-card>
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">
                  Are you sure you want to delete this game?
                </div>
                <q-space />
              </q-card-section>
              <q-card-section>
                <div class="buttons">
                  <button
                    type="button"
                    class="yesbutton"
                    v-close-popup
                    @click="
                      deleteGameButton(item._id);
                      deleted = true;
                    "
                  >
                    Yes!
                  </button>
                  <button type="button" class="nobutton" v-close-popup>
                    NO!
                  </button>
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>
          <q-dialog v-model="deleted">
            <q-card>
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Note!</div>
                <q-space />
                <q-btn
                  icon="close"
                  flat
                  round
                  dense
                  v-close-popup
                  @click="reloadPage"
                />
              </q-card-section>
              <q-card-section>
                Your game has successfully been deleted.
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useBowling } from 'src/services/bowling.service';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from 'src/router/routes';
import GoToAdminPageButton from 'src/components/GoToAdminPageButton.vue';

export default defineComponent({
  name: 'IndexPage',

  components: {
    GoToAdminPageButton,
  },

  setup() {
    const { getLeaderboards, deleteGame } = useBowling();
    const game = ref();
    const router = useRouter();
    const getLeaderBords = async () => {
      const leaderbord = await getLeaderboards();
      return (game.value = leaderbord);
    };
    getLeaderBords();
    const goToLeaderboard = (param: string): void => {
      void router.push({
        name: ROUTE_NAMES.LEADERBORD,
        params: {
          id: param,
        },
      });
    };
    const goToConfig = (param: string): void => {
      void router.push({
        name: ROUTE_NAMES.CONFIGURATIE_OVERZICHT,
        params: {
          id: param,
        },
      });
    };
    const deleteGameButton = (param: string) => {
      deleteGame(param);
    };

    const reloadPage = () => {
      location.reload();
    };
    return {
      game,
      goToLeaderboard,
      goToConfig,
      deleteGameButton,
      icon: ref(false),
      deleted: ref(false),
      reloadPage,
    };
  },
});
</script>

<style lang="scss">
body {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #866bca;
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
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    .letter {
      transition: ease-out 1s;
      transform: translateY(40%);
    }
    .shadow {
      transform: scale(1, -1);
      color: #999;
      transition: ease-in 5s, ease-out 5s;
    }
    &:hover {
      .letter {
        transform: translateY(-20%);
      }
      .shadow {
        opacity: 0;
        transform: translateY(20%);
      }
    }
  }
}
.games {
  position: relative;
  left: 25%;
  width: 50%;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 100px;
  border: 2px solid black;
  gap: 2rem;
  background-image: url('https://wallpaperaccess.com/full/2907976.jpg');
}

.game {
  display: block;
  width: 100%;
  padding: 1rem;
  background: #ffffff44;
  border: 2px solid deeppink;
  gap: 1rem;
}

.game:hover {
  transform: scale(105%);
  transition: transform 0.4s ease-in-out;
}
.links {
  display: flex;
  gap: 1rem;
  color: #ce1111;
  margin: 0 -0.25rem;
  padding: 0 0.25rem;
}
.link {
  color: #ffffff;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
}

.link::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background-color: #e710c3;
  bottom: 0;
  left: 0;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.link:hover::before {
  transform-origin: left;
  transform: scaleX(1);
}

.linkTitle {
  user-select: none;
  font-weight: bold;
  text-decoration: dashed;
  color: white;
}

.nextGame {
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 25px;
  padding-bottom: 50px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.yesbutton {
  background-color: rgb(15, 78, 15);
  color: #ffffff;
  border-radius: 1rem;
  padding: 0.5rem;
}
.nobutton {
  background-color: rgb(107, 23, 23);
  color: #ffffff;
  border-radius: 1rem;
  padding: 0.5rem;
}
</style>
