<template>
  <GoBackButton></GoBackButton>
  <template v-if="game">
    <h1 class="gameTitle">{{ game.name }}</h1>
    <div class="wrapper">
      <div class="lboardTitle">Leaderboard</div>
      <div class="scoreboard">
        <div v-for="(item, index) in sortedLeaderboard" :key="index">
          <div class="speler-row" v-if="index === 0">
            <div class="index1">{{ index + 1 }}</div>

            <div class="speler-naam1">{{ item.name }}</div>
            <div class="scores">
              <div
                class="frame-row1"
                v-for="(turn, index) in item.turns"
                :key="index"
              >
                <div class="wrap">
                  <div class="turn1">Turn: {{ turn.turn }}</div>
                </div>
                <div class="wrap">
                  <div class="frame1">{{ turn.pinsHit }}</div>
                  <div v-if="index === 0" class="frame1">
                    {{ turn.score }}
                  </div>
                  <div v-if="index > 0" class="frame1">
                    {{ turn.subTotal }}
                  </div>
                </div>
              </div>
            </div>
            <div class="totalScore1">Total Score: {{ item.totalScore }}</div>
          </div>
          <div class="speler-row" v-if="index > 0">
            <div class="index">{{ index + 1 }}</div>

            <div class="speler-naam">{{ item.name }}</div>
            <div class="scores">
              <div
                class="frame-row"
                v-for="(turn, index) in item.turns"
                :key="index"
              >
                <div class="wrap">
                  <div class="turn">Turn: {{ turn.turn }}</div>
                </div>
                <div class="wrap">
                  <div class="frame">{{ turn.pinsHit }}</div>
                  <div v-if="index === 0" class="frame">
                    {{ turn.score }}
                  </div>
                  <div v-if="index > 0" class="frame">
                    {{ turn.subTotal }}
                  </div>
                </div>
              </div>
            </div>
            <div class="totalScore">Total Score: {{ item.totalScore }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-if="!game">ERROR LOADING PAGE</template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useBowling } from 'src/services/bowling.service';
import { useRoute, useRouter } from 'vue-router';
import GoBackButton from 'src/components/goBackButton.vue';
import { ROUTE_NAMES } from 'src/router/routes';

export default defineComponent({
  components: {
    GoBackButton,
  },
  data() {
    return {
      Title: false,
      Assets: false,
      Ads: false,
      gameTitle: 'VR game',
    };
  },

  setup() {
    const { getLeaderBoardForGame } = useBowling();
    const game = ref();
    const sortedLeaderboard = ref();
    const route = useRoute();
    const router = useRouter();

    const { id } = route.params;
    const getLeaderBord = async () => {
      const leaderbord = await getLeaderBoardForGame(`${id}`);
      sortedLeaderboard.value = leaderbord.sortedLeaderboard;
      game.value = leaderbord.game;

      return {
        sortedLeaderboard,
        game,
      };
    };

    getLeaderBord();

    const goBack = (): void => {
      void router.push({
        name: ROUTE_NAMES.HOME,
      });
    };
    return {
      game,
      sortedLeaderboard,
      goBack,
    };
  },
});
</script>

<style lang="scss" scoped>
body {
  background-color: #866bca !important;
  padding: 1rem;
}
* {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}
.arrowBack {
  width: fit-content;
  margin: 0;
  &:hover {
    border-bottom: 2px solid black;
    cursor: pointer;
  }
}
.gameTitle {
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
  margin-bottom: 20px;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  background: white;
  padding: 10px;
  border-radius: 5px;
  color: black;
  font-size: 30px;
  box-shadow: 8px 8px 16px black;
}

.scoreboard {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.speler-row {
  display: flex;
  gap: 1rem;
}

.speler-naam {
  width: 10%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px deeppink;
}
.speler-naam1 {
  width: 10%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px goldenrod;
}
.index {
  width: 3%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px deeppink;
}
.index1 {
  width: 3%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px goldenrod;
}

.frame-row {
  box-shadow: 4px 4px 7px black;
  border: 1px solid #ccc;
  width: 100%;
  background-color: #07bccc;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.frame-row1 {
  box-shadow: 4px 4px 7px black;
  border: 1px solid #ccc;
  width: 100%;
  background-color: goldenrod;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.turn {
  background-color: deeppink;
  border: 2px solid #fff;
  border-radius: 10px;
  color: black;
  width: 100%;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
}
.turn1 {
  background-color: rgb(112, 111, 44);
  border: 2px solid #fff;
  border-radius: 10px;
  color: black;
  width: 100%;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
}

.frame {
  background-color: deeppink;
  border: 2px solid #fff;
  border-radius: 10px;
  color: black;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
  width: 50%;
  min-width: fit-content;
}
.frame1 {
  background-color: rgb(112, 111, 44);
  border: 2px solid #fff;
  border-radius: 10px;
  color: black;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
  width: 50%;
  min-width: fit-content;
}
.wrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.scores {
  display: flex;
  flex-grow: 3;
}

.totalScore {
  width: 10%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px deeppink;
}
.totalScore1 {
  width: 10%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px goldenrod;
}
@media only screen and (max-width: 850px) {
  .speler-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 2px solid black;
  }
  .scores {
    display: flex;
    flex-grow: 3;
    overflow-x: scroll;
  }
}
</style>
