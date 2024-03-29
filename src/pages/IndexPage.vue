<template>
  <template v-if="game">
    <div class="overlay"></div>
    <PageTitle>GAMES</PageTitle>
    <div class="nextGame">
      <GoButtons @click="newGame">Create New Game</GoButtons>
    </div>
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
                <div class="popup">
                  <img
                    src="https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png"
                    alt="delete"
                    class="iconbox"
                  />
                  <div class="text-h6">Are you sure?</div>
                  <div class="div">
                    <p>
                      Do you really want to delete these records? This process
                      cannot be undone.
                    </p>
                  </div>
                </div>
                <q-space />
              </q-card-section>
              <q-card-section>
                <div class="popUpButtons">
                  <button
                    type="button"
                    class="yesbutton"
                    v-close-popup
                    @click="
                      deleteGameButton(item._id);
                      deleted = true;
                    "
                  >
                    Delete
                  </button>
                  <button type="button" class="nobutton" v-close-popup>
                    Cancel
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
                  color="red"
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
import GoButtons from 'src/components/GoButtons.vue';
import PageTitle from 'src/components/PageTitle.vue';

export default defineComponent({
  components: {
    GoButtons,
    PageTitle,
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

    function newGame() {
      void router.push({
        name: ROUTE_NAMES.ADMIN,
      });
    }

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
      newGame,
    };
  },
});
</script>

<style lang="scss" scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
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
  background: #00000098;
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
.iconbox {
  height: 50px;
}
.popup {
  align-items: center;
  justify-content: center;
  text-align: center;
}
.popUpButtons {
  display: flex;
  justify-content: center;
}

.yesbutton {
  background-color: rgb(189, 38, 27);
  color: #ffffff;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  margin-right: 20px;
  cursor: pointer;
}

.yesbutton:hover {
  scale: 1.02;
}

.nobutton:hover {
  scale: 1.02;
}

.yesbutton:active {
  background: #f15e5e;
}
.nobutton {
  background-color: rgb(141, 138, 134);
  color: #ffffff;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
}
.nobutton:active {
  background: #a8a8a8;
}
@media screen and (max-width: 650px) {
  .game {
    width: 100%;
    padding: 1rem;
    background: #00000098;
    border: 2px solid deeppink;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .links {
    flex-direction: column;
  }
  .linkTitle {
    text-align: center;
    border-bottom: 2px solid#ffffff;
  }
}
</style>
